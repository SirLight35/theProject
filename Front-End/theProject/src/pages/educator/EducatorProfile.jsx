import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchWithAuth } from "../../api/fetchWithAuth";

export default function EducatorProfile() {
  const { user } = useAuth();
  const token = user?.token;
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetchWithAuth(
          "http://localhost:5051/api/educator/profile",
          { method: "GET" },
          token
        );
        setProfile(res.data?.data || res.data);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    }
    if (token) loadProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updateData = {
        userName: profile.userName,
        bio: profile.bio,
        avatar: profile.avatar,
      };

      const res = await fetchWithAuth(
        "http://localhost:5051/api/educator/profile",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        },
        token
      );

      setProfile(res.data?.data || res.data);
      setEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Educator Profile</h2>

      <img
        src={profile.avatar || "https://placehold.co/100x100"}
        alt="avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />

      <input
        name="userName"
        value={profile.userName || ""}
        onChange={handleChange}
        disabled={!editing}
        className="border p-2 w-full rounded"
      />

      <textarea
        name="bio"
        value={profile.bio || ""}
        onChange={handleChange}
        disabled={!editing}
        className="border p-2 w-full rounded mt-3"
      />

      <div className="mt-4">
        {editing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
