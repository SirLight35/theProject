import { body } from "express-validator";

export const updateContentDto = [
  body("title").isString().optional(),
  body("type").isIn(["video", "pdf", "article", "quiz"]).optional(),
  body("url").isURL().optional(),
  body("order").optional().isInt({ min: 0 }),
  body("isPublished").optional().isBoolean(),
];
