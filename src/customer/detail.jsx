import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("showtimeMo");
  const [showtimeMo, setShowtimeMo] = useState([]);
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

  if (!movie) {
    return <div className="text-center mt-10">Đang tải thông tin phim...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mb-20">
      <h1 className="text-3xl font-bold mb-4 text-center">{movie.nameMo}</h1>

      {/* Tabs */}
      <div className="flex justify-between items-center px-4">
        <div className="flex space-x-4">
          {["showtimeMo", "infoMo", "news"].map(tab => (
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
  <div className="mt-4 space-y-6">
    {showtimeMo.length === 0 ? (
      <p className="text-center text-gray-500">Chưa có thông tin suất chiếu.</p>
    ) : (
      showtimeMo.map((entry, idx) => (
        <div key={idx} className="border border-gray-300 rounded-lg p-4 bg-white shadow">
          <h3 className="text-lg font-semibold text-blue-700">{entry.cinema}</h3>
          <p className="text-sm text-gray-600 mb-2">📅 Ngày chiếu: {entry.date}</p>

          {Array.isArray(entry.times) && entry.times.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
              {entry.times.map((timeObj, timeIdx) => (
                <div key={timeIdx} className="border rounded-lg p-3 bg-gray-50 hover:bg-blue-50 transition">
                  <p className="font-semibold text-black">⏰ {timeObj.time}</p>
                  <p className="text-sm text-gray-700">Phòng: {timeObj.room}</p>
                  <p className="text-sm text-gray-700">Định dạng: {timeObj.format}</p>
                  <p className="text-sm text-red-500 font-semibold">
                    Giá: {timeObj.price.toLocaleString()}đ
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Không có giờ chiếu.</p>
          )}
        </div>
      ))
    )}
  </div>
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

            {/* Bình luận */}
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
