import ProductRow from "./ProductRow";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const ProductTable = ({ products }) => {
    if (!products.length) {
        return (
            <div className="border rounded-lg p-10 text-center">
                <h2 className="text-lg font-semibold">No products found</h2>

                <p className="text-muted-foreground mt-2">
                    Try adding a product or adjusting your search.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>

                        <TableHead>Category</TableHead>

                        <TableHead>Price</TableHead>

                        <TableHead>Stock</TableHead>

                        <TableHead className="w-22.5 text-center">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {products.map((product) => (
                        <ProductRow key={product._id} product={product} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ProductTable;
