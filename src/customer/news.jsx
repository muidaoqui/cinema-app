import React, { useEffect, useState } from 'react';

function News() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const BASE_URL = "http://localhost:5000/";

  useEffect(() => {
    fetch(`${BASE_URL}api/news`)
      .then(response => response.json())
      .then(data => {
        console.log('News data:', data);
        setNews(data);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });
  }, []);

  const filteredNews = news.filter(item =>
    item.nameNews.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='mb-20'>
      <div className="bg-white">
        <h1 className="text-2xl font-bold text-center mt-4">Điện ảnh</h1>
        <div className="flex justify-center mt-4 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-100 p-2 border border-gray-300 rounded-lg mx-4"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 shadow-3xl bg-gray-300 p-4">
        {filteredNews.map((item) => (
          <div
            key={item._id}
            className="w-full flex flex-col border bg-white rounded hover:shadow-lg transition duration-300"
          >
            <img
              src={item.imagesNews[0]}
              alt={item.nameNews}
              className="w-full max-h-60 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <h2 className="text-lg font-semibold">{item.nameNews}</h2>
              <button className="text-orange-600 mt-2 hover:underline">
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
