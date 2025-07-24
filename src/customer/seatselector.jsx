import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SeatSelector({ showtime, movieName, movieId, somePic, agelimit, format, onBack }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatMap, setSeatMap] = useState(null);
  const navigate = useNavigate();

  const seatPrices = {
    regular: 80000,
    vip: 120000,
    screenfront: 60000,
  };

  useEffect(() => {
  if (showtime?.actualShowtimeId) {
    fetch(`http://localhost:5000/api/actualshowtimes/${showtime.actualShowtimeId}/seats`)
      .then(res => res.json())
      .then(data => {
        console.log("ActualShowtime seats data:", data);
        setSeatMap(data);
      })
      .catch(err => console.error("Lỗi khi tải trạng thái ghế:", err));
  } else if (showtime?.seatMapId) {
    fetch(`http://localhost:5000/api/seatmaps/${showtime.seatMapId}`)
      .then(res => res.json())
      .then(data => {
        console.log("SeatMap data:", data);
        setSeatMap(data);
      })
      .catch(err => console.error("Lỗi khi tải sơ đồ ghế:", err));
  }
}, [showtime?.actualShowtimeId, showtime?.seatMapId]);

  const toggleSeat = (seat) => {
    // Không cho chọn ghế đã đặt
    if (seat.status === "booked" || seat.booked) return;
    const seatId = seat.code || seat.id;
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatClass = (seat) => {
    if (seat.status === "booked" || seat.booked) return "bg-gray-400";
    const seatId = seat.code || seat.id;
    if (selectedSeats.includes(seatId)) return "bg-red-500";
    return "bg-gray-200 hover:bg-gray-300";
  };

  // Chuẩn hóa lấy danh sách ghế để render
  const seatsToRender = seatMap?.layout
    ? seatMap.layout.flatMap(row => row.seats)
    : Array.isArray(seatMap) ? seatMap : [];

  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const seat = seatsToRender.find(s => (s.code || s.id) === seatId);
    return total + (seatPrices[seat?.type] || 0);
  }, 0);

  const handleConfirm = () => {
    navigate('/customer/bookticket', {
      state: {
        ...showtime,
        selectedSeats,
        totalPrice
      }
    });
  };

  if (!Array.isArray(seatsToRender) || seatsToRender.length === 0) {
    return <div className="text-center py-10 text-red-500">Không tải được sơ đồ ghế!</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      {/* Màn hình */}
      <div className="w-40 h-2 bg-red-300 rounded-full my-2"></div>

      {/* Ghế */}
      <div className="grid grid-cols-10 gap-2">
        {seatsToRender.map(seat => (
          <div
            key={seat.code || seat.id}
            className={`w-6 h-6 rounded ${getSeatClass(seat)} text-[10px] text-white flex items-center justify-center`}
            onClick={() => toggleSeat(seat)}
            title={`${seat.code || seat.id} - ${seat.type}`}
            style={{ cursor: (seat.status === "booked" || seat.booked) ? "not-allowed" : "pointer" }}
          >
            {seat.code || seat.id}
          </div>
        ))}
      </div>

      {/* Ghi chú màu */}
      <div className="flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-1"><div className="w-4 h-4 bg-red-500 rounded"></div> Đã chọn</div>
        <div className="flex items-center gap-1"><div className="w-4 h-4 bg-gray-400 rounded"></div> Đã đặt</div>
        <div className="flex items-center gap-1"><div className="w-4 h-4 bg-gray-200 rounded border"></div> Trống</div>
      </div>

      {/* Thông tin phim và suất */}
      <div className="bg-gray-100 w-full rounded-lg p-4 text-center">
        <h3 className="font-semibold">{movieName}</h3>
        <p className="text-sm mt-1">{showtime.date} - {showtime.time}</p>
      </div>

      {/* Tổng tiền + nút xác nhận */}
      <div className="w-full text-center">
        <p className="text-lg font-bold text-gray-700">
          Tổng Cộng: {totalPrice.toLocaleString()}đ
        </p>
        <button
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
          className={`w-full mt-3 py-3 rounded-lg text-white text-sm font-bold ${
            selectedSeats.length ? "bg-orange-500" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Xác nhận ghế
        </button>
      </div>

      {/* Quay lại */}
      {onBack && (
        <button onClick={onBack} className="mt-4 text-sm text-blue-500 hover:underline">
          ← Quay lại chọn suất chiếu
        </button>
      )}
    </div>
  );
}

export default SeatSelector;