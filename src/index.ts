import "dotenv/config";
import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { userRt } from "./routes/UserRt";
import { postRt } from "./routes/PostRt";
import { dBase } from "./data/db";

(async () => {
    await dBase.initialize()
    .then(() => console.log("PostgreSQL is now Connected!"))
    .catch((err) => console.error(err));
    const app: express.Application = express();
    app.use(helmet());

    // CORS Setup
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", 
                "POST, GET, PUT, PATCH, DELETE");
            res.status(200).json({ "status message": "OK" });
        };
        next();
    });

    app.use(express.urlencoded());
    app.use(express.json());
    app.use(cookieParser());
    app.use(logger("dev"));
    app.use("/api/auth", userRt);
    app.use("/api/post", postRt);
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();



