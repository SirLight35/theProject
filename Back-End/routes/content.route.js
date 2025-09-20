import express from "express";
const router = express.Router();
import {
  createContent,
  updateContent,
  deleteContent,
  getAllContent,
  getContentById,
} from "../controllers/content.controller.js";
import {
  getAllContentDto,
  getContentByIdDto,
} from "../dto/content/getContent.dto.js";
import { createContentDto } from "../dto/content/createContent.dto.js";
import { updateContentDto } from "../dto/content/updateContent.dto.js";
import { auth } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/roles.middleware.js";
import { validationResult } from "express-validator";
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
router.post(
  "/",
  auth,
  authorizeRoles("admin", "instructor"),
  createContentDto,
  validate,
  createContent
);

router.get("/", auth, getAllContentDto, validate, getAllContent);
router.get("/:id", auth, getContentByIdDto, validate, getContentById);

router.put(
  "/:id",
  auth,
  authorizeRoles("admin", "instructor"),
  updateContentDto,
  validate,
  updateContent
);

router.delete(
  "/:id",
  auth,
  authorizeRoles("admin", "instructor"),
  deleteContent
);

export default router;
