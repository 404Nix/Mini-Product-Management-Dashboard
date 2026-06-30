import "./env.js";

const requiredKeys = ["PORT", "MONGODB_URI", "NODE_ENV", "CORS_ORIGIN"];

for (const key of requiredKeys) {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}

const conf = {
    port: Number(process.env.PORT),
    mongodbUri: process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV,
    corsOrigin: process.env.CORS_ORIGIN,
};

export default conf;
