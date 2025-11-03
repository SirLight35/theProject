import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchWithAuth } from "../../api/fetchWithAuth";

export default function AllCoursesPage() {
  const { user } = useAuth();
  const token = user?.token;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        if (!token) throw new Error("No token found");
        const data = await fetchWithAuth(
          "http://localhost:5051/api/student/courses",
          {},
          token
        );
        setCourses(data.data || []);
      } catch (err) {
        console.error("Error loading courses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, [token]);

  const handleEnroll = async (courseId) => {
    try {
      const res = await fetchWithAuth(
        `http://localhost:5051/api/student/enroll/${courseId}`,
        { method: "POST" },
        token
      );
      alert("Enrolled successfully!");
    } catch (err) {
      console.error("Error enrolling:", err);
      alert("Failed to enroll: " + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        All Courses ({courses.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-500 mb-3">
              By {course.instructor?.userName || "Unknown"}
            </p>

            <button
              onClick={() => handleEnroll(course._id)}
              disabled={enrolling === course._id}
              className={`${
                enrolling === course._id
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-3 py-2 rounded transition`}
            >
              {enrolling === course._id ? "Enrolling..." : "Enroll"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
