import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";

function Product() {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const BASE_URL = "http://localhost:5000/";

  // Load posters
  useEffect(() => {
    axios.get(`${BASE_URL}api/posters`)
      .then(response => {
        if (response.data.length > 0) {
          setImages(response.data[0].images);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy posters:', error);
      });
  }, []);

  // Load products
  useEffect(() => {
    fetch(`${BASE_URL}api/products`)
      .then(response => response.json())
      .then(data => {
        console.log('Product data:', data);
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  // Load discounts
  useEffect(() => {
    axios.get(`${BASE_URL}api/discounts`)
      .then(response => {
        console.log('Discounts data:', response.data);
        if (response.data.length > 0) {
          setDiscounts(response.data);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy Discounts:', error);
      });
  }, []);

  const posterSliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  const discountSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 }},
      { breakpoint: 768, settings: { slidesToShow: 2 }},
      { breakpoint: 480, settings: { slidesToShow: 1 }}
    ]
  };

  return (
    <div className='mb-28 mt-4'>
      {/* Poster slider */}
      <div className="px-4 mb-10">
        <Slider {...posterSliderSettings}>
          {images.map((img, index) => (
            <div key={index} className="px-2">
              <img
                src={img}
                alt={`poster-${index}`}
                className="w-full h-60 object-cover rounded-xl shadow"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Product list */}
      <h1 className="text-2xl font-bold text-center mt-4">Sản Phẩm</h1>
      <div className="grid grid-cols-2 gap-4 mt-4 px-4">
        {products.map((product) => (
          <div key={product._id} className="w-full flex flex-col gap-4 p-2 border-b border-gray-300 shadow-lg">
            <img src={product.image} alt={product.namePro} className="w-full h-64 object-cover rounded-lg" />
            <div className="flex flex-col gap-2 justify-center">
              <h2 className="text-l font-semibold">{product.namePro}</h2>
              <p className="text-gray-600">{product.pricePro} VND</p>
            </div>
            <div className="mt-auto flex flex-col gap-2 text-sm pt-2">
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                Mua Ngay
              </button>
              <button className="border border-orange-600 text-orange-600 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Discount slider */}
      <div className="px-4 my-8">
        <Slider {...discountSliderSettings}>
          {discounts.map((discount, index) => (
            <div key={index} className="px-2">
              <div className="relative rounded overflow-hidden shadow">
                <img
                  src={discount.image}
                  alt={`discount-${index}`}
                  className="w-full h-40 object-cover"
                />
                <div className="bg-white text-center text-sm font-semibold mt-1 py-1 truncate">
                  {discount.title}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Product;
