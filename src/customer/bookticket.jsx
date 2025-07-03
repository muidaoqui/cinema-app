import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function BookTicket() {
  const { state: showtime } = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  if (!showtime) return <p className="text-center mt-10">Không có thông tin suất chiếu.</p>;

  const {
    nameMo, date, time, format, cinema, room,
    agelimit, selectedSeats, somePic, totalPrice
  } = showtime;

  // Lấy danh sách sản phẩm
  useEffect(() => {
    fetch(`http://localhost:5000/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Lỗi lấy sản phẩm:', err));
  }, []);

  // Xử lý tăng/giảm số lượng
  const handleIncrease = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleDecrease = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0)
    }));
  };

  // Tính tổng tiền combo
  const comboTotal = products.reduce((sum, product) => {
    const qty = quantities[product._id] || 0;
    return sum + qty * product.pricePro;
  }, 0);

  const grandTotal = (totalPrice || 0) + comboTotal;

  return (
    <div className="max-w-4xl mx-auto bg-white pb-32">
      <div className="mx-6 relative mt-12 flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300 transition duration-200 z-10"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Chọn Combo</h1>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full">
        {products.map((product) => (
          <div key={product._id} className="w-full flex flex-col gap-4 p-2 border-b border-gray-300 shadow-sm bg-gray-50">
            <img src={product.image} alt={product.namePro} className="w-full h-64 object-cover rounded-lg" />
            <div className="flex flex-col gap-2 justify-center">
              <h2 className="text-l font-semibold">{product.namePro}</h2>
            </div>
              <div className="mt-auto flex justify-between items-center gap-2 text-sm pt-2 p-4">
                <p className="text-orange-600">{product.pricePro.toLocaleString()} VND</p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDecrease(product._id)}
                    className="w-6 h-6 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-2">{quantities[product._id] || 0}</span>
                  <button
                    onClick={() => handleIncrease(product._id)}
                    className="w-6 h-6 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 px-6">
        <h2 className="text-lg font-semibold">Ghế đã chọn:</h2>
        <p className="text-blue-600 font-medium">{selectedSeats?.join(', ')}</p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg px-6 pb-24 pt-4 border-t flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Tổng tiền:</h2>
          <p className="text-orange-600 font-bold text-xl">{grandTotal.toLocaleString()} đ</p>
          <p className="text-sm text-gray-500">
            Vé: {totalPrice.toLocaleString()} đ + Combo: {comboTotal.toLocaleString()} đ
          </p>
        </div>
        <div>
          <button className="w-full bg-orange-600 text-white w-24 h-12 rounded-lg ">
            Tiếp Tục
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookTicket;
