import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/roles.middleware.js";
import { body, validationResult } from "express-validator";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  createContent,
  updateContent,
  deleteContent,
  getAllContent,
  getContentById,
  getEducatorStats,
  getEducatorProfile,
  updateEducatorProfile,
} from "../controllers/educator.controller.js";
import { createCourseDto } from "../dto/course/createCourse.dto.js";
import { updateCourseDto } from "../dto/course/updateCourse.dto.js";
import { getAllCoursesDto } from "../dto/course/getCourse.dto.js";
import { getCourseByIdDto } from "../dto/course/getCourse.dto.js";
import { createContentDto } from "../dto/content/createContent.dto.js";
import { updateContentDto } from "../dto/content/updateContent.dto.js";
import {
  getAllContentDto,
  getContentByIdDto,
} from "../dto/content/getContent.dto.js";
const router = express.Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Validation errors:", errors.array());
    console.log("📦 Request body:", req.body);
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
// educator.routes.js
router.get(
  "/stats",
  auth,
  authorizeRoles("admin", "educator"),
  getEducatorStats
);
router.get(
  "/profile",
  auth,
  authorizeRoles("admin", "educator"),
  getEducatorProfile
);
router.put(
  "/profile",
  auth,
  authorizeRoles("admin", "educator"),
  updateEducatorProfile
);

// Course routes
router.post(
  "/courses",
  auth,
  authorizeRoles("admin", "educator"),
  createCourseDto,
  validate,
  createCourse
);
router.get("/courses", auth, getAllCoursesDto, validate, getAllCourses);
router.get("/courses/:id", auth, getCourseByIdDto, validate, getCourseById);
router.put(
  "/courses/:id",
  auth,
  authorizeRoles("admin", "educator"),
  updateCourseDto,
  validate,
  updateCourse
);
router.delete(
  "/courses/:id",
  auth,
  authorizeRoles("admin", "educator"),
  deleteCourse
);

// Content routes
router.post(
  "/contents",
  auth,
  authorizeRoles("admin", "educator"),
  createContentDto,
  validate,
  createContent
);
router.get("/contents", auth, getAllContentDto, validate, getAllContent);
router.get("/contents/:id", auth, getContentByIdDto, validate, getContentById);
router.put(
  "/contents/:id",
  auth,
  authorizeRoles("admin", "educator"),
  updateContentDto,
  validate,
  updateContent
);
router.delete(
  "/contents/:id",
  auth,
  authorizeRoles("admin", "educator"),
  deleteContent
);

export default router;
