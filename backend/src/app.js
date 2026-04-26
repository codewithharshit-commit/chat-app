import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

import cookieparser from "cookie-parser";

import cors from "cors";

dotenv.config();

const app = express();

app.use(cookieparser());

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);

export default app;
