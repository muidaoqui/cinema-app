// src/pages/MyTickets.jsx
import React, { useEffect, useState } from 'react';
import { FaTicketAlt } from 'react-icons/fa';

function MyTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  }, []);

  return (
    <div className="p-4 mb-28">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaTicketAlt /> Vé đã mua
      </h1>

      {tickets.length === 0 ? (
        <p className="text-gray-500">Bạn chưa mua vé nào.</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket, index) => (
            <div key={index} className="p-4 bg-white shadow rounded-xl">
              <p><strong>Phim:</strong> {ticket.movieName}</p>
              <p><strong>Rạp:</strong> {ticket.cinema}</p>
              <p><strong>Phòng:</strong> {ticket.room}</p>
              <p><strong>Ngày:</strong> {ticket.date}</p>
              <p><strong>Giờ:</strong> {ticket.time}</p>
              <p><strong>Ghế:</strong> {ticket.seats.join(', ')}</p>
              <p><strong>Giá:</strong> {ticket.totalPrice.toLocaleString()}₫</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTickets;
