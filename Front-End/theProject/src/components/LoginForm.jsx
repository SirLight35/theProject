import { useState } from "react";

export default function SignInForm({ onSubmit }) {
  const [formData, setformmData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handeleChange = (e) => {
    setformmData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
      return;
    }
    setError("");
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl w-full h-[600px] bg-gray-200 p-6 rounded shadow flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full bg-white p-6 rounded flex flex-col justify-center"
      >
        <h2 className="text-[32px]  font-bold mb-4 text-center">Sign in</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handeleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handeleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
