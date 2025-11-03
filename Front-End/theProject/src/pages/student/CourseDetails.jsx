// src/pages/student/CourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchWithAuth } from "../../api/fetchWithAuth";

export default function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const token = user?.token;

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState("");

  // Load course details
  useEffect(() => {
    async function loadCourse() {
      setLoading(true);
      setError("");
      try {
        const res = await fetchWithAuth(
          `/api/student/courses/${id}`,
          {},
          token
        );
        setCourse(res.course);
        setProgress(res.progress || null);
        setIsEnrolled(res.isEnrolled || false);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    }

    if (token) loadCourse();
  }, [id, token]);

  // Handle enrollment
  const handleEnroll = async () => {
    if (!token) return alert("You must be logged in to enroll.");
    setEnrolling(true);
    try {
      await fetchWithAuth(
        `/api/student/enroll/${id}`,
        { method: "POST" },
        token
      );
      alert("Enrolled successfully!");
      setIsEnrolled(true);
      // Fetch progress for new enrollment
      const res = await fetchWithAuth(`/api/student/courses/${id}`, {}, token);
      setProgress(res.progress || null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!course) return <div className="p-6">Course not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        By {course.instructor?.userName || "Unknown"}
      </p>

      {!isEnrolled && token && (
        <button
          onClick={handleEnroll}
          disabled={enrolling}
          className="mb-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {enrolling ? "Enrolling..." : "Enroll Now"}
        </button>
      )}

      {isEnrolled ? (
        <div className="space-y-3">
          {course.content?.length > 0 ? (
            course.content.map((lesson) => (
              <div
                key={lesson._id}
                className={`p-3 border rounded ${
                  progress?.completedLessons?.includes(lesson._id)
                    ? "bg-green-100"
                    : "bg-white"
                }`}
              >
                {lesson.title}
              </div>
            ))
          ) : (
            <div>No lessons added yet</div>
          )}
        </div>
      ) : (
        <div className="text-gray-600">
          Enroll in this course to see lessons.
        </div>
      )}
    </div>
  );
}
