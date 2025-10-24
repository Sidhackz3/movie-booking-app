// src/pages/BrowseMovies.jsx
import React, { useEffect, useState, useCallback } from "react";
import { fetchMovies } from "../api/movieAPI";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

export default function BrowseMovies({ onSelectMovie }) {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [limit] = useState(12);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetchMovies({ page: pageNum, limit, search });
      // response shape: { success, data, total }
      setMovies(resp.data || []);
      setTotal(resp.total || 0);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [pageNum, limit, search]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">🎬 Browse Movies</h1>
        <div className="w-80">
          <SearchBar onSearch={(q) => { setSearch(q); setPageNum(1); }} />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading movies...</div>
      ) : (
        <>
          {movies.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No movies found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {movies.map((m) => (
                <MovieCard
                  key={m._id || m.id}
                  movie={m}
                  onBook={(movie) => onSelectMovie(movie)}
                />
              ))}
            </div>
          )}

          <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            onPageChange={(p) => setPageNum(p)}
          />
        </>
      )}
    </div>
  );
}
