import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ message: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashPassword,
    });

    if (newUser) {
      /* This line of code is generating a JSON Web Token (JWT) for the newly created user. */
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      newUser.save();

      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
