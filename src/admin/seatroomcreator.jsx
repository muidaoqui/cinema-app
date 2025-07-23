import React, { useState } from 'react';
import { generateSeatTemplate } from './seatTemplates';

function SeatRoomCreator({ onCreate }) {
  const [numRows, setNumRows] = useState(6);
  const [seatsPerRow, setSeatsPerRow] = useState(10);
  const [layoutByRow, setLayoutByRow] = useState({});
  const [reservedSeats, setReservedSeats] = useState('');

  const handleTypeChange = (row, type) => {
    setLayoutByRow(prev => ({ ...prev, [row]: type }));
  };

  const handleCreate = () => {
    const reserved = reservedSeats.split(',').map(s => s.trim().toUpperCase());
    const config = { numRows, seatsPerRow, layoutByRow, reservedSeats: reserved };
    const seatMap = generateSeatTemplate(config);
    onCreate(seatMap);
  };

  const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, numRows);

  return (
    <div className="p-4 bg-white rounded shadow max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Tạo sơ đồ ghế</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Số hàng</label>
          <input
            type="number"
            min={1}
            value={numRows}
            onChange={e => setNumRows(Number(e.target.value))}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Số ghế mỗi hàng</label>
          <input
            type="number"
            min={1}
            value={seatsPerRow}
            onChange={e => setSeatsPerRow(Number(e.target.value))}
            className="border p-2 w-full rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Loại ghế theo hàng</label>
        {rowLabels.map(row => (
          <div key={row} className="flex items-center space-x-2 mb-2">
            <span className="w-6 font-bold">{row}</span>
            <select
              value={layoutByRow[row] || 'regular'}
              onChange={e => handleTypeChange(row, e.target.value)}
              className="border p-1 rounded"
            >
              <option value="regular">Thường</option>
              <option value="vip">VIP</option>
              <option value="screenfront">Gần màn hình</option>
            </select>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium">Ghế đã đặt trước (VD: A1, C5)</label>
        <input
          type="text"
          value={reservedSeats}
          onChange={e => setReservedSeats(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Tạo sơ đồ
      </button>
    </div>
  );
}

export default SeatRoomCreator;
