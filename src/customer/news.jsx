import React, { useEffect, useState } from 'react';

function News() {   
    const [news, setNews] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5000/api/news')
            .then(response => response.json())
            .then(data => {
                console.log('News data:', data);
                setNews(data);
            })
            .catch(error => {
                console.error('Error fetching news data:', error);
            });
    }, []);

    return (
        <div className='mb-20'>
            <div className="bg-white">
                <h1 className="text-2xl font-bold text-center mt-4 ">Điện ảnh</h1>
                <div className="flex justify-center mt-4 mb-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="w-full bg-gray-100 p-2 border border-gray-300 rounded-lg mx-4"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4  shadow-3xl bg-gray-300 p-4 ">
                {news.map((item, index) => (
                    <div key={index} className="w-full gap-2 flex flex-col border bg-white">
                    <img
                        src={item.imagesNews?.[0] || "https://via.placeholder.com/150"}
                        alt={`News ${index + 1}`}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                    <div className="">
                        <h2 className="text-lg font-semibold p-2">{item.nameNews}</h2>
                        <button className="text-orange-600 mt-2 p-2">
                            Xem thêm
                        </button>
                    </div>
                    </div>
                ))}
                </div>
        </div>
    );
}
export default News;