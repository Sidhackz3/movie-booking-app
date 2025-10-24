const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { movieId, name, email, selectedSeats } = req.body;

    if (!movieId || !selectedSeats?.length) {
      throw new Error("Missing movieId or seats");
    }

    const movie = await Movie.findById(movieId).session(session);
    if (!movie) throw new Error("Movie not found");

    // Check seat availability
    const unavailableSeats = selectedSeats.filter(
      (s) => movie.seats.find((seat) => seat.seatNumber === s).status === "booked"
    );

    if (unavailableSeats.length > 0) {
      throw new Error(`Seats already booked: ${unavailableSeats.join(", ")}`);
    }

    // Mark seats as booked
    movie.seats.forEach((seat) => {
      if (selectedSeats.includes(seat.seatNumber)) seat.status = "booked";
    });

    await movie.save({ session });

    const booking = await Booking.create(
      [
        { movieId, name, email, selectedSeats, status: "booked" },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, data: booking[0] });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ success: false, message: err.message });
  }
};
