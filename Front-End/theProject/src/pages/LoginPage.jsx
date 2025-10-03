import LoginForm from "../components/LoginForm";
import { loginUser } from "../api/auth";

export default function LoginPage() {
  const handleLogin = async (data) => {
    try {
      await loginUser(data);
      alert("Login Successfull");
    } catch (error) {
      console.error(error);

      alert("Failed To Login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
