// src/api/movieAPI.js
const API_BASE = "https://render.com/docs/web-services?_gl=1*1yy1bwz*_ga*NTY3NDg4OTExLjE3NjI0MjA1MDY.*_ga_QK9L9QJC5N*czE3NjI0MjA1MDUkbzEkZzEkdDE3NjI0MjIwMTkkajYwJGwwJGgw#port-binding";

export async function fetchMovies({ page = 1, limit = 12, search = "" } = {}) {
  const qs = new URLSearchParams({ page, limit, search }).toString();
  const res = await fetch(`${API_BASE}/movies?${qs}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json(); // { success, data, total }
}

export async function fetchMovieById(id) {
  const res = await fetch(`${API_BASE}/movies/${id}`);
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json(); // { success, data }
}

export async function createBooking(payload) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Booking failed");
  return data;
}
