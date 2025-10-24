// src/pages/BookingPage.jsx
import React, { useEffect, useState } from "react";
import SeatGrid from "../components/SeatGrid";
import { fetchMovieById, createBooking } from "../api/movieAPI";

export default function BookingPage({ movie: movieSummary, onBack }) {
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // fetch full movie details (with seats) by id
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const id = movieSummary._id || movieSummary.id;
        const resp = await fetchMovieById(id);
        // assume backend returns { success, data }
        setMovie(resp.data || resp); // support both shapes
      } catch (err) {
        console.error(err);
        setMessage({ type: "error", text: "Failed to load movie details." });
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [movieSummary]);

  const toggleSeat = (seatNum) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNum) ? prev.filter((s) => s !== seatNum) : [...prev, seatNum]
    );
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!form.name || !form.email) {
      setMessage({ type: "error", text: "Please provide name and email." });
      return;
    }
    if (selectedSeats.length === 0) {
      setMessage({ type: "error", text: "Select at least one seat." });
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        movieId: movie._id || movie.id,
        name: form.name,
        email: form.email,
        selectedSeats,
      };
      const resp = await createBooking(payload); // will throw if error
      setMessage({ type: "success", text: "Booking successful!" });
      // update UI: mark selected seats as booked locally
      setMovie((m) => {
        const newSeats = m.seats.map((s) =>
          selectedSeats.includes(s.seatNumber) ? { ...s, status: "booked" } : s
        );
        return { ...m, seats: newSeats };
      });
      setSelectedSeats([]);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Booking failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-indigo-600 hover:underline"
      >
        ← Back to Browse
      </button>

      {loading || !movie ? (
        <div className="text-center py-10">Loading movie details...</div>
      ) : (
        <>
          <div className="bg-white rounded shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-1">{movie.title}</h2>
            <p className="text-sm text-gray-600 mb-1">{movie.genre}</p>
            <p className="text-sm text-gray-700 mb-2">{movie.description}</p>
            <div className="text-sm text-gray-600">Rating: ⭐ {movie.rating}</div>
          </div>

          <div className="bg-white rounded shadow p-4 mb-6">
            <h3 className="font-semibold mb-3">Select Seats</h3>
            <SeatGrid
              seats={movie.seats || []}
              selectedSeats={selectedSeats}
              onToggle={toggleSeat}
            />
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-3">Your Details</h3>
            {message && (
              <div
                className={`mb-3 p-2 rounded text-sm ${
                  message.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                }`}
              >
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Seats:</span>{" "}
                  <span className="text-sm text-gray-600">{selectedSeats.join(", ") || "none"}</span>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
                >
                  {submitting ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
