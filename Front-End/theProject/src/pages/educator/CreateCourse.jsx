import React, { useState } from "react";
import { fetchWithAuth } from "../../api/fetchWithAuth";
import { useAuth } from "../../context/AuthContext";
import { createEducatorCourse } from "../../api/educator";
export default function CreateCoursePage() {
  const { user } = useAuth();
  const token = user?.token;

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEducatorCourse(token, form);
      alert("Course created successfully!");
      setForm({ title: "", description: "", category: "", price: 0 });
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Course title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="description"
          placeholder="Course description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}
