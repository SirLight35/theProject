import { body } from "express-validator";

export const createCourseDto = [
  body("title")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Title must have at least 3 characters"),
  body("description")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least be 10 characters"),
  body("category").optional().isString(),
  body("price").optional().isFloat({ min: 0 }),
  body("thumbnail").optional().isURL(),
  body("isPublished").optional().isBoolean(),
];
