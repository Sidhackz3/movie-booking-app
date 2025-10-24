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
