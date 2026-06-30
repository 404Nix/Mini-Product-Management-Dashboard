import { useDispatch, useSelector } from "react-redux";
import { closeProductModal } from "../../features/ui/uiSlice";
import ProductForm from "./ProductForm";
import { useCreateProductMutation } from "../../features/api/productApi";

const ProductModal = () => {
    const [createProduct, { isLoading }] = useCreateProductMutation();

    const handleCreateProduct = async (data) => {
        try {
            await createProduct(data).unwrap();

            dispatch(closeProductModal());
        } catch (error) {
            console.error(error);
        }
    };

    const dispatch = useDispatch();

    const { isProductModalOpen } = useSelector((state) => state.ui);

    if (!isProductModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[500px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Add Product</h2>

                    <button onClick={() => dispatch(closeProductModal())}>
                        ✕
                    </button>
                </div>

                <ProductForm
                    onSubmit={handleCreateProduct}
                    defaultValues={{
                        name: "",
                        category: "",
                        price: "",
                        stock: "",
                    }}
                />
            </div>
        </div>
    );
};

export default ProductModal;
