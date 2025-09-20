import { body, param, query } from "express-validator";

export const getAllCoursesDto = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  query("q").optional().isString(),
];

export const getCourseByIdDto = [
  param("id").isMongoId().withMessage("Invalid Course ID"),
];
