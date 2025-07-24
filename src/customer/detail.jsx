import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SeatSelector from './seatselector';

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("showtimeMo");
  const [actualShowtimes, setActualShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const BASE_URL = 'http://localhost:5000/';

  // Lấy thông tin phim
  useEffect(() => {
    axios.get(`${BASE_URL}api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(() => {
        axios.get(`${BASE_URL}api/comingsoon/${id}`)
          .then(res => setMovie(res.data))
          .catch(err => console.error('Không tìm thấy phim:', err));
      });
  }, [id]);

  // Lấy danh sách actualshowtimes theo movieId
  useEffect(() => {
    if (movie && movie._id) {
      axios.get(`${BASE_URL}api/actualshowtimes/${movie._id}`)
        .then(res => setActualShowtimes(res.data))
        .catch(() => setActualShowtimes([]));
    }
  }, [movie]);

  const cinemas = Array.from(new Set(actualShowtimes.map(s => s.cinema)));
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

  const [activeCinema, setActiveCinema] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (actualShowtimes.length > 0) {
      setActiveCinema(actualShowtimes[0].cinema);
      setSelectedDate(actualShowtimes[0].date);
    }
  }, [actualShowtimes]);

  const handleSelectShowtime = (show) => {
    setSelectedShowtime({
      ...show,
      movieId: movie._id,
      nameMo: movie.nameMo,
      somePic: movie.infoMo?.somePic || [],
      agelimit: movie.agelimitMo,
      format: show.format,
      actualShowtimeId: show._id
    });
  };

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
              movieId={selectedShowtime.movieId}
              somePic={selectedShowtime.somePic}
              agelimit={selectedShowtime.agelimit}
              format={selectedShowtime.format}
              onBack={() => setSelectedShowtime(null)}
            />
          ) : (
            <div className="space-y-6">
              {/* Chọn ngày */}
              <div className="flex gap-2 overflow-x-auto mb-4">
                {getNext7Days().map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(day.value)}
                    className={`px-4 py-2 rounded ${selectedDate === day.value ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300'}`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>

              {/* Chọn rạp */}
              <select
                value={activeCinema}
                onChange={e => setActiveCinema(e.target.value)}
                className="mb-4 bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              >
                {cinemas.map((cinema, idx) => (
                  <option key={idx} value={cinema}>{cinema}</option>
                ))}
              </select>

              {/* Danh sách suất chiếu */}
              {actualShowtimes
                .filter(s => s.cinema === activeCinema && s.date === selectedDate)
                .length === 0 ? (
                <div className="text-center text-gray-500">Chưa có suất chiếu.</div>
              ) : (
                <div className="space-y-4">
                  {actualShowtimes
                    .filter(s => s.cinema === activeCinema && s.date === selectedDate)
                    .map((show, idx) => (
                      <div key={show._id || idx} className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <span className="font-semibold text-blue-700">{show.cinema}</span>
                          <span className="ml-2">Phòng: {show.room}</span>
                          <span className="ml-2">Định dạng: {show.format}</span>
                        </div>
                        <div>
                          <span className="font-bold">{show.date}</span>
                          <span className="ml-2">{show.time}</span>
                        </div>
                        <button
                          className="ml-4 mt-2 md:mt-0 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                          onClick={() => handleSelectShowtime(show)}
                        >
                          Chọn ghế
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )
        )}

        {activeTab === "infoMo" && (
          <div className="bg-white p-4 rounded shadow max-w-md mx-auto">
            <div className="flex gap-4">
              {movie.infoMo?.somePic && (
                <img
                  src={Array.isArray(movie.infoMo.somePic) ? movie.infoMo.somePic[0] : movie.infoMo.somePic}
                  alt="Poster"
                  className="w-2/3 h-auto rounded-lg shadow-md"
                />
              )}
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

            <h3 className="mt-6 text-xl font-bold">{movie.nameMo}</h3>
            <p className="text-sm text-gray-500 mb-2">{movie.infoMo?.director}</p>
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
