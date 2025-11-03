import Course from "../models/Course.model.js";
import Progress from "../models/Progress.model.js";
import User from "../models/Users.model.js";
import mongoose from "mongoose";
export const enrollCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.id;

    console.log("🧠 Enroll Debug:");
    console.log("courseId:", id);
    console.log("studentId:", studentId);

    const course = await Course.findById(id);
    if (!course) return res.status(400).json({ message: "Course Not Found" });

    console.log("Before push:", course.students);

    // Ensure correct type
    const studentObjectId = new mongoose.Types.ObjectId(studentId);

    // Prevent duplicate
    if (course.students.some((id) => id.equals(studentObjectId))) {
      return res
        .status(400)
        .json({ message: "Already enrolled in the course" });
    }

    course.students.push(studentObjectId);
    await course.save();

    console.log("After push:", course.students);

    await Progress.create({ student: studentObjectId, course: id });

    res.status(200).json({ message: "Enrolled successfully", course });
  } catch (error) {
    console.error("❌ Enroll error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user.id;
    const courses = await Course.find({ students: studentId })
      .populate("instructor", "userName")
      .sort({ createdAt: -1 });

    const progressRecords = await Progress.find({ student: studentId });

    const mergedCourses = courses.map((course) => {
      const progress = progressRecords.find(
        (p) => p.course.toString() === course.id.toString()
      );

      const totalLessons = course.content?.length || 0;
      const completed = progress?.completedLessons?.length || 0;
      const percentage = totalLessons
        ? Math.round((completed / totalLessons) * 100)
        : 0;

      return { ...course.toObject(), totalLessons, progress: percentage };
    });

    res.json({ count: mergedCourses.length, data: mergedCourses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user?.id; // optional, in case no token

    const course = await Course.findById(id)
      .populate("instructor", "userName")
      .populate("content");

    if (!course) return res.status(404).json({ message: "Course not found" });

    let progress = null;
    let isEnrolled = false;

    if (studentId) {
      progress = await Progress.findOne({ course: id, student: studentId });
      isEnrolled = !!progress;
    }

    res.json({ course, progress, isEnrolled });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourseProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { lessonId, completed } = req.body;
    const studentId = req.user.id;

    let progress = await Progress.findOne({ course: id, student: studentId });

    if (!progress) {
      progress = await Progress.create({ student: studentId, course: id });
    }

    if (lessonId) {
      progress.lastSeenLesson = lessonId;

      if (completed && !progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }
    }

    await progress.save();

    res.json({ message: "Progress Updated", progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecommendedCourses = async (req, res) => {
  try {
    const studentId = req.user.id;

    const enrolled = await Course.find({ students: studentId }).select("_id");

    const enrolledIds = enrolled.map((c) => c._id);

    const recommended = await Course.find({
      _id: { $nin: enrolledIds },
      isPublished: true,
    })
      .limit(5)
      .sort({ createdAt: -1 });

    res.json(recommended);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getStudentStats = async (req, res) => {
  try {
    const studentId = req.user.id;

    const progressRecords = await Progress.find({ student: studentId });

    const completedLessons = progressRecords.reduce(
      (acc, p) => acc + p.completedLessons.length,
      0
    );

    const totalCourses = progressRecords.length;

    res.json({
      totalCourses,
      completedLessons,
      streak: 5,
      hours: Math.round(completedLessons * 0.5),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { userName, bio, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      studentId,
      { userName, bio, avatar },
      { new: true, runValidators: true }
    ).select("userName email avatar bio role");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("updateStudentProfile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
