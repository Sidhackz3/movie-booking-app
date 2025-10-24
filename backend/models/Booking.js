const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  name: String,
  email: String,
  selectedSeats: [String],
  status: { type: String, enum: ["booked", "cancelled"], default: "booked" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
