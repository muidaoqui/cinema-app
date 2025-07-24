import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoviesPOS from "./moviespos";
import ProductsPOS from "./productspos";
import SeatSelectorPOS from "./seatselectorpos";

function HomePOS() {
  const [step, setStep] = useState("choose"); // choose | seats | combos
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const navigate = useNavigate();

  const handleMovieSelect = (movie, showtime) => {
    setSelectedMovie(movie);
    setSelectedShowtime(showtime);
    setStep("seats");
  };

  const handleSkipToCombo = () => {
    setStep("combos");
  };

  const handleSeatConfirm = (selectedSeats, totalPrice) => {
  setStep("combos");
  setTimeout(() => {
    localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
    localStorage.setItem("selectedShowtime", JSON.stringify(selectedShowtime));
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem("ticketTotal", totalPrice);
  }, 0);
};


  const handleCheckout = (selectedCombos) => {
  const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
  const selectedShowtime = JSON.parse(localStorage.getItem("selectedShowtime"));
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const ticketTotal = Number(localStorage.getItem("ticketTotal")) || 0;

  const movie = selectedMovie || { nameMo: "Mua combo không phim" };
  const showtime = selectedShowtime || { date: "-", time: "-" };
  const seats = selectedSeats || [];

  navigate("/manager/confirmpos", {
    state: {
      movie,
      showtime,
      seats,
      ticketTotal,
      comboList: selectedCombos,
    },
  });
};


  return (
    <div className="flex p-6 gap-6">
      <div className="w-3/4 bg-white p-4 rounded shadow">
        {step === "choose" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Chọn phim hoặc combo</h2>
              <button
                onClick={handleSkipToCombo}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Bỏ qua chọn phim
              </button>
            </div>
            <MoviesPOS onMovieSelect={handleMovieSelect} />
          </div>
        )}

        {step === "seats" && (
          <SeatSelectorPOS
            movie={selectedMovie}
            showtime={selectedShowtime}
            onConfirm={handleSeatConfirm}
            onBack={() => setStep("choose")}
          />
        )}

        {step === "combos" && (
          <ProductsPOS
            onConfirm={(combos) => handleCheckout(combos)}
            onBack={() => setStep(selectedMovie ? "seats" : "choose")}
          />
        )}
      </div>

      <div className="w-1/4 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Thông Tin</h3>
        <p className="text-sm text-gray-700">
          Bạn đang sử dụng hệ thống POS bán vé và combo cho rạp Galaxy.
        </p>
        <p className="text-sm mt-1">Vui lòng hoàn tất các bước để thanh toán.</p>
        <button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          onClick={() => {
            setStep("choose");
            setSelectedMovie(null);
            setSelectedShowtime(null);
            localStorage.clear();
          }}
        >
          Hủy giao dịch
        </button>
      </div>
    </div>
  );
}

export default HomePOS;
