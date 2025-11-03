import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../api/fetchWithAuth";
import { useAuth } from "../../context/AuthContext";
export default function EducatorHome() {
  const { user } = useAuth();
  const token = user?.token;
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchWithAuth(
          "http://localhost:5051/api/educator/stats",
          {},
          token
        );
        setStats(data);
      } catch (error) {
        console.log("Error loading stats: ", error);
      }
    }
    loadStats();
  }, [token]);
  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Educator Home</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-4 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Courses</h2>
          <p className="text-2xl font-bold">{stats.totalCourses}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Students</h2>
          <p className="text-2xl font-bold">{stats.totalStudents}</p>
        </div>
      </div>
    </div>
  );
}
