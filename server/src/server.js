import conf from "./config/conf.js";
import connectDB from "./config/db.js";
import app from "./app.js";

/**
 * @desc Development Only
 */
import dns from "dns";
console.log(conf.nodeEnv);

if (conf.nodeEnv === "development") {
    dns.setServers(["8.8.8.8"]);
}

connectDB()
    .then(() => {
        app.listen(conf.port, () => {
            console.log(`Server is running at port : ${conf.port}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed !!", err);
    });
