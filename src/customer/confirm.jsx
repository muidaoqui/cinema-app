import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

function Confirm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [infoMo, setInfoMo] = useState(state?.movie || {});

  if (!state) return <p className="text-center mt-10">Không có thông tin đặt vé.</p>;

  const {
    nameMo, date, time, format, cinema, room,
    agelimit, selectedSeats, somePic, totalPrice,
    selectedCombos = [], comboTotal = 0, grandTotal = 0,
    movieId, actualShowtimeId
  } = state;

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        alert("Bạn chưa đăng nhập!");
        setLoading(false);
        return;
      }

      const payload = {
        userId: user._id,
        showtimeId: actualShowtimeId, 
        movieId,
        seats: selectedSeats, 
        combos: selectedCombos.map(c => ({
          name: c.namePro,
          quantity: c.quantity,
          price: c.pricePro
        })),
        totalPrice,
        comboTotal,
        grandTotal,
        date,
        time,
        cinema,
        room
      };

      console.log("Payload gửi lên:", payload);
      console.log("acctualShowtimeId:", actualShowtimeId);

      const response = await axios.post('http://localhost:5000/api/bookings', payload);
      if (response.status === 201) {
        alert("Đặt vé thành công!");
        navigate("/customer/home");
      } else {
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi đặt vé:", error);
      alert("Đặt vé thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-4 px-4 text-sm">
      <div className="flex   mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-black text-lg"
        >
          <FaArrowLeft />
        </button>
        <div className="text-base font-semibold text-center">Giao dịch</div>
      </div>

      <div className="bg-white shadow rounded-lg p-3">
        <div className="flex gap-3">
          <img src={Array.isArray(somePic) ? somePic[0] : somePic} alt="Poster" className="w-20 h-28 rounded-md object-cover" />
          <div className="flex-1 text-sm">
            <div className="font-bold leading-5 mb-1">{nameMo}</div>
            <div>{format} <span className="ml-2 px-1 bg-orange-400 text-white rounded text-xs">T{agelimit}</span></div>
            <div className="text-gray-600 mt-1">
              {cinema} - {room}<br />
              {time} - Thứ Sáu, {date}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-3 mt-4">
        <div className="font-semibold mb-2">Thông tin giao dịch</div>
        <div className="text-sm text-gray-700">
          <p>1x Người Lớn - C{selectedSeats[0]} <span className="float-right font-semibold">{totalPrice.toLocaleString()}đ</span></p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-3 mt-4">
        <div className="font-semibold mb-2">Combo đã chọn</div>
        {selectedCombos.length > 0 ? (
          <ul className="space-y-1">
            {selectedCombos.map((item, idx) => (
              <li key={idx} className="text-sm">
                {item.namePro} x{item.quantity}
                <span className="float-right">{(item.pricePro * item.quantity).toLocaleString()}đ</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">Không chọn combo</p>
        )}
        <p className="mt-2 text-sm font-semibold">Tổng combo: <span className="float-right">{comboTotal.toLocaleString()}đ</span></p>
      </div>

      <div className="bg-white shadow rounded-lg p-3 mt-4">
        <div className="font-semibold mb-2">Áp dụng điểm Stars</div>
        <p className="text-sm">1 Stars giảm 1,000 VND</p>
      </div>

      <div className="bg-white shadow rounded-lg p-3 mt-4">
        <div className="font-semibold mb-2">Thông tin thanh toán</div>
        <div className="text-sm space-y-2">
          <div>OnePay - Visa, Master, JCB,... / ATM / QR Ngân hàng / Apple Pay</div>
          <div>Ví ShopeePay - Giảm 5K mỗi đơn khi thanh toán</div>
          <div>ZaloPay - Mã GIAMSAU giảm 50% tối đa 40K</div>
          <div>HSBC/Payoo - ATM/VISA/MASTER/JCB/QRCODE</div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 text-lg font-semibold">
        <div>Tổng Cộng:</div>
        <div className="text-orange-600">{grandTotal.toLocaleString()}đ</div>
      </div>

      <button
        onClick={handleConfirmBooking}
        disabled={loading}
        className={`w-full mt-4 py-3 rounded-lg text-white text-center text-lg ${loading ? 'bg-gray-400' : 'bg-orange-500 hover:bg-green-600'}`}
      >
        {loading ? 'Đang xử lý...' : 'Thanh toán'}
      </button>
    </div>
  );
}

export default Confirm;