import React, { useEffect, useState } from "react";

function MoviesPOS({ onMovieSelect }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Lỗi lấy phim:", err));
  }, []);

  const handleSelect = (movie) => {
    if (!onMovieSelect) {
      console.error("onMovieSelect không được truyền từ props!");
      return;
    }

    // Giả định lấy suất chiếu đầu tiên của rạp đầu tiên
    const cinema = movie.showtimeMo[0];
    if (!cinema || !cinema.times?.length) {
      alert("Phim này chưa có suất chiếu.");
      return;
    }

    const showtime = {
      ...cinema.times[0],
      date: cinema.date,
      cinema: cinema.cinema
    };

    onMovieSelect(movie, showtime);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Chọn phim</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie._id}
            onClick={() => handleSelect(movie)}
            className="cursor-pointer border rounded p-2 hover:shadow-md transition"
          >
            <img
              src={movie.infoMo.somePic?.[0]}
              alt={movie.nameMo}
              className="w-full h-64 object-cover rounded"
            />
            <p className="mt-2 text-center font-semibold text-sm">{movie.nameMo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesPOS;
