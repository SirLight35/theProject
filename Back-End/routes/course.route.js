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
} from "../controllers/course.controller.js";
import { createCourseDto } from "../dto/course/createCourse.dto.js";
import { updateCourseDto } from "../dto/course/updateCourse.Dto.js";
import { getAllCoursesDto } from "../dto/course/getCourse.dto.js";
import { getCourseByIdDto } from "../dto/course/getCourse.dto.js";
const router = express.Router();
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
  createCourseDto,
  validate,
  createCourse
);
router.get("/", auth, getAllCoursesDto, validate, getAllCourses);
router.get("/:id", auth, getCourseByIdDto, validate, getCourseById);
router.put(
  "/:id",
  auth,
  authorizeRoles("admin", "instructor"),
  updateCourseDto,
  validate,
  updateCourse
);

router.delete(
  "/:id",
  auth,
  authorizeRoles("admin", "instructor"),
  deleteCourse
);
export default router;
