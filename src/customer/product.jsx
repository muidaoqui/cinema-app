import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
function Product() {
    const [products, setProducts] = useState([]);

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
    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => {
                console.log('Product data:', data);
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
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

    return(
        <div className='mb-28 mt-4'>
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
            <h1 className="text-2xl font-bold text-center mt-4">Sản Phẩm</h1>
            <div className="grid grid-cols-2 mt-4">
                {products.map((product, index) => (
                    <div key={index} className="w-full flex flex-col gap-4 p-2  border-b border-gray-300 my-2 shadow-lg">
                        <img src={product.image} alt={`Product ${index + 1}`} className="w-full h-64 h-auto rounded-lg "/>
                        <div className="ml-4 flex flex-col gap-2 justify-center">
                            <h2 className="text-l font-semibold">{product.namePro}</h2>
                            <p className="text-gray-600">{product.pricePro}</p>
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
        </div>
    );
}

export default Product; 