const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const movieRoutes = require("./routes/movieRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);

// Error middleware
const { errorHandler } = require("./middlewares/errorMiddleware");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
