import { useForm } from "react-hook-form";

const ProductForm = ({ onSubmit, defaultValues }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label>Product Name</label>

                <input
                    {...register("name", {
                        required: "Product name is required",
                    })}
                />

                {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
                <label>Category</label>

                <select
                    {...register("category", {
                        required: "Category is required",
                    })}
                >
                    <option value="">Select Category</option>

                    <option value="Electronics">Electronics</option>

                    <option value="Furniture">Furniture</option>

                    <option value="Accessories">Accessories</option>

                    <option value="Clothing">Clothing</option>

                    <option value="Books">Books</option>

                    <option value="Sports">Sports</option>
                </select>
            </div>

            <div>
                <label>Price</label>

                <input
                    type="number"
                    {...register("price", {
                        required: "Price is required",
                        min: 0,
                    })}
                />
            </div>

            <div>
                <label>Stock</label>

                <input
                    type="number"
                    {...register("stock", {
                        required: "Stock is required",
                        min: 0,
                    })}
                />
            </div>

            <button type="submit">Save Product</button>
        </form>
    );
};

export default ProductForm;
