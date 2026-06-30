import { useDispatch } from "react-redux";

import { openProductModal } from "../../features/ui/uiSlice";

const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Product Dashboard</h1>

                <p className="text-muted-foreground mt-2">
                    Manage and organize your products.
                </p>
            </div>

            <button
                onClick={() => {
                    dispatch(openProductModal());
                }}
            >
                + Add Product
            </button>
        </div>
    );
};

export default Header;
