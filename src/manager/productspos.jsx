import React, { useEffect, useState } from "react";

function ProductsPOS({ onConfirm, onBack }) {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleAdd = (id) => {
    setSelected(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemove = (id) => {
    setSelected(prev => {
      const qty = (prev[id] || 0) - 1;
      if (qty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: qty };
    });
  };

  const handleConfirm = () => {
    const combos = products
      .filter(p => selected[p._id])
      .map(p => ({
        ...p,
        quantity: selected[p._id],
        total: p.pricePro * selected[p._id],
      }));
    onConfirm(combos);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Chọn Combo</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-2 rounded shadow">
            <img src={p.image[0]} alt={p.namePro} className="h-40 w-full object-cover mb-2 rounded" />
            <h4 className="font-semibold">{p.namePro}</h4>
            <p className="text-sm">{p.describePro.slice(0, 80)}...</p>
            <p className="font-bold text-red-500 mt-1">{p.pricePro.toLocaleString()} đ</p>
            <div className="flex items-center justify-between mt-2">
              <button onClick={() => handleRemove(p._id)} className="px-2 py-1 bg-gray-300 rounded">-</button>
              <span>{selected[p._id] || 0}</span>
              <button onClick={() => handleAdd(p._id)} className="px-2 py-1 bg-green-400 rounded">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Quay lại</button>
        <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Xác nhận
        </button>
      </div>
    </div>
  );
}

export default ProductsPOS;
