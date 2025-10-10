import RegisterForm from "../components/RegisterForm";
import { registerUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { login } = useAuth(); // ✅ hooks at the top
  const navigate = useNavigate(); // ✅ hooks at the top

  const handleRegister = async (data) => {
    console.log("🚀 Sending register payload:", data);

    try {
      const response = await registerUser(data);
      console.log("✅ Backend response:", response);

      // response has { message, token, user }
      login(response); // ✅ your AuthContext expects both token & user inside
      navigate("/"); // ✅ this now actually works
    } catch (error) {
      console.error("❌ Registration error:", error);
      alert(error.message || "Failed To Register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <RegisterForm
        onSubmit={(data) => {
          console.log(data);
          handleRegister(data);
        }}
      />
    </div>
  );
}
