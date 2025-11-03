import Course from "../models/Course.model.js";
import Content from "../models/Content.model.js";
import User from "../models/Users.model.js";

// ==========================
// 📊 Get Educator Stats
// ==========================
export const getEducatorStats = async (req, res) => {
  try {
    console.log("📡 Reached /api/educator/stats route");
    console.log("User from auth middleware:", req.user);
    const educatorId = req.user?.id;
    if (!educatorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No educator ID found" });
    }

    const totalCourses = await Course.countDocuments({
      instructor: educatorId,
    });

    const educatorCourses = await Course.find({
      instructor: educatorId,
    }).select("students");
    const totalStudents = educatorCourses.reduce(
      (sum, course) => sum + (course.students?.length || 0),
      0
    );

    res.json({ totalCourses, totalStudents });
  } catch (error) {
    console.error("🔥 getEducatorStats error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// 🎓 Create Course
// ==========================
export const createCourse = async (req, res) => {
  try {
    const educatorId = req.user?.id;
    if (!educatorId) {
      return res.status(401).json({ message: "Unauthorized: No educator ID" });
    }

    const data = {
      ...req.body,
      instructor: educatorId,
      createdBy: educatorId,
      isPublished: !!req.body.isPublished,
      publishedAt: req.body.isPublished ? new Date() : null,
    };

    const course = await Course.create(data);
    res
      .status(201)
      .json({ message: "Course created successfully", data: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// 📚 Get All Courses
// ==========================
export const getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, q } = req.query;

    const filter = {
      instructor: req.user._id, // only this educator's courses
      ...(q ? { title: { $regex: q, $options: "i" } } : {}),
    };

    const courses = await Course.find(filter)
      .populate("instructor", "userName email")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Course.countDocuments(filter);

    res.json({
      data: courses,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// 📘 Get Course by ID
// ==========================
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "userName"
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ data: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// ✏️ Update Course
// ==========================
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course updated", data: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// 🗑️ Delete Course
// ==========================
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// 🎥 Content Management
// ==========================
export const createContent = async (req, res) => {
  try {
    const content = await Content.create(req.body);
    res.status(201).json({ message: "Content created", data: content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!content) return res.status(404).json({ message: "Content not found" });
    res.json({ message: "Content updated", data: content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllContent = async (req, res) => {
  try {
    const { page = 1, limit = 10, q } = req.query;
    const filter = q ? { title: { $regex: q, $options: "i" } } : {};

    const contents = await Content.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Content.countDocuments(filter);

    res.json({
      data: contents,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate(
      "course",
      "title"
    );
    if (!content) return res.status(404).json({ message: "Content not found" });
    res.json({ data: content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });
    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// 👤 Educator Profile
// ==========================
export const getEducatorProfile = async (req, res) => {
  try {
    const educatorId = req.user?._id;
    if (!educatorId)
      return res.status(401).json({ message: "User not authenticated" });

    const educator = await User.findById(educatorId).select("-password");
    if (!educator)
      return res.status(404).json({ message: "Educator not found" });

    res.json({ data: educator });
  } catch (error) {
    console.error("Error in getEducatorProfile:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateEducatorProfile = async (req, res) => {
  try {
    const { userName, bio, avatar } = req.body;
    const educatorId = req.user?._id;

    const updatedUser = await User.findByIdAndUpdate(
      educatorId,
      { userName, bio, avatar },
      { new: true, runValidators: true }
    ).select("userName email avatar bio role");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
