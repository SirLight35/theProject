import express from "express";

import User from "../models/Users.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

router.post(
  "/register",
  [
    body("userName").notEmpty().isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      const user = new User(req.body);

      await user.save();
      res.status(201).json({ message: "User created Succefully" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
