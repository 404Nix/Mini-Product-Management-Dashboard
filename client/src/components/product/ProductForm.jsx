import { useForm, Controller } from "react-hook-form";
import { PRODUCT_CATEGORIES } from "../../constants/product.constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

const ProductForm = ({
    defaultValues,
    onSubmit,
    isSubmitting,
    submitLabel,
}) => {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}

            <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>

                <Input
                    id="name"
                    placeholder="Enter product name"
                    {...register("name", {
                        required: "Product name is required",
                    })}
                />

                {errors.name && (
                    <p className="text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Category */}

            <div className="space-y-2">
                <Label>Category</Label>

                <Controller
                    control={control}
                    name="category"
                    rules={{
                        required: "Category is required",
                    }}
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>

                            <SelectContent>
                                {PRODUCT_CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />

                {errors.category && (
                    <p className="text-sm text-red-500">
                        {errors.category.message}
                    </p>
                )}
            </div>

            {/* Price */}

            <div className="space-y-2">
                <Label htmlFor="price">Price</Label>

                <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    {...register("price", {
                        required: "Price is required",
                        min: {
                            value: 0,
                            message: "Price cannot be negative",
                        },
                        valueAsNumber: true,
                    })}
                />

                {errors.price && (
                    <p className="text-sm text-red-500">
                        {errors.price.message}
                    </p>
                )}
            </div>

            {/* Stock */}

            <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>

                <Input
                    id="stock"
                    type="number"
                    placeholder="Enter stock quantity"
                    {...register("stock", {
                        required: "Stock is required",
                        min: {
                            value: 0,
                            message: "Stock cannot be negative",
                        },
                        valueAsNumber: true,
                    })}
                />

                {errors.stock && (
                    <p className="text-sm text-red-500">
                        {errors.stock.message}
                    </p>
                )}
            </div>

            {/* Submit */}

            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : submitLabel}
                </Button>
            </div>
        </form>
    );
};

export default ProductForm;
