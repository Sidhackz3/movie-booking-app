// src/components/SeatGrid.jsx
import React from "react";

/**
 * Props:
 * - seats: array of { seatNumber, status } (status: "available" | "booked")
 * - selectedSeats: array of seatNumbers
 * - onToggle(seatNumber)
 */
export default function SeatGrid({ seats = [], selectedSeats = [], onToggle }) {
  // Build rows from seats array (seatNumber like A1, A2 etc.)
  // We'll try to infer rows from first character of seatNumber
  const rowsMap = {};
  seats.forEach((s) => {
    const row = String(s.seatNumber).charAt(0) || "A";
    rowsMap[row] = rowsMap[row] || [];
    rowsMap[row].push(s);
  });

  const sortedRows = Object.keys(rowsMap).sort();

  return (
    <div className="space-y-3">
      {sortedRows.map((r) => (
        <div key={r} className="flex items-center space-x-3">
          <div className="w-6 text-sm font-medium">{r}</div>
          <div className="flex flex-wrap gap-2">
            {rowsMap[r].map((seat) => {
              const isBooked = seat.status === "booked";
              const isSelected = selectedSeats.includes(seat.seatNumber);
              const base =
                "w-10 h-10 flex items-center justify-center rounded cursor-pointer select-none";

              const cls = isBooked
                ? "bg-gray-400 text-white cursor-not-allowed"
                : isSelected
                ? "bg-green-600 text-white"
                : "bg-gray-100 hover:bg-gray-200";

              return (
                <div
                  key={seat.seatNumber}
                  className={`${base} ${cls}`}
                  onClick={() => {
                    if (!isBooked) onToggle(seat.seatNumber);
                  }}
                >
                  <span className="text-xs font-medium">{seat.seatNumber}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="mt-2 text-sm text-gray-600">
        <span className="inline-block w-3 h-3 bg-gray-100 mr-1 align-middle" /> Available
        &nbsp;&nbsp;
        <span className="inline-block w-3 h-3 bg-green-600 mr-1 align-middle" /> Selected
        &nbsp;&nbsp;
        <span className="inline-block w-3 h-3 bg-gray-400 mr-1 align-middle" /> Booked
      </div>
    </div>
  );
}
