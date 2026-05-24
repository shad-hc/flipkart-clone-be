import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import {connectDB} from "./config/db.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("api/users",userRouter);


app.listen(3000,() => {
    console.log("server is listening on port 3000");
});