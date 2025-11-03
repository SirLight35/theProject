export async function fetchWithAuth(url, options = {}, token) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });

  let body = {};
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    try {
      body = await res.json();
    } catch {
      body = {};
    }
  }

  if (!res.ok) {
    throw new Error(body.message || `Request failed ${res.status}`);
  }

  return body;
}
