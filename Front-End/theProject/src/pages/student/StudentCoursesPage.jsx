import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getEnrolledCourses } from "../../api/student";

export default function StudentCoursesPage() {
  const { user } = useAuth();
  const token = user?.token;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getEnrolledCourses(token);
        setCourses(data.data || []);
      } catch (err) {
        console.error("Error loading courses:", err);
      }
    }
    if (token) loadCourses();
  }, [token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Courses ({courses.length})</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <div>No enrolled courses yet</div>
        ) : (
          courses.map((course) => (
            <div key={course._id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-500 mb-3">
                By {course.instructor?.userName || "Unknown"}
              </p>
              <div className="w-full bg-gray-200 h-2 rounded mb-3">
                <div
                  className="bg-blue-600 h-2 rounded"
                  style={{ width: `${course.progress || 0}%` }}
                />
              </div>
              <button className="bg-blue-600 text-white px-3 py-2 rounded">
                Continue
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
