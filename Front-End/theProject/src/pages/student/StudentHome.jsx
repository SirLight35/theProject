import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchWithAuth } from "../../api/fetchWithAuth";
import CourseCard from "../../components/student/CourseCard";
import { useNavigate } from "react-router-dom";
import { enrollInCourse } from "../../api/student";
export default function StudentHome() {
  const { user } = useAuth();
  const token = user?.token;
  const [courses, setCourses] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const c = await fetchWithAuth(
          "http://localhost:5051/api/student/courses",
          {},
          token
        );
        const s = await fetchWithAuth(
          "http://localhost:5051/api/student/stats",
          {},
          token
        );
        const r = await fetchWithAuth(
          "http://localhost:5051/api/student/recommended",
          {},
          token
        );

        if (!mounted) return;

        const coursesData = c.data || [];
        const statsData = s || {};
        const recommendedData = Array.isArray(r) ? r : r.data || [];

        const totalProgress = coursesData.length
          ? Math.round(
              coursesData.reduce((acc, cur) => acc + (cur.progress || 0), 0) /
                coursesData.length
            )
          : 0;

        setCourses(coursesData);
        setRecommended(recommendedData);
        setStats({
          ...statsData,
          overallProgress: `${totalProgress}%`,
        });
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load student data");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, [token]);

  const handleContinue = (course) => {
    const last = course.lastSeenLesson
      ? `/course/${course._id}/lesson/${course.lastSeenLesson}`
      : `/course/${course._id}`;
    navigate(last);
  };

  const handleEnroll = async (courseId) => {
    try {
      enrollInCourse(courseId, token);
      alert("Enrolled successfully!");
      window.location.reload();
    } catch (error) {
      alert(error.message || "Failed to enroll");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome back, {user?.userName || "Student"} 👋
      </h1>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Courses Enrolled</p>
          <p className="text-2xl font-bold">
            {stats?.totalCourses ?? courses.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Lessons Completed</p>
          <p className="text-2xl font-bold">{stats?.completedLessons ?? 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Overall Progress</p>
          <p className="text-2xl font-bold">{stats?.overallProgress}</p>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Continue Learning</h2>
        {courses.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            You haven’t enrolled in any courses yet. Check out recommendations
            below 👇
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((c) => (
              <CourseCard key={c._id} course={c} onContinue={handleContinue} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Recommended for You</h2>
        {recommended.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            No recommendations available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommended.map((c) => (
              <CourseCard
                key={c._id}
                course={c}
                onEnroll={() => handleEnroll(c._id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
