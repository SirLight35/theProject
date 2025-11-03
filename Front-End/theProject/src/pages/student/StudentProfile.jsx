import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getStudentProfile, updateStudentProfile } from "../../api/student";
export default function StudentProfile() {
  const { user } = useAuth();
  const token = user?.token;
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getStudentProfile(token);
      setProfile(data.data || data);
    }
    load();
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const updated = await updateStudentProfile(token, profile);
    setProfile(updated);
    setEditing(false);
  };

  if (!profile) return <p>Loading.....</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <img
        src={profile.avatar || "https://placehold.co/100x100"}
        alt="avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />

      <div>
        <label className="block text-sm">Name</label>
        <input
          name="name"
          value={profile.name || ""}
          onChange={handleChange}
          disabled={!editing}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mt-3">
        <label className="block text-sm">Bio</label>
        <textarea
          name="bio"
          value={profile.bio || ""}
          onChange={handleChange}
          disabled={!editing}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mt-6 flex justify-between">
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
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
