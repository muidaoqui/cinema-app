import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from './navbar';

function Home() {
  const [images, setImages] = useState([]);
  const [movies, setMovies] = useState([]);
  const [comingSoons, setComingSoons] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5000/";

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 }},
      { breakpoint: 768, settings: { slidesToShow: 2 }},
      { breakpoint: 480, settings: { slidesToShow: 1 }}
    ]
  };

  useEffect(() => {
    axios.get(`${BASE_URL}api/posters`)
      .then(res => {
        if (res.data?.[0]?.images) {
          setImages(res.data[0].images);
        }
      })
      .catch(err => console.error("Poster error:", err));
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}api/movies`)
      .then(res => setMovies(res.data || []))
      .catch(err => console.error("Movies error:", err));
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}api/comingsoon`)
      .then(res => setComingSoons(res.data || []))
      .catch(err => console.error("Coming soon error:", err));
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}api/discounts`)
      .then(res => setDiscounts(res.data || []))
      .catch(err => console.error("Discounts error:", err));
  }, []);

  const handleMovieClick = (id) => {
    navigate(`/customer/detail/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col mb-10 mt-4">
      {/* POSTER SLIDER */}
      <div className="px-4 mb-10">
        <Slider {...sliderSettings}>
          {images.map((img, idx) => (
            <div key={idx} className="px-2">
              <img
                src={img}
                alt={`poster-${idx}`}
                className="w-full h-60 object-cover rounded-xl shadow"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* TABS */}
      <div>
        <div className="flex justify-between items-center px-4">
          <div className="flex space-x-4">
            <div
              onClick={() => setActiveTab("tab1")}
              className={`cursor-pointer pb-2 ${activeTab === "tab1" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            >
              Đang chiếu
            </div>
            <div
              onClick={() => setActiveTab("tab2")}
              className={`cursor-pointer pb-2 ${activeTab === "tab2" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            >
              Sắp chiếu
            </div>
          </div>
          <div className="text-sm text-blue-500">TP Hồ Chí Minh</div>
        </div>

        {/* MOVIE GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-4 mt-4">
          {(activeTab === "tab1" ? movies : comingSoons).map((item, idx) =>
            item.infoMo?.somePic?.map((pic, picIdx) => (
              <div
                key={`${item._id}-${picIdx}`}
                className="relative rounded overflow-hidden shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => handleMovieClick(item._id)}
              >
                <img
                  src={pic}
                  alt={`pic-${idx}-${picIdx}`}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                  ⭐ {item.ratingMo} | ⛔ {item.agelimitMo}
                </div>
                <div className="bg-white text-center text-sm font-semibold mt-1 py-1 truncate">
                  {item.nameMo}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* DISCOUNT SLIDER */}
      <div className="px-4 my-8">
        <Slider {...sliderSettings}>
          {discounts.map((d, idx) => (
            <div key={idx} className="px-2">
              <div className="relative rounded overflow-hidden shadow hover:scale-105 transition-transform duration-300">
                <img
                  src={d.image}
                  alt={`discount-${idx}`}
                  className="w-full h-40 object-cover"
                />
                <div className="bg-white text-center text-sm font-semibold mt-1 py-1 truncate">
                  {d.title}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* NAVBAR */}
      <Navbar />

      {/* Footer */}
    </div>
  );
}

export default Home;
