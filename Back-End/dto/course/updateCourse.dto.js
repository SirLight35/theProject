import { body } from "express-validator";

export const updateCourseDto = [
  body("title").optional().isString().isLength({ min: 3 }),
  body("description").optional().isString().isLength({ min: 10 }),
  body("category").optional().isString(),
  body("price").optional().isFloat({ min: 0 }),
  body("thumbnail").optional(),
  body("isPublished").isBoolean().optional(),
];
