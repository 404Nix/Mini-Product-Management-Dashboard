import ProductRow from "./ProductRow";

const ProductTable = ({ products }) => {
    if (!products.length) {
        return <h2 className="text-center mt-10">No products found.</h2>;
    }

    return (
        <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Stock</th>
                    <th className="p-3 text-left">Actions</th>
                </tr>
            </thead>

            <tbody>
                {products.map((product) => (
                    <ProductRow key={product._id} product={product} />
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
