import { fetchWithAuth } from "./fetchWithAuth";

const BASE_URL = "http://localhost:5051/api/educator";

export async function getEducatorStats(token) {
  return await fetchWithAuth(`${BASE_URL}/stats`, {}, token);
}

export async function getEducatorCourses(token) {
  return await fetchWithAuth(`${BASE_URL}/courses`, {}, token);
}

export async function getEducatorProfile(token) {
  return await fetchWithAuth(`${BASE_URL}/profile`, {}, token);
}

export async function updateEducatorProfile(token, data) {
  return await fetchWithAuth(
    `${BASE_URL}/profile`,
    { method: "PUT", body: JSON.stringify(data) },
    token
  );
}
export async function createEducatorCourse(token, courseData) {
  return await fetchWithAuth(
    `${BASE_URL}/courses`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData),
    },
    token
  );
}
export async function deleteEducatorCourse(token, id) {
  return await fetchWithAuth(
    `http://localhost:5051/api/educator/courses/${id}`,
    { method: "DELETE" },
    token
  );
}

export async function updateEducatorCourse(token, id, data) {
  return await fetchWithAuth(
    `http://localhost:5051/api/educator/courses/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    token
  );
}
