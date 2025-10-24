import React, { useState } from "react";
import BrowseMovies from "./pages/BrowseMovies";
import BookingPage from "./pages/BookingPage";

function App() {
  const [page, setPage] = useState("browse");
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {page === "browse" && (
        <BrowseMovies
          onSelectMovie={(movie) => {
            setSelectedMovie(movie);
            setPage("booking");
          }}
        />
      )}
      {page === "booking" && selectedMovie && (
        <BookingPage
          movie={selectedMovie}
          onBack={() => setPage("browse")}
        />
      )}
    </div>
  );
}

export default App;
