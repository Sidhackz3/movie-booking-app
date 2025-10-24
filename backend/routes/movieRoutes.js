const express = require("express");
const router = express.Router();
const { getMovies, getMovieById } = require("../controllers/movieController");

// Get all movies (with pagination & search)
router.get("/", getMovies);

// ✅ Get single movie by ID
router.get("/:id", getMovieById);

module.exports = router;
