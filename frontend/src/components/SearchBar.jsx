// src/components/SearchBar.jsx
import React, { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      onSearch(value.trim());
    }, 500); // 500ms debounce
    return () => clearTimeout(t);
  }, [value, onSearch]);

  return (
    <div className="w-full">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search movies by title..."
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
    </div>
  );
}
