import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ConfirmPOS() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    movie = { nameMo: "Không rõ phim" },
    showtime = { date: "-", time: "-" },
    seats = [],
    ticketTotal = 0,
    comboList = [],
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("");

  const comboTotal = comboList.reduce(
    (sum, item) => sum + item.pricePro * item.quantity,
    0
  );
  const grandTotal = ticketTotal + comboTotal;

  const handleConfirm = () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn hình thức thanh toán!");
      return;
    }
    alert(`✅ Thanh toán thành công qua ${paymentMethod.toUpperCase()}`);
    navigate("/"); // Hoặc navigate về HomePOS sau khi thanh toán
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold mb-4">Xác Nhận Đơn Hàng</h2>

      {/* Thông tin phim */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">🎬 {movie.nameMo}</h3>
        <p className="text-sm text-gray-500 mt-1">
          ⏰ {showtime.date} - {showtime.time}
        </p>
      </div>

      {/* Ghế */}
      <div>
        <h3 className="text-lg font-semibold mb-2">🎟️ Ghế đã chọn:</h3>
        <p>{seats.join(", ")}</p>
        <p className="mt-1 text-green-600 font-bold">
          Vé: {ticketTotal.toLocaleString()}đ
        </p>
      </div>

      {/* Combo */}
      <div>
        <h3 className="text-lg font-semibold mb-2">🍿 Combo:</h3>
        {comboList.length === 0 ? (
          <p className="text-sm text-gray-500">Không chọn combo</p>
        ) : (
          <ul className="space-y-1">
            {comboList.map((item) => (
              <li key={item._id} className="flex justify-between">
                <span>
                  {item.namePro} x{item.quantity}
                </span>
                <span>
                  {(item.pricePro * item.quantity).toLocaleString()}đ
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-1 text-green-600 font-bold">
          Combo: {comboTotal.toLocaleString()}đ
        </p>
      </div>

      {/* Tổng cộng */}
      <div className="text-right text-xl font-bold text-blue-700 border-t pt-4">
        Tổng cộng: {grandTotal.toLocaleString()}đ
      </div>

      {/* Phương thức thanh toán */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">💳 Chọn hình thức thanh toán:</h3>
        <div className="flex gap-4">
          {["COD", "QR", "Card"].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`px-4 py-2 rounded border ${
                paymentMethod === method
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {method === "COD"
                ? "💵 Tiền mặt"
                : method === "QR"
                ? "📱 QR code"
                : "💳 Thẻ ngân hàng"}
            </button>
          ))}
        </div>
      </div>

      {/* Nút điều hướng */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 text-sm rounded hover:bg-gray-400"
        >
          ← Quay lại
        </button>
        <button
          onClick={handleConfirm}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-bold"
        >
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
}

export default ConfirmPOS;
