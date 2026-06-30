import { useState } from "react";

import Header from "../components/layout/Header";
import SearchBar from "../components/product/SearchBar";
import ProductTable from "../components/product/ProductTable";

import { useGetProductsQuery } from "../features/api/productApi";
import ProductModal from "../components/product/ProductModal";

const Dashboard = () => {
    const [search, setSearch] = useState("");

    const { data, isLoading, error } = useGetProductsQuery(search);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Something went wrong.</h2>;
    }

    return (
        <main className="container mx-auto px-6 py-8">
            <Header />

            <div className="my-6">
                <SearchBar search={search} setSearch={setSearch} />
            </div>

            <ProductTable products={data?.data || []} />

            <ProductModal />
        </main>
    );
};

export default Dashboard;
