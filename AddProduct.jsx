import { useInventoryDispatch } from "../context/InventoryContext";

export default function AddProduct() {
    const dispatchToInventory = useInventoryDispatch()

    const onAddProduct = (e) => {
        e.preventDefault()

        const newProduct = {
            productName: e.target.productName.value,
            imageUrl: e.target.imageUrl.value,
            price: parseFloat(e.target.price.value),
            tags: e.target.tags.value.split(",").map((tag) => tag.trim()),
            stock: e.target.stock.value,
        }

        dispatchToInventory({
            type: 'NEW_PRODUCT',
            ...newProduct,
        })

        e.target.reset()
        alert("Product added successfully!")
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 mb-4">
            <h1 className="font-bold text-4xl text-center mb-6 text-gray-700">
                Add New Product
            </h1>
            <form onSubmit={onAddProduct} className="space-y-4">
                <div>
                    <label
                        htmlFor="productName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Product Name
                    </label>
                    <input
                        id="productName"
                        type="text"
                        className="w-full p-2 border rounded focus:ring focus:ring-green-300 focus:outline-none"
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="imageUrl"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Product Image URL
                    </label>
                    <input
                        id="imageUrl"
                        type="text"
                        className="w-full p-2 border rounded focus:ring focus:ring-green-300 focus:outline-none"
                        placeholder="Enter image URL"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Price
                    </label>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        className="w-full p-2 border rounded focus:ring focus:ring-green-300 focus:outline-none"
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="stock"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Stock
                    </label>
                    <input
                        id="stock"
                        type="number"
                        step="0.01"
                        className="w-full p-2 border rounded focus:ring focus:ring-green-300 focus:outline-none"
                        placeholder="Enter stock"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Tags (comma-separated)
                    </label>
                    <input
                        id="tags"
                        type="text"
                        className="w-full p-2 border rounded focus:ring focus:ring-green-300 focus:outline-none"
                        placeholder="Enter tags, separated by commas"
                        required
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
}
