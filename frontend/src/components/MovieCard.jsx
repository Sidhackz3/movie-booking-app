// src/components/MovieCard.jsx
import React from "react";

export default function MovieCard({ movie, onBook }) {
  // movie may or may not have posterUrl. Use placeholder if not present.
  const poster = movie.posterUrl || movie.poster_path || null;
  const posterSrc = poster
    ? poster
    : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        src={posterSrc}
        alt={movie.title}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
          {movie.genre || movie.description || "No description available"}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="text-sm text-gray-700">⭐ {movie.rating ?? "N/A"}</div>
          <button
            onClick={() => onBook(movie)}
            className="ml-3 px-3 py-1 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
