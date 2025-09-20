import { body } from "express-validator";

export const loginUserDto = [
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .notEmpty()
    .withMessage("password must be at least 6 characters"),
];
