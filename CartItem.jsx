import { useCartDispatch } from "../../context/CartContext";
import { useInventory } from "../../context/InventoryContext";

export default function CartItem({ product }) {
    const dispatchToCart = useCartDispatch();
    const inventory = useInventory();
    const productInInventory = inventory.find(item => item.productName === product.productName);

    const stockAvailable = productInInventory ? productInInventory.stock : 0;

    return (
        <div className="border border-gray-400 m-2 p-2 px-3 rounded text-center flex flex-col items-center">
            <h1 className="font-bold text-xl">{product.productName}</h1>
            <div className="w-[250px] h-[250px] overflow-hidden border border-gray-300 rounded">
                <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                />
            </div>
            <p className="text-lg mt-2">Price: ₹ {product.price.toFixed(2)}</p>
            <div>
                {product.quantity > 1 ? (
                    <button
                        onClick={() => {
                            dispatchToCart({
                                type: 'DEC_QTY',
                                ...product,
                            });
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white p-1 m-1 rounded"
                    >
                        -
                    </button>
                ) : (
                    <button disabled className="bg-red-300 text-white p-1 m-1 rounded">
                        -
                    </button>
                )}
                {' '}{product.quantity}{' '}
                {product.quantity < stockAvailable ? (
                    <button
                        onClick={() => {
                            dispatchToCart({
                                type: 'INC_QTY',
                                ...product,
                            });
                        }}
                        className="bg-green-500 hover:bg-green-600 p-1 m-1 rounded text-white"
                    >
                        +
                    </button>
                ) : (
                    <button disabled className="bg-gray-300 p-1 m-1 rounded text-white">
                        +
                    </button>
                )}
            </div>
            <button
                onClick={() => {
                    dispatchToCart({
                        type: 'removed',
                        ...product,
                    });
                }}
                className="bg-red-500 hover:bg-red-600 text-white rounded p-1 m-1 block"
            >
                Remove from Cart
            </button>
        </div>
    );
}
