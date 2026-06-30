const ProductRow = ({ product }) => {
    return (
        <tr className="border-b">
            <td className="p-3">{product.name}</td>

            <td className="p-3">{product.category}</td>

            <td className="p-3">₹ {product.price}</td>

            <td className="p-3">{product.stockStatus}</td>

            <td className="p-3">Edit | Delete</td>
        </tr>
    );
};

export default ProductRow;
