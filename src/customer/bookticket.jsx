import { useLocation, useNavigate } from 'react-router-dom';

function BookTicket() {
  const { state: showtime } = useLocation();
  const navigate = useNavigate();

  if (!showtime) return <p className="text-center mt-10">Không có thông tin suất chiếu.</p>;

  const { nameMo, date, time, format, cinema, room, agelimit, selectedSeats, somePic } = showtime;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎟️ Đặt vé: {nameMo}</h1>
      <p>📅 Ngày: <strong>{date}</strong></p>
      <p>🕒 Giờ: <strong>{time}</strong> | Phòng: {room} | Format: {format}</p>
      <p>📍 Rạp: {cinema} | Độ tuổi: ⛔ {agelimit}+</p>

      {somePic?.[0] && (
        <img
          src={somePic[0]}
          alt="Ảnh phim"
          className="rounded-lg my-4 w-full max-w-md object-cover"
        />
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Ghế đã chọn:</h2>
        <p className="text-blue-600 font-medium">{selectedSeats?.join(', ')}</p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        ← Quay lại chọn ghế
      </button>
    </div>
  );
}

export default BookTicket;
