import { body } from "express-validator";

export const createContentDto = [
  body("title").isString().notEmpty(),
  body("description")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least be 10 characters"),
  body("type").isIn(["video", "pdf", "article", "quiz"]),
  body("url").isURL(),
  body("course").isMongoId().withMessage("Valid course id is required"),
  body("order").optional().isInt({ min: 0 }),
  body("isPublished").optional().isBoolean(),
];
