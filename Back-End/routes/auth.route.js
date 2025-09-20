import express from "express";
import { validationResult } from "express-validator";
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} from "../controllers/auth.controller.js";
import { registerUserDto } from "../dto/auth/registerUser.dto.js";
import { loginUserDto } from "../dto/auth/loginUser.dto.js";
const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post("/register", registerUserDto, validate, registerUser);

router.post("/login", loginUserDto, validate, loginUser);

router.post("/refresh", refreshToken);

router.post("/logout", logoutUser);
export default router;
