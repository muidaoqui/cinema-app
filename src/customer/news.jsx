import React, { useEffect, useState } from 'react';

function News() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const BASE_URL = "http://localhost:5000/";

  useEffect(() => {
    fetch(`${BASE_URL}api/news`)
      .then((response) => response.json())
      .then((data) => {
        console.log('News data:', data);
        setNews(data);
      })
      .catch((error) => {
        console.error('Error fetching news data:', error);
      });
  }, []);

  const filteredNews = news.filter((item) =>
    item.nameNews.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🎬 Tin tức Điện ảnh</h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Nhập tên bài viết..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
            >
              <img
                src={item.imagesNews[0]}
                alt={item.nameNews}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{item.nameNews}</h2>
                <button className="mt-4 text-orange-600 hover:underline self-start transition">
                  Xem thêm →
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            😢 Không tìm thấy kết quả phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
