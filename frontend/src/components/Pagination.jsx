import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) pages.push(i);

  return (
    <div className="flex justify-center space-x-2 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${
            p === currentPage ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
