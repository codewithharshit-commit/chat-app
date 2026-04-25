import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

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

      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
      });
    } else {
      res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Login successful",
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    });
  } catch (error) {
    console.log("Error in login controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logout successful" });
};
