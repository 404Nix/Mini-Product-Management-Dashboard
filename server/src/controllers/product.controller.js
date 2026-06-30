import Product from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import getStockStatus from "../utils/getStockStatus.js";


export const getProducts = asyncHandler(async (req, res) => {
    const { search = "", category = "" } = req.query;

    const query = {};

    if (search.trim()) {
        query.name = {
            $regex: search.trim(),
            $options: "i",
        };
    }

    if (category.trim()) {
        query.category = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).lean();

    const formattedProducts = products.map((product) => ({
        ...product,
        stockStatus: getStockStatus(product.stock),
    }));

    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        count: formattedProducts.length,
        data: formattedProducts,
    });
});


export const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: {
            ...product.toObject(),
            stockStatus: getStockStatus(product.stock),
        },
    });
});


export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: {
            ...product.toObject(),
            stockStatus: getStockStatus(product.stock),
        },
    });
});


export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});
