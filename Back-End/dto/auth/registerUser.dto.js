import { body } from "express-validator";

export const registerUserDto = [
  body("userName")
    .notEmpty()
    .withMessage("userName is required")
    .isLength({ min: 3 })
    .withMessage("userName Must be atleast 3"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["admin", "instructor", "student"])
    .withMessage("Role must be admin,instructor,or student"),
];
