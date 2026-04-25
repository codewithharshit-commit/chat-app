import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieparser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieparser());
app.use(express.json());
app.use("/api/auth", authRoutes);

export default app;
