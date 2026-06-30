import express from "express";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";
import { validateProduct } from "../middleware/validate.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(validateProduct, createProduct);

router.route("/:id").put(validateProduct, updateProduct).delete(deleteProduct);

export default router;
