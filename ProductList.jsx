import Product from "./Product";

export default function ProductList({ products }) {
    return (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
            {products.map((product) => {
                return <Product key={product.productName} product={product} />;
            })}
        </div>
    );
}
