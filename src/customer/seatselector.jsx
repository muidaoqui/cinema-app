import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SeatSelector({ showtime, movieName, onBack }) {
  const [seatMap, setSeatMap] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const BASE_URL = 'http://localhost:5000/';

  useEffect(() => {
    if (showtime.seatMapId) {
      axios.get(`${BASE_URL}api/seatmaps/${showtime.seatMapId?._id || showtime.seatMapId}`)
        .then(res => setSeatMap(res.data))
        .catch(err => console.error('Lỗi lấy sơ đồ ghế:', err));
    }
  }, [showtime.seatMapId]);

  const toggleSeat = (seatCode) => {
    setSelectedSeats(prev =>
      prev.includes(seatCode)
        ? prev.filter(code => code !== seatCode)
        : [...prev, seatCode]
    );
  };

  const getSeatStyle = (type, selected) => {
    let base = "w-10 h-10 flex items-center justify-center rounded cursor-pointer text-sm font-semibold";
    let color = {
      regular: "bg-gray-300 hover:bg-gray-400",
      vip: "bg-yellow-300 hover:bg-yellow-400",
      screenfront: "bg-red-300 hover:bg-red-400"
    }[type] || "bg-gray-200";

    let selectedStyle = selected ? "ring-2 ring-blue-500" : "";
    return `${base} ${color} ${selectedStyle}`;
  };

  if (!seatMap) return <div className="text-center py-10">Đang tải sơ đồ ghế...</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Chọn ghế - {movieName}</h2>
      <p className="mb-2 text-sm text-gray-600">📍 {showtime.cinema} | 🕒 {showtime.time} | Phòng: {showtime.room}</p>

      {/* Ghế */}
      <div className="space-y-3 my-6">
        {seatMap.layout.map((rowObj, rowIdx) => (
          <div key={rowIdx} className="flex items-center gap-2">
            <span className="w-6 text-right font-medium">{rowObj.row}</span>
            <div className="flex gap-2">
              {rowObj.seats.map((seat, idx) => {
                const seatCode = `${rowObj.row}${seat.id}`;
                return (
                  <div
                    key={idx}
                    className={getSeatStyle(seat.type, selectedSeats.includes(seatCode))}
                    onClick={() => toggleSeat(seatCode)}
                  >
                    {seat.id}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Chú thích */}
      <div className="flex gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 rounded" /> Thường
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-yellow-300 rounded" /> VIP
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-red-300 rounded" /> Gần màn hình
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-white border border-blue-500 rounded" /> Đã chọn
        </div>
      </div>

      {/* Nút quay lại */}
      <button
        onClick={onBack}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        ← Quay lại
      </button>
    </div>
  );
}

export default SeatSelector;
