import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function Movies() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const BASE_URL = "http://localhost:5000/";

    useEffect(() => {
        axios.get(`${BASE_URL}api/products`)
            .then(res => setProducts(res.data || []))
            .catch(err => console.error("Products error:", err));
    }, []); 

    const [quantities, setQuantities] = useState({});

    if (!products.length) {
        return <p className="text-center mt-10">No products available.</p>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
    );
}

export default Movies;