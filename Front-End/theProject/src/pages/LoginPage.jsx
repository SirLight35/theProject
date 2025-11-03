import LoginForm from "../components/LoginForm";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await loginUser(data);

      if (!res || !res.token || !res.user) {
        alert("Invalid login response");
        return;
      }

      login({ token: res.token, user: res.user });

      if (res.user.role === "student") {
        navigate("/student/home");
      } else if (res.user.role === "educator") {
        navigate("/educator/home");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Failed to login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
