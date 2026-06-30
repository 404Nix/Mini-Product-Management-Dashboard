import Product from "../models/product.model.js";

export const createProduct = asyncHandler(async (req, res) => {
    const { name, category, price, stock } = req.body;

    if (!name || !category || price == null || stock == null) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    const product = await Product.create({
        name,
        category,
        price,
        stock,
    });

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
    });
});
