import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { AiOutlineHome } from 'react-icons/ai';
import { FaFilm, FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posters')
      .then(response => {
        if (response.data.length > 0) {
          setImages(response.data[0].images);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy posters:', error);
      });
  }, []);

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(response => {
        console.log('Movies data:', response.data);
        if (response.data.length > 0) {
          setMovies(response.data);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy movies:', error);
      });
  }, []);

  const [comingSoons, setComingSoons] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/comingsoon')
      .then(response => {
        console.log('Coming Soon data:', response.data);
        if (response.data.length > 0) {
          setComingSoons(response.data);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy Coming Soon:', error);
      });
  }, []);

  const [discounts, setDiscounts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/discounts')
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // Tablet
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480, // Mobile
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const Settings = {
  dots: false,            // hoặc true nếu muốn chấm trượt
  infinite: false,        // không lặp lại
  speed: 500,             // tốc độ chuyển slide
  slidesToShow: 3,        // số lượng item hiển thị cùng lúc
  slidesToScroll: 1,      // số lượng item trượt mỗi lần
  arrows: true,           // hiển thị mũi tên
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};


  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-xl font-bold text-center my-4">Welcome to the Home Page</h1>
      <p className="text-center mb-6">This is the home page of our application.</p>

      <div className="px-4 mb-10">
        {/* npm install react-slick slick-carousel */}
        <Slider {...settings}>
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

      <div>
          <div className='flex justify-between items-center'>
            {/* Tab buttons */}
            <div style={{ display: "flex", cursor: "pointer" }}>
                <div
                onClick={() => setActiveTab("tab1")}
                style={{
                    padding: "10px 20px",
                    borderBottom: activeTab === "tab1" ? "2px solid blue" : "none"
                }}
                >
                Đang chiếu
                </div>
                <div
                onClick={() => setActiveTab("tab2")}
                style={{
                    padding: "10px 20px",
                    borderBottom: activeTab === "tab2" ? "2px solid blue" : "none"
                }}
                >
                Sắp chiếu
                </div>
          </div>
          <div className='text-sm text-blue-500 px-4'>
            <button>TP Hồ Chí Minh</button>
          </div>
      </div>

      {/* Nội dung tab */}
      <div style={{ marginTop: 20 }}>
        {activeTab === "tab1" && (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-4">
      {movies.map((movie, index) => (
  movie.infoMo?.somePic?.map((pic, picIndex) => (
    <div
      key={`${index}-${picIndex}`}
      className="relative rounded overflow-hidden shadow"
    >
      <img
        src={pic}
        alt={`somePic-${index}-${picIndex}`}
        className="w-full h-40 object-cover"
      />
      <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
        ⭐ {movie.ratingMo} | ⛔ {movie.agelimitMo}
      </div>
      <div className="bg-white text-center text-sm font-semibold mt-1 py-1 truncate">
        {movie.nameMo}
      </div>
    </div>
  ))
))}
</div>)}
        {activeTab === "tab2" && 
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-4">
      {comingSoons.map((coming, index) => (
  coming.infoMo?.somePic?.map((pic, picIndex) => (
    <div
      key={`${index}-${picIndex}`}
      className="relative rounded overflow-hidden shadow"
    >
      <img
        src={pic}
        alt={`somePic-${index}-${picIndex}`}
        className="w-full h-40 object-cover"
      />
      <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
        ⭐ {coming.ratingMo} | ⛔ {coming.agelimitMo}
      </div>
      <div className="bg-white text-center text-sm font-semibold mt-1 py-1 truncate">
        {coming.nameMo}
      </div>
    </div>
  ))
))}
</div>}
      </div>
    </div>
      <div className="px-4 my-4 mb-20">
        <Slider {...settings}>
  {discounts.map((discount, index) => (
    <div
      key={index}
      className="px-2" // Padding giữa các slide
    >
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
      {/* Footer giữ nguyên như cũ */}
      <footer className="mt-auto">
        <nav>
          <ul className="flex justify-center space-x-4 text-gray-500 text-sm fixed bottom-0 left-0 right-0 bg-white py-4">
            <li className="flex flex-col items-center hover:text-black cursor-pointer">
              <a href="#home" className="flex flex-col items-center">
                <AiOutlineHome size={24} />
                <span>Trang chủ</span>
              </a>
            </li>
            <li className="flex flex-col items-center hover:text-black cursor-pointer">
              <a href="#cinema" className="flex flex-col items-center">
                <FaFilm size={24} />
                <span>Rạp phim</span>
              </a>
            </li>
            <li className="flex flex-col items-center hover:text-black cursor-pointer">
              <a href="#products" className="flex flex-col items-center">
                <FaShoppingCart size={24} />
                <span>Sản phẩm</span>
              </a>
            </li>
            <li className="flex flex-col items-center hover:text-black cursor-pointer">
              <a href="#movies" className="flex flex-col items-center">
                <MdLocalMovies size={24} />
                <span>Điện ảnh</span>
              </a>
            </li>
            <li className="flex flex-col items-center hover:text-black cursor-pointer">
              <a href="#account" className="flex flex-col items-center">
                <FaUser size={24} />
                <span>Tài khoản</span>
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}

export default Home;
