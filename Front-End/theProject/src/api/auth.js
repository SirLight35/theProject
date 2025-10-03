export async function registerUser(payload) {
  const res = await fetch("http://localhost:5051/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Registeration Failed");
  }
  return res.json();
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
