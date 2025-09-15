import express from "express";

import User from "../models/Users.js";
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

// router.post("/login", async());

export default router;
