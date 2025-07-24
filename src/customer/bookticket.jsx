import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BASE_URL = 'http://localhost:5000/';

function BookTicket() {
  const { state: showtime } = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  if (!showtime) return <p className="text-center mt-10">Không có thông tin suất chiếu.</p>;

  const {
    movieId, actualShowtimeId, nameMo, date, time, format,
    cinema, room, agelimit, selectedSeats, somePic, totalPrice,
  } = showtime;

  useEffect(() => {
    fetch(`${BASE_URL}api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Lỗi lấy sản phẩm:', err));
  }, []);

  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) + delta, 0)
    }));
  };

  const comboTotal = products.reduce((sum, product) => {
    const qty = quantities[product._id] || 0;
    return sum + qty * (product.pricePro || 0);
  }, 0);

  const grandTotal = (totalPrice || 0) + comboTotal;

  const selectedCombos = products
    .filter(p => (quantities[p._id] || 0) > 0)
    .map(p => ({
      _id: p._id,
      namePro: p.namePro,
      pricePro: p.pricePro,
      quantity: quantities[p._id],
    }));

  return (
    <div className="max-w-4xl mx-auto bg-white pb-32">
      <div className="mx-6 relative mt-12 flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Chọn combo</h1>
      </div>

      <div className="mt-4 px-4">
        {products.map(product => (
          <div key={product._id} className="bg-gray-50 rounded-xl shadow-sm mb-4 p-4">
            <img src={product.image} alt={product.namePro} className="w-full h-56 object-cover rounded-lg" />
            <h2 className="text-lg font-semibold mt-2">{product.namePro}</h2>
            <p className="text-sm text-gray-600">{product.descPro}</p>
            <p className="text-orange-600 font-semibold mt-1">Giá: {product.pricePro?.toLocaleString()}đ</p>
            <div className="flex items-center justify-end mt-2">
              <button onClick={() => handleQuantityChange(product._id, -1)} className="w-8 h-8 text-xl bg-gray-200 rounded">−</button>
              <span className="mx-4">{quantities[product._id] || 0}</span>
              <button onClick={() => handleQuantityChange(product._id, 1)} className="w-8 h-8 text-xl bg-gray-200 rounded">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 mt-6">
        <p className="text-gray-700 text-sm">Ghế đã chọn: <span className="text-blue-600 font-medium">{selectedSeats.join(', ')}</span></p>
        <p className="text-sm mt-1">Tổng cộng: <span className="text-orange-600 font-bold text-lg">{grandTotal.toLocaleString()}đ</span></p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow px-6 py-4 border-t flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Vé: {totalPrice.toLocaleString()}đ + Combo: {comboTotal.toLocaleString()}đ</p>
        </div>
        <button
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg"
          onClick={() => {
            navigate("/customer/confirm", {
              state: {
                movieId,
                actualShowtimeId,
                nameMo,
                date,
                time,
                format,
                cinema,
                room,
                agelimit,
                selectedSeats,
                somePic,
                totalPrice,
                selectedCombos,
                comboTotal,
                grandTotal
              }
            });
          }}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

export default BookTicket;
