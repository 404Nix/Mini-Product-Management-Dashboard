import Header from "./Header";
import Footer from "./Footer";

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="container mx-auto flex-1 px-6 py-8">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default DashboardLayout;
