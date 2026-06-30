import { useDispatch, useSelector } from "react-redux";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { closeProductModal } from "@/features/ui/uiSlice";

import {
    useCreateProductMutation,
    useUpdateProductMutation,
} from "@/features/api/productApi";

import ProductForm from "./ProductForm";
import { EMPTY_PRODUCT } from "@/constants/product.constants";
import { notify } from "@/utils/toast";

const ProductModal = () => {
    const dispatch = useDispatch();

    const { isProductModalOpen, selectedProduct } = useSelector(
        (state) => state.ui,
    );

    const [createProduct, createState] = useCreateProductMutation();

    const [updateProduct, updateState] = useUpdateProductMutation();

    const isEditMode = Boolean(selectedProduct);

    const defaultValues = selectedProduct ?? EMPTY_PRODUCT;

    const handleSubmit = async (formData) => {
        try {
            if (isEditMode) {
                await updateProduct({
                    id: selectedProduct._id,
                    productData: formData,
                }).unwrap();
                notify.success("Product updated successfully.");
            } else {
                await createProduct(formData).unwrap();
                notify.success("Product added successfully.");
            }

            dispatch(closeProductModal());
        } catch (error) {
            notify.error(error?.data?.message || "something went wrong!");
            console.error(error);
        }
    };

    return (
        <Dialog
            open={isProductModalOpen}
            onOpenChange={(open) => {
                if (!open) {
                    dispatch(closeProductModal());
                }
            }}
        >
            <DialogContent
                className="sm:max-w-lg"
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit Product" : "Add Product"}
                    </DialogTitle>

                    <DialogDescription>
                        {isEditMode
                            ? "Update the product details."
                            : "Fill in the details below to add a new product."}
                    </DialogDescription>
                </DialogHeader>

                <ProductForm
                    defaultValues={defaultValues}
                    onSubmit={handleSubmit}
                    isSubmitting={
                        createState.isLoading || updateState.isLoading
                    }
                    submitLabel={isEditMode ? "Update Product" : "Add Product"}
                />
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
