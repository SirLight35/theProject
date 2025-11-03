import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/HomePage/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/protectedRoute";
import StudentHome from "./pages/student/StudentHome";
import StudentCoursesPage from "./pages/student/StudentCoursesPage";
import EducatorDashboard from "./pages/educator/EducatorDashboard";
import EducatorHome from "./pages/educator/EducatorHome";
import CreateCourse from "./pages/educator/CreateCourse";
import CourseDetails from "./pages/student/CourseDetails";
import AllCoursesPage from "./pages/student/AllCoursesPage";
import StudentProfile from "./pages/student/StudentProfile";
import EducatorProfile from "./pages/educator/EducatorProfile";

function App() {
  return (
    // 👇 This ensures footer is always at the bottom
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* 👇 This expands to fill available space between navbar and footer */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Student */}
          <Route
            path="/student/home"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/courses/all"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <AllCoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/course/:id"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <CourseDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/courses"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentCoursesPage />
              </ProtectedRoute>
            }
          />

          {/* Educator */}
          <Route
            path="/educator/home"
            element={
              <ProtectedRoute allowedRoles={["educator"]}>
                <EducatorHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educator/dashboard"
            element={
              <ProtectedRoute allowedRoles={["educator"]}>
                <EducatorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/create"
            element={
              <ProtectedRoute allowedRoles={["educator"]}>
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educator/profile"
            element={
              <ProtectedRoute allowedRoles={["educator"]}>
                <EducatorProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
