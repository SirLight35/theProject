// Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  console.log("Navbar received user:", user);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center sticky top-0">
      <Link to="/">
        <span className="font-bold text-xl">LMS</span>
      </Link>

      <div className="space-x-6">
        {!user ? (
          <>
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>
            <a
              href="#footer"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("footer")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Footer
            </a>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : user.role === "student" ? (
          <>
            <Link to="/student/home">Home</Link>
            <Link to="/student/courses">My Courses</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : user.role === "educator" ? (
          <>
            <Link to="/educator/home">Home</Link>
            <Link to="/educator/dashboard">Dashboard</Link>
            <Link to="/courses/create">Create Courses</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : null}
      </div>
    </nav>
  );
}
