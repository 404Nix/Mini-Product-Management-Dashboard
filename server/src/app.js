import express from "express";
import cors from "cors";
import conf from "./config/conf.js";
import morgan from "morgan";

import productRoutes from "./routes/product.routes.js";

import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import helmet from "helmet";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import limiter from "./middleware/rateLimiter.js";

const app = express();

app.use(
    helmet({
        crossOriginResourcePolicy: false,
    }),
);

app.use(morgan("dev"));

app.use(compression());

app.use(
    express.json({
        limit: "10kb",
    }),
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "10kb",
    }),
);

app.use(mongoSanitize());

app.use(hpp());

app.use("/api", limiter);

app.use(
    cors({
        origin: conf.corsOrigin.split(","),
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }),
);

app.use("/api/products", productRoutes);

app.use("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is working!"
    })
})

app.use(notFound);

app.use(errorHandler);

export default app;
