export async function registerUser(payload) {
  try {
    const res = await fetch("http://localhost:5051/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message =
        data?.message || `Request failed with status ${res.status}`;
      throw new Error(message);
    }
    return data;
  } catch (error) {
    console.error("Register user error:", error.message);
    throw error;
  }
}

export async function loginUser(payload) {
  const res = await fetch("http://localhost:5051/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Login Failed");
  }
  return res.json();
}
