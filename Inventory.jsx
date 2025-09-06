import { useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import Product from "./Product";

const Inventory = () => {
    const inventory = useInventory()
    const [alertValue, setAlertValue] = useState(10)
    const [searchQuery, setSearchQuery] = useState("")
    const [showOnlyDepleted, setShowOnlyDepleted] = useState(false)

    const lowerCaseSearchQuery = searchQuery.toLowerCase()
    const filteredInventory = inventory.filter((product) => {
        const matchesSearchQuery = product.productName.toLowerCase().includes(lowerCaseSearchQuery);
        const isDepleted = product.stock < alertValue;
        return showOnlyDepleted ? (matchesSearchQuery && isDepleted) : matchesSearchQuery;
    })


    return (
        <div className="m-2 mb-4 flex flex-col items-center">
            <h1 className="font-bold text-2xl mx-2">Inventory</h1>
            <div className="m-2 mb-3 w-full max-w-md flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search inventory..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }}
                    className="border hover:border-gray-400 p-2 rounded flex-grow"
                />
                <div className="flex items-center">
                    <label htmlFor="alert-value" className="mr-2 ml-8">Alert Value</label>
                    <input
                        id="alert-value"
                        className="border p-2 hover:border-gray-400 rounded w-20"
                        value={alertValue}
                        type="number"
                        onChange={(e) => setAlertValue(e.target.value)}
                    />
                    <label className="ml-8" htmlFor="show-only-depleted">Show Only Depleted</label>
                    <input
                        className="ml-3 w-[35px] h-[35px]"
                        id="show-only-depleted" type="checkbox" checked={showOnlyDepleted} onChange={() => {
                            setShowOnlyDepleted(!showOnlyDepleted)
                        }}
                    />
                </div>
            </div>
            {filteredInventory.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-4">
                    {filteredInventory.map((product) => (
                        <Product key={product.productName} product={product} alertValue={alertValue} />
                    ))}
                </div>
            ) : (
                <p className="m-2 text-gray-500">No inventory items found.</p>
            )}
        </div>
    );
};

export default Inventory;
