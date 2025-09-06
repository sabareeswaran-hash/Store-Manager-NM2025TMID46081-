import { createContext, useContext, useReducer, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const InventoryContext = createContext(null)
const InventoryDispatchContext = createContext(null)

export const InventoryProvider = ({children}) => {
    const [inventoryInLS, setInventoryInLS] = useLocalStorage("inventory", initialInventory)
    const [inventory, dispatch] = useReducer(inventoryReducer, inventoryInLS)

    useEffect(()=>{
        setInventoryInLS(inventory)
    })

    return (
        <InventoryContext.Provider value={inventory}>
            <InventoryDispatchContext.Provider value={dispatch}>
                {children}
            </InventoryDispatchContext.Provider>
        </InventoryContext.Provider>
    )
}

export const useInventory = () => {
    return useContext(InventoryContext)
}

export const useInventoryDispatch = () => {
    return useContext(InventoryDispatchContext)
}

const inventoryReducer = (state, action) => {
    switch(action.type){
        case 'NEW_PRODUCT':{
            return [...state,{
                productName: action.productName,
                imageUrl: action.imageUrl,
                price: action.price,
                tags: action.tags,
                stock: parseInt(action.stock),
            }]
        }
        case 'STOCK_ADDED': {
            return state.map(product =>
                product.productName === action.productName
                    ? { ...product, stock: parseInt(product.stock) + parseInt(action.stock) }
                    : product 
            )
        }
        case 'STOCK_SOLD': { 
            return state.map(product =>
                product.productName === action.productName
                    ? { ...product, stock: Math.max(0, parseInt(product.stock) - parseInt(action.stock)) }
                    : product
            )
        }
        default:{
            console.log('Unknown action type: ', action.type)
            return state
        }
    }
}

const initialInventory = [
    {productName: 'Sample Item', imageUrl:'/cartImage.png', price: 0, tags: ["sample"], stock: 1},
]