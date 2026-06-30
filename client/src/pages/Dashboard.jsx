import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import SearchBar from "@/components/product/SearchBar";
import ProductTable from "@/components/product/ProductTable";
import ProductModal from "@/components/product/ProductModal";
import DeleteDialog from "@/components/product/DeleteDialog";
import Loader from "@/components/common/Loader";

import { useGetProductsQuery } from "@/features/api/productApi";

const Dashboard = () => {
    const [search, setSearch] = useState("");

    const { data, isLoading, error } = useGetProductsQuery(search);

    if (isLoading) {
        return <Loader text="Loading Dashboard..." fullScreen />;
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className="flex h-full items-center justify-center">
                    <h2 className="text-destructive font-medium">
                        Something went wrong.
                    </h2>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mb-6">
                <SearchBar search={search} setSearch={setSearch} />
            </div>

            <ProductTable products={data?.data || []} />

            <ProductModal />
            <DeleteDialog />
        </DashboardLayout>
    );
};

export default Dashboard;
