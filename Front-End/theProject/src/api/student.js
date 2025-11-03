import { fetchWithAuth } from "./fetchWithAuth";

const BASE_URL = "http://localhost:5051/api/student";

export async function getStudentStats(token) {
  return await fetchWithAuth(`${BASE_URL}/stats`, {}, token);
}

export async function getRecommendedCourses(token) {
  return await fetchWithAuth(`${BASE_URL}/recommended`, {}, token);
}

export async function getEnrolledCourses(token) {
  return await fetchWithAuth(`${BASE_URL}/courses`, {}, token);
}
export async function getStudentCourseById(courseId, token) {
  return await fetchWithAuth(`${BASE_URL}/courses/${courseId}`, {}, token);
}

export async function enrollInCourse(courseId, token) {
  return await fetchWithAuth(
    `${BASE_URL}/enroll/${courseId}`,
    { method: "POST" },
    token
  );
}

export async function getStudentProfile(token) {
  return await fetchWithAuth(`${BASE_URL}/profile`, {}, token);
}

export async function updateStudentProfile(token, data) {
  return await fetchWithAuth(
    `${BASE_URL}/profile`,
    { method: "PUT", body: JSON.stringify(data) },
    token
  );
}
