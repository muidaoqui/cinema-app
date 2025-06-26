import { useLocation } from 'react-router-dom';

function BookTicket() {
  const { state: showtime } = useLocation(); // lấy lại thông tin
  if (!showtime) return <p>Không có thông tin suất chiếu.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Đặt vé: {showtime.nameMo}</h1>
      <p>📅 {showtime.date} – 🕒 {showtime.time}</p>
      <p>🎬 Format: {showtime.format} – Phòng: {showtime.room}</p>
      <p>📍 Rạp: {showtime.cinema} – Độ tuổi: {showtime.agelimit}+</p>

      {showtime.somePic?.[0] && (
        <img
          src={showtime.somePic[0]}
          alt="Movie"
          className="rounded-lg my-4 w-full max-w-md object-cover"
        />
      )}

      {/* Ở đây bạn có thể tích hợp thêm <SeatSelector /> hoặc tiến hành đặt vé */}
    </div>
  );
}

export default BookTicket;
