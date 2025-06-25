import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SeatSelector from './seatselector';
function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("showtimeMo");
  const [showtimeMo, setShowtimeMo] = useState([]);
  const [activeCinema, setActiveCinema] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const BASE_URL = 'http://localhost:5000/';

  useEffect(() => {
    axios.get(`${BASE_URL}api/movies/${id}`)
      .then(res => {
        console.log("Lấy từ /movies:", res.data);
        setMovie(res.data);
        setShowtimeMo(res.data.showtimeMo || []);
      })
      .catch(() => {
        axios.get(`${BASE_URL}api/comingsoon/${id}`)
          .then(res => {
            console.log("Lấy từ /comingsoon:", res.data);
            setMovie(res.data);
            setShowtimeMo(res.data.showtimeMo || []);
          })
          .catch(err => console.error('Không tìm thấy phim:', err));
      });
  }, [id]);

  useEffect(() => {
    if (showtimeMo.length > 0) {
      setActiveCinema(showtimeMo[0].cinema);
      setSelectedDate(showtimeMo[0].date);
    }
  }, [showtimeMo]);

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      days.push({
        label: date.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' }),
        value: date.toISOString().split('T')[0]
      });
    }
    return days;
  };

  if (!movie) {
    return <div className="text-center mt-10">Đang tải thông tin phim...</div>;
  }

  

  const handleSelectShowtime = (cinema, date, timeObj) => {
  setSelectedShowtime({
    cinema,
    date,
    ...timeObj 
  });
};

  return (
  <div className="max-w-4xl mx-auto p-4 mb-20">
    <h1 className="text-3xl font-bold mb-4 text-center">{movie.nameMo}</h1>

    {/* Tabs */}
    <div className="flex justify-center items-center px-4">
      <div className="flex space-x-4 ">
        {['showtimeMo', 'infoMo', 'news'].map(tab => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer pb-2 ${activeTab === tab ? "border-b-2 border-blue-500 font-semibold" : ""}`}
          >
            {tab === "showtimeMo" ? "Suất chiếu" : tab === "infoMo" ? "Thông tin" : "Tin tức"}
          </div>
        ))}
      </div>
    </div>

    {/* Tab Content */}
    <div className="mt-4 px-4">
      {activeTab === "showtimeMo" && (
        selectedShowtime ? (
          <SeatSelector
            showtime={selectedShowtime}
            movieName={movie.nameMo}
            onBack={() => setSelectedShowtime(null)}
          />
        ) : (
          <div className="space-y-6">
            {/* Dãy button chọn ngày */}
            <div className="flex gap-2 overflow-x-auto mb-4">
              {getNext7Days().map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(day.value)}
                  className={`px-4 py-2 rounded ${selectedDate === day.value ? 'bg-blue-500 text-white' : 'bg-white'}`}
                >
                  {day.label}
                </button>
              ))}
            </div>

            {/* Dropdown chọn rạp */}
            <div className="mb-4">
              <select
                value={activeCinema}
                onChange={e => setActiveCinema(e.target.value)}
                className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                {showtimeMo.map((entry, idx) => (
                  <option key={idx} value={entry.cinema}>
                    {entry.cinema}
                  </option>
                ))}
              </select>
            </div>

            {/* Giờ chiếu */}
            {showtimeMo
              .filter(entry => entry.cinema === activeCinema && entry.date === selectedDate)
              .map((entry, idx) => (
                <div key={idx} className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-600 mb-2">📅 Ngày chiếu: {entry.date}</p>
                  {Object.entries(
                    entry.times.reduce((acc, time) => {
                      if (!acc[time.format]) acc[time.format] = [];
                      acc[time.format].push(time);
                      return acc;
                    }, {})
                  ).map(([format, times], fIdx) => (
                    <div key={fIdx} className="mb-4">
                      <h3 className="text-blue-700 font-semibold mb-1">{format}</h3>
                      <div className="flex flex-wrap gap-2">
                        {times.map((t, i) => (
                          <div
                            key={i}
                            onClick={() => handleSelectShowtime(entry.cinema, entry.date, t)}
                            className="cursor-pointer px-3 py-1 border rounded bg-gray-100 hover:bg-blue-100 transition"
                          >
                            {t.time} – Phòng {t.room}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        )
      )}

      {activeTab === "infoMo" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Nội dung</h2>
          <p className="text-gray-700 mb-4">{movie.infoMo?.content || 'Chưa có nội dung.'}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-semibold">Đạo diễn:</h3>
              <p>{movie.infoMo?.director}</p>
            </div>
            <div>
              <h3 className="font-semibold">Diễn viên:</h3>
              <ul className="list-disc list-inside">
                {movie.infoMo?.actor?.map((actor, idx) => <li key={idx}>{actor}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Rạp chiếu:</h3>
              <ul className="list-disc list-inside">
                {movie.cinemaMo?.map((cinema, idx) => <li key={idx}>{cinema}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Đánh giá:</h3>
              <p>⭐ {movie.ratingMo} / 10</p>
            </div>
            <div>
              <h3 className="font-semibold">Độ tuổi:</h3>
              <p>⛔ {movie.agelimitMo}+ tuổi</p>
            </div>
          </div>

          {movie.infoMo?.comments?.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Bình luận</h2>
              <ul className="list-disc list-inside text-gray-600">
                {movie.infoMo.comments.map((cmt, idx) => (
                  <li key={idx}>{cmt}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeTab === "news" && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Tin tức</h2>
          <p>{movie.newsMo || "Chưa có tin tức."}</p>
        </div>
      )}
    </div>

    {/* Hình ảnh phim */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 mt-6">
      {movie.infoMo?.somePic?.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`movie-${idx}`}
          className="w-full h-60 object-cover rounded-lg shadow"
        />
      ))}
    </div>
  </div>
);

}

export default Detail;
