import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SeatSelector({ showtime, movieName, onBack }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatMap, setSeatMap] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showtime.seatMapId) {
      fetch(`http://localhost:5000/api/seatmaps/${showtime.seatMapId}`)
        .then(res => res.json())
        .then(data => setSeatMap(data))
        .catch(err => console.error(err));
    }
  }, [showtime.seatMapId]);

  const toggleSeat = (seat) => {
    if (seat.booked) return;
    setSelectedSeats(prev =>
      prev.includes(seat.id)
        ? prev.filter(s => s !== seat.id)
        : [...prev, seat.id]
    );
  };

  const getSeatClass = (seat) => {
    if (seat.booked) return "bg-gray-400";
    if (selectedSeats.includes(seat.id)) return "bg-red-500";
    return "bg-gray-200 hover:bg-gray-300";
  };

  const totalPrice = selectedSeats.length * (seatMap?.price || 100);

  const handleConfirm = () => {
    navigate('/bookticket', {
      state: {
        ...showtime,
        selectedSeats
      }
    });
  };

  if (!seatMap) return <div className="text-center py-10">Đang tải sơ đồ ghế...</div>;

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      {/* Mô phỏng màn hình */}
      <div className="w-40 h-2 bg-red-300 rounded-full my-2"></div>

      {/* Sơ đồ ghế */}
      <div className="grid grid-cols-10 gap-2">
        {seatMap.layout.flatMap((row, rowIdx) =>
          row.seats.map((seat, colIdx) => (
            <div
              key={seat.id}
              className={`w-6 h-6 rounded ${getSeatClass(seat)} text-[10px] text-white flex items-center justify-center`}
              onClick={() => toggleSeat(seat)}
            >
              {seat.id}
            </div>
          ))
        )}
      </div>

      {/* Ghi chú trạng thái */}
      <div className="flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-500 rounded"></div> Selected
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-400 rounded"></div> Booked
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-200 rounded border"></div> Available
        </div>
      </div>

      {/* Thời gian */}
      <div className="bg-gray-100 w-full rounded-lg p-4 text-center">
        <h3 className="font-semibold">Chọn ngày & giờ</h3>
        <p className="text-sm mt-1">{showtime.date} - {showtime.time}</p>
      </div>

      {/* Tổng tiền + nút xác nhận */}
      <div className="w-full text-center">
        <p className="text-lg font-bold text-gray-700">Total Price: ${totalPrice.toFixed(2)}</p>
        <button
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
          className={`w-full mt-3 py-3 rounded-lg text-white text-sm font-bold ${
            selectedSeats.length ? "bg-red-500" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Confirm Seat
        </button>
      </div>
    </div>
  );
}

export default SeatSelector;
