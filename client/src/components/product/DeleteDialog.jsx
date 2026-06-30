import { useDispatch, useSelector } from "react-redux";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { closeDeleteDialog } from "@/features/ui/uiSlice";

import { useDeleteProductMutation } from "@/features/api/productApi";
import { notify } from "@/utils/toast";

const DeleteDialog = () => {
    const dispatch = useDispatch();

    const { isDeleteDialogOpen, selectedProduct } = useSelector(
        (state) => state.ui,
    );

    const [deleteProduct, { isLoading }] = useDeleteProductMutation();

    const handleDelete = async () => {
        try {
            await deleteProduct(selectedProduct._id).unwrap();
            notify.success("Product deleted successfully.");
            dispatch(closeDeleteDialog());
        } catch (err) {
            toast.error(error?.data?.message || "Failed to delete product.");
            console.error(err);
        }
    };

    return (
        <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={(open) => {
                if (!open) {
                    dispatch(closeDeleteDialog());
                }
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product?</AlertDialogTitle>

                    <AlertDialogDescription>
                        Are you sure you want to delete
                        <strong> {selectedProduct?.name}</strong>? This action
                        cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDialog;
