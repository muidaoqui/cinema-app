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
        setMovie(res.data);
        setShowtimeMo(res.data.showtimeMo || []);
      })
      .catch(() => {
        axios.get(`${BASE_URL}api/comingsoon/${id}`)
          .then(res => {
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

  const handleSelectShowtime = (cinema, date, timeObj) => {
    const fullShowtime = {
      ...timeObj,
      cinema,
      date,
      agelimit: movie.agelimitMo,
      nameMo: movie.nameMo,
      somePic: movie.infoMo?.somePic || []
    };
    setSelectedShowtime(fullShowtime);
  };

  const [expanded, setExpanded] = useState(false);

  if (!movie) return <div className="text-center mt-10">Đang tải thông tin phim...</div>;

  

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

      {/* Nội dung Tab */}
      <div className="mt-4 px-4">
        {activeTab === "showtimeMo" && (
          selectedShowtime ? (
            <SeatSelector
              showtime={selectedShowtime}
              movieName={selectedShowtime.nameMo}
              onBack={() => setSelectedShowtime(null)}
            />
          ) : (
            <div className="space-y-6">
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

              <select
                value={activeCinema}
                onChange={e => setActiveCinema(e.target.value)}
                className="mb-4 bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              >
                {showtimeMo.map((entry, idx) => (
                  <option key={idx} value={entry.cinema}>{entry.cinema}</option>
                ))}
              </select>

              {showtimeMo
                .filter(entry => entry.cinema === activeCinema && entry.date === selectedDate)
                .map((entry, idx) => (
                  <div key={idx} className="bg-white p-4 rounded shadow">
                    {Object.entries(
                      entry.times.reduce((acc, time) => {
                        if (!acc[time.format]) acc[time.format] = [];
                        acc[time.format].push(time);
                        return acc;
                      }, {})
                    ).map(([format, times], fIdx) => (
                      <div key={fIdx}>
                        <h3 className="text-blue-700 font-semibold mb-1">{format}</h3>
                        <div className="flex flex-wrap gap-2">
                          {times.map((t, i) => (
                            <div
                              key={i}
                              onClick={() => handleSelectShowtime(entry.cinema, entry.date, t)}
                              className="cursor-pointer px-3 py-1 border rounded bg-gray-100 hover:bg-blue-100"
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
  <div className="bg-white p-4 rounded shadow max-w-md mx-auto">

    {/* Ảnh poster + Thông tin bên phải */}
    <div className="flex gap-4">
      {/* Poster */}
      {movie.infoMo?.somePic?.[0] && (
        <img
          src={movie.infoMo.somePic[0]}
          alt="Poster"
          className="w-2/3 h-auto rounded-lg shadow-md"
        />
      )}

      {/* Các biểu tượng */}
      <div className="flex flex-col gap-2 justify-start">
        <div className="bg-pink-50 text-pink-600 text-sm p-2 rounded shadow text-center">
          <div className="text-xs">🎭 Limit</div>
          <div className="font-bold">T{movie.agelimitMo || "C"}</div>
        </div>
        <div className="bg-pink-50 text-pink-600 text-sm p-2 rounded shadow text-center">
          <div className="text-xs">⏱ Duration</div>
          <div className="font-bold">{movie.infoMo?.duration || "2h 00m"}</div>
        </div>
        <div className="bg-pink-50 text-pink-600 text-sm p-2 rounded shadow text-center">
          <div className="text-xs">⭐ Rating</div>
          <div className="font-bold">{movie.ratingMo || "?"}/10</div>
        </div>
      </div>
    </div>

    {/* Tiêu đề phim */}
    <h3 className="mt-6 text-xl font-bold">{movie.nameMo}</h3>
    <p className="text-sm text-gray-500 mb-2">{movie.infoMo?.director}</p>

    {/* Mô tả */}
    <h4 className="text-md font-semibold mt-4">Description</h4>
    
    <div className="text-sm text-gray-700">
      <p className={expanded ? '' : 'line-clamp-3'}>
        {movie.infoMo?.content || 'Chưa có mô tả.'}
      </p>

      {movie.infoMo?.content?.length > 100 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 mt-2 font-medium hover:underline"
        >
          {expanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      )}
    </div>


    {/* Nút chọn ghế */}
    <button
      onClick={() => {
        // hành động, ví dụ: chuyển tab hoặc điều hướng đến chọn ghế
      }}
      className="mt-6 w-full bg-red-400 text-white font-semibold py-2 rounded-lg hover:bg-red-500"
    >
      Select Seat
    </button>
  </div>
)}


        {activeTab === "news" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Tin tức</h2>
            <p>{movie.newsMo || "Chưa có tin tức cho phim này."}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
