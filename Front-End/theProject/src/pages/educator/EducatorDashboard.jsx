import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../api/fetchWithAuth";
import { useAuth } from "../../context/AuthContext";
import { deleteEducatorCourse, updateEducatorCourse } from "../../api/educator";
export default function EducatorDashboard() {
  const { user } = useAuth();
  const token = user?.token;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await fetchWithAuth(
          "http://localhost:5051/api/educator/courses",
          {},
          token
        );
        console.log("Fetched courses response:", data);
        setCourses(data.data || []);
      } catch (err) {
        console.error("Error loading courses:", err);
      }
    }
    loadCourses();
  }, [token]);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteEducatorCourse(token, id);
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete course");
    }
  };
  const handleEdit = async (course) => {
    const newTitle = prompt("Enter new course title:", course.title);
    if (!newTitle || newTitle === course.title) return;

    try {
      await updateEducatorCourse(token, course._id, { title: newTitle });
      setCourses((prev) =>
        prev.map((c) => (c._id === course._id ? { ...c, title: newTitle } : c))
      );
    } catch (err) {
      console.error("Error updating course:", err);
      alert("Failed to update course");
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white shadow p-4 rounded-xl">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600">{course.category}</p>
            <p className="text-gray-500 text-sm">{course.description}</p>
            <p className="font-medium mt-2">Price: ${course.price}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(course)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
