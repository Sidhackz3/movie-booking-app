const Movie = require("../models/Movie");

// Get all movies with pagination & search
exports.getMovies = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = { title: { $regex: search, $options: "i" } };

    const movies = await Movie.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const count = await Movie.countDocuments(query);

    res.json({ success: true, data: movies, total: count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get single movie by ID (for booking page)
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    res.json({ success: true, data: movie });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Add createMovie controller (with auto seat generation)
exports.createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      director,
      cast,
      genre,
      releaseDate,
      duration,
      posterUrl,
      rating,
      showtimes
    } = req.body;

    // Convert cast to array if it's a comma-separated string
    const normalizedCast =
      typeof cast === "string"
        ? cast.split(",").map((s) => s.trim()).filter(Boolean)
        : cast;

    // Generate 50 default seats if not provided
    const seats = [];
    const rows = ["A", "B", "C", "D", "E"];
    for (let r of rows) {
      for (let i = 1; i <= 10; i++) {
        seats.push({ seatNumber: `${r}${i}`, status: "available" });
      }
    }

    const newMovie = new Movie({
      title,
      description,
      director,
      cast: normalizedCast,
      genre,
      releaseDate,
      duration,
      posterUrl,
      rating,
      showtimes,
      seats,
    });

    await newMovie.save();
    res.status(201).json({ success: true, data: newMovie });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

