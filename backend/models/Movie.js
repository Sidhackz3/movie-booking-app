const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNumber: String,
  status: { type: String, enum: ["available", "booked"], default: "available" },
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: String,
  rating: Number,
  showtimes: [String],
  seats: [seatSchema],
});

module.exports = mongoose.model("Movie", movieSchema);
