import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const getTokenFromRequest = (req) => {
  if (req.cookies?.token) {
    return req.cookies.token;
  }

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7).trim();
  }

  return null;
};

export const protectRoute = async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password").lean();

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error("protectRoute error:", error.message || error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
