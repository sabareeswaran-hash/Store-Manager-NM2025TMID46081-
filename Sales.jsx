import { useSales } from "../../context/SalesContext";
import SaleRecord from "./SaleRecord";

const Sales = () => {
    const sales = useSales();

    return (
        <div className="m-4">
            <h1 className="text-2xl font-bold mb-4">Sales Record</h1>
            {sales.length > 0 ? (
                <div className="grid gap-4">
                    {sales.map((sale, index) => (
                        <SaleRecord key={index} sale={sale} saleId={index} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No sales recorded yet.</p>
            )}
        </div>
    );
};

export default Sales;
