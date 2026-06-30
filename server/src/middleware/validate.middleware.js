export const validateProduct = (req, res, next) => {
    const { name, category, price, stock } = req.body;

    if (!name || !category || price == null || stock == null) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    next();
};
