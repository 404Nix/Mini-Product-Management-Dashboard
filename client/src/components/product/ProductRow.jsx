import { useDispatch } from "react-redux";

import {
    openDeleteDialog,
    openProductModal,
    setSelectedProduct,
} from "@/features/ui/uiSlice";

import { formatCurrency } from "@/utils/formatCurrency";

import { TableCell, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { STOCK_STATUS_VARIANTS } from "@/constants/product.constants";

const ProductRow = ({ product }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setSelectedProduct(product));
        dispatch(openProductModal());
    };

    const handleDelete = () => {
        dispatch(setSelectedProduct(product));
        dispatch(openDeleteDialog());
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{product.name}</TableCell>

            <TableCell>{product.category}</TableCell>

            <TableCell>{formatCurrency(product.price)}</TableCell>

            <TableCell>
                <Badge variant={STOCK_STATUS_VARIANTS[product.stockStatus]}>
                    {product.stockStatus}
                </Badge>
            </TableCell>

            <TableCell>
                <div className="flex justify-center gap-2">
                    <Button size="sm" variant="ghost" onClick={handleEdit}>
                        <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default ProductRow;
