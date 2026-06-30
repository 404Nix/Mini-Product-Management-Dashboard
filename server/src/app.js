import express, { urlencoded } from "express";
import cors from "cors";
import conf from "./config/conf.js";

import productRoutes from "./routes/product.routes.js";

import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(
    cors({
        origin: conf.corsOrigin,
    })
);

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
