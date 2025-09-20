import Course from "../models/Course.model.js";

export const createCourse = async (req, res) => {
  try {
    const data = {
      ...req.body,
      instructor: req.user.id,
      createdBy: req.user.id,
      isPublished: !!req.body.isPublished,
      publishedAt: req.body.isPublished ? new Date() : null,
    };

    const course = await Course.create(data);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, q } = req.query;

    const filter = q ? { title: { $regex: q, $options: "i" } } : {};

    const courses = await Course.find(filter)
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
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "course",
      "title"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res.status(400).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json("Course deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
