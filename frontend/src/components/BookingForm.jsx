import React, { useState } from "react";

export default function BookingForm({ selectedSeats }) {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || selectedSeats.length === 0) {
      alert("Please fill all fields and select seats");
      return;
    }
    alert(`Booking confirmed for seats: ${selectedSeats.join(", ")}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>
    </form>
  );
}
