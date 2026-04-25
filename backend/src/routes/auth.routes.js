import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateProfile } from "../controllers/user.controller.js";

const authRoutes = express.Router();

/**
 * api/auth/signup
 */
authRoutes.post("/signup", signup);
/**
 * api/auth/login
 */
authRoutes.post("/login", login);
/**
 * api/auth/logout
 */
authRoutes.post("/logout", logout);

authRoutes.put("/updateProfile", protectRoute, updateProfile);

authRoutes.get("/me", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});
export default authRoutes;
