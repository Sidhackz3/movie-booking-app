const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNumber: String,
  status: { type: String, enum: ["available", "booked"], default: "available" },
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  director: String,
  cast: [String], // you’re splitting comma-separated string into array in controller
  genre: String,
  releaseDate: String,
  duration: Number,
  posterUrl: String,
  rating: Number,
  showtimes: [String],
  seats: [seatSchema],
});

module.exports = mongoose.model("Movie", movieSchema);
