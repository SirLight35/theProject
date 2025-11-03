import express from "express";
import { validationResult } from "express-validator";
import { auth } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/roles.middleware.js";
import {
  getStudentCourseById,
  enrollCourse,
  getStudentStats,
  getEnrolledCourses,
  updateCourseProgress,
  getRecommendedCourses,
  getStudentProfile,
  updateStudentProfile,
} from "../controllers/student.controller.js";

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get(
  "/courses",
  auth,
  authorizeRoles("student", "educator"),
  validate,
  getEnrolledCourses
);

router.get(
  "/courses/:id",
  auth,
  authorizeRoles("student"),
  validate,
  getStudentCourseById
);

router.post(
  "/enroll/:id",
  auth,
  authorizeRoles("student"),
  validate,
  enrollCourse
);

router.post(
  "/courses/:id/progress",
  auth,
  authorizeRoles("student"),
  validate,
  updateCourseProgress
);

router.get(
  "/stats",
  auth,
  authorizeRoles("student"),
  validate,
  getStudentStats,
  updateStudentProfile
);

router.get(
  "/recommended",
  auth,
  authorizeRoles("student"),
  validate,
  getRecommendedCourses
);
router.get(
  "/profile",
  auth,
  authorizeRoles("student"),
  validate,
  getStudentProfile
);

router.put(
  "/profile",
  auth,
  authorizeRoles("student"),
  validate,
  updateStudentProfile
);
export default router;
