import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import cookie from "cookie";
import { body, validationResult } from "express-validator";
const router = express.Router();

router.post(
  "/register",
  [body("userName"), body("email").isEmail(), body("password")],

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const { userName, email, password } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({ message: "User already exist" });
      }
      const user = new User({ userName, email, password });
      await user.save();
      res.status(201).json({
        message: "User created Succefully",
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "login succefull",
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
