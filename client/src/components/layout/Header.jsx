import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";

import { openProductModal } from "@/features/ui/uiSlice";
import { Button } from "@/components/ui/button";

const Header = () => {
    const dispatch = useDispatch();

    return (
        <header className="border-b bg-background">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <div>
                    <h1 className="text-3xl font-bold">
                        Product Dashboard
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Manage and organize your products.
                    </p>
                </div>

                <Button onClick={() => dispatch(openProductModal())}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                </Button>
            </div>
        </header>
    );
};

export default Header;