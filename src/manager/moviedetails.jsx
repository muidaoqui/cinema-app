// src/components/MovieDetails.jsx
import React from "react";

function MovieDetails({ movie, onBack, onShowtimeSelect }) {
  if (!movie) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{movie.nameMo}</h2>
        <button
          className="px-4 py-1 border rounded text-sm hover:bg-gray-100"
          onClick={onBack}
        >
          ← Quay lại
        </button>
      </div>

      <div className="flex gap-6">
        {/* Ảnh phim */}
        <img
          src={movie.infoMo.somePic}
          alt={movie.nameMo}
          className="w-40 h-auto rounded shadow"
        />

        {/* Nội dung phim */}
        <div>
          <p className="mb-4 text-sm text-gray-600">{movie.infoMo.content}</p>
        </div>
      </div>

      <hr className="my-6" />

      {/* Danh sách suất chiếu */}
      <h3 className="text-lg font-semibold mb-3">Chọn suất chiếu:</h3>
      <div className="space-y-4">
        {movie.showtimeMo?.map((st, idx) => (
          <div key={idx}>
            <p className="font-medium mb-1">
              {st.cinema} - {st.date}
            </p>
            <div className="flex flex-wrap gap-2">
              {st.times.map((t, i) => (
                <button
                  key={i}
                  className="px-4 py-2 bg-white border rounded-lg shadow hover:bg-blue-100 text-sm"
                  onClick={() =>
                    onShowtimeSelect({
                      cinema: st.cinema,
                      date: st.date,
                      time: t.time,
                      room: t.room,
                      format: t.format,
                      seatMapId: t.seatMapId,
                    })
                  }
                >
                  {t.time} - {t.format} ({t.room})
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;
