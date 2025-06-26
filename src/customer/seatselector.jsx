import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SeatSelector({ showtime, movieName, agelimit, cinema, format, onBack }) {

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
    let base = "w-6 h-8 flex items-center justify-center rounded cursor-pointer text-sm font-semibold";
    let color = {
      regular: "bg-gray-300 hover:bg-gray-400",
      vip: "bg-yellow-300 hover:bg-yellow-400",
      screenfront: "bg-red-300 hover:bg-red-400"
    }[type] || "bg-gray-200";

    let selectedStyle = selected ? "ring-2 ring-blue-500" : "";
    return `${base} ${color} ${selectedStyle}`;
  };

  const seatPrices = {
  regular: 70000,
  vip: 100000,
  screenfront: 50000
};
  const totalPrice = selectedSeats.reduce((sum, seatCode) => {
  const [rowLetter, ...rest] = seatCode; // ví dụ A3 → row=A, seatId=3
  const rowData = seatMap.layout.find(r => r.row === rowLetter);
  const seatData = rowData?.seats.find(s => `${rowLetter}${s.id}` === seatCode);
  if (!seatData) return sum;
  return sum + seatPrices[seatData.type] || 0;
}, 0);


  if (!seatMap) return <div className="text-center py-10">Đang tải sơ đồ ghế...</div>;

  return (
    <div className="bg-white  rounded shadow my-8">
      <div className=' text-center'>
        <div className="flex justify-between mb-4">
          {/* Nút quay lại */}
          <button
            onClick={onBack}
            className="w-1/6 border border-blue-300 px-4 hover:bg-gray-300 rounded"
          >
            ← 
          </button>
          <h2 className="text-3xl font-bold mb-4">{showtime.cinema}</h2>
        </div>
        <div className='flex justify-between'>
          <p>{format} <span className="text-l  text-white border px-4 py-2 bg-orange-400 ml-4">{agelimit}+</span></p>
          <label className='border px-4 py-2'>{showtime.time}</label>
        </div>
        
      </div>

      <div className="text-center text-xl font-semibold my-4 border-b pb-4 border-orange-300">
        Màn hình
      </div>

      {/* Ghế */}
      <div className="space-y-3 my-6">
        {seatMap.layout.map((rowObj, rowIdx) => (
          <div key={rowIdx} className="flex items-center gap-2">
            <span className="w-6 text-right font-medium">{rowObj.row}</span>
            <div className="flex gap-2">
              {rowObj.seats.map((seat, idx) => {
                const seatCode = `${seat.id}`;
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
      <div className="flex gap-4 mb-4 text-sm w-full">
        <div className="flex items-center gap-1 w-1/4">
          <div className="w-5 h-5 bg-gray-300 rounded" /> Thường
        </div>
        <div className="flex items-center gap-1 w-1/4">
          <div className="w-5 h-5 bg-yellow-300 rounded" /> VIP
        </div>
        <div className="flex items-center gap-1 w-1/4">
          <div className="w-5 h-5 bg-red-300 rounded" /> Gần, xa
        </div>
        <div className="flex items-center gap-1 w-1/4">
          <div className="w-5 h-5 bg-white border border-blue-500 rounded" /> Đã chọn
        </div>
      </div>
      {/* Tổng tiền */}
      <div className='flex justify-between p-4'>
        <div className="mt-4  font-semibold text-lg">
          <p className="text-gray-600">
            {selectedSeats.length} ghế: {selectedSeats.join(", ")}
          </p>
          <p>Tổng tiền: <span className="text-blue-600">{totalPrice.toLocaleString()}đ</span></p>
        </div>
        <div className="flex items-center">
          <button
            disabled={selectedSeats.length === 0}
            className={`px-6 py-2 rounded bg-orange-400 text-white font-semibold ${selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Đặt vé
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatSelector;
