import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const payload = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      role: formData.role.toLowerCase(),
    };

    try {
      console.log("Register payload:", payload);

      const data = await registerUser(payload);

      login({ user: data.user, token: data.token });

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-2xl w-full h-[600px] bg-gray-200 p-6 rounded shadow flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full bg-white p-6 rounded flex flex-col justify-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mb-10 bg-gray-200 p-2 rounded"
        >
          <option value="student">Student</option>
          <option value="educator">Educator</option>
        </select>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
