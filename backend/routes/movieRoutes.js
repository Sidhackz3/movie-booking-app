const express = require("express");
const router = express.Router();
const { getMovies, getMovieById, createMovie } = require("../controllers/movieController");

// Get all movies (with pagination & search)
router.get("/", getMovies);

// ✅ Get single movie by ID
router.get("/:id", getMovieById);

// ✅ Add new movie
router.post("/addMovie", createMovie);

module.exports = router;
