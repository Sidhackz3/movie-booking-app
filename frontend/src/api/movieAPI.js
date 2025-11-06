// src/api/movieAPI.js
const API_BASE = "https://movie-booking-app-bbgn.onrender.com";

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
