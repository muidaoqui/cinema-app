import React, { useEffect, useState } from "react";

function SeatSelectorPOS({ showtime, movieName, onBack, onConfirm }) {
  const [seatMap, setSeatMap] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatPrices = {
    regular: 80000,
    vip: 120000,
    screenfront: 60000,
  };

  useEffect(() => {
    if (showtime?.seatMapId) {
      fetch(`http://localhost:5000/api/seatmaps/${showtime.seatMapId}`)
        .then(res => res.json())
        .then(data => setSeatMap(data))
        .catch(err => console.error("Seatmap error:", err));
    }
  }, [showtime]);

  const toggleSeat = (seat) => {
    if (seat.booked) return;
    setSelectedSeats(prev =>
      prev.includes(seat.id)
        ? prev.filter(id => id !== seat.id)
        : [...prev, seat.id]
    );
  };

  const getSeatClass = (seat) => {
    if (seat.booked) return "bg-gray-400";
    if (selectedSeats.includes(seat.id)) return "bg-red-500";
    return "bg-gray-200 hover:bg-gray-300";
  };

  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const seat = seatMap?.layout.flatMap(r => r.seats).find(s => s.id === seatId);
    return total + (seatPrices[seat?.type] || 0);
  }, 0);

  if (!seatMap) return <div>Đang tải sơ đồ ghế...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Chọn Ghế - {movieName}</h2>

      {/* Màn hình */}
      <div className="w-40 h-2 bg-red-400 rounded-full mx-auto my-4"></div>

      {/* Ghế */}
      <div className="flex flex-col items-center gap-2">
        {seatMap.layout.map(row => (
          <div key={row.row} className="flex gap-1">
            {row.seats.map(seat => (
              <div
                key={seat.id}
                className={`w-6 h-6 text-[10px] flex items-center justify-center text-white rounded cursor-pointer ${getSeatClass(seat)}`}
                onClick={() => toggleSeat(seat)}
              >
                {seat.id}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Trạng thái */}
      <div className="flex gap-3 justify-center my-4 text-sm">
        <div className="flex items-center gap-1"><div className="w-4 h-4 bg-red-500 rounded" /> Đã chọn</div>
        <div className="flex items-center gap-1"><div className="w-4 h-4 bg-gray-400 rounded" /> Đã bán</div>
        <div className="flex items-center gap-1"><div className="w-4 h-4 bg-gray-200 rounded border" /> Còn trống</div>
      </div>

      {/* Tổng tiền + xác nhận */}
      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Quay lại</button>
        <div className="flex gap-4 items-center">
          <p className="text-lg font-bold text-red-500">Tổng: {totalPrice.toLocaleString()}đ</p>
          <button
            onClick={() => onConfirm({ selectedSeats, totalPrice })}
            disabled={!selectedSeats.length}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Xác nhận ghế
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatSelectorPOS;
