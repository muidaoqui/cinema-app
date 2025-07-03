import React from "react";
import { useNavigate } from "react-router-dom";
import Movies from "./movies";
import Products from "./products";



function Home() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = React.useState("tab1");




  return (
    <div>
        <div className="flex items-center justify-around p-4 bg-white text-orange-500 h-28">
            <img src="https://www.galaxycine.vn/_next/static/media/galaxy-logo-mobile.074abeac.png" alt="Cinema" className="w-auto h-20" />
            <h1 className="text-2xl font-bold">Máy POS</h1>
            <button className="text-2xl font-bold">
                Cài Đặt
            </button>
        </div>
        <div className="p-20">
            <div className="">
                <div className="flex justify-between items-center px-4">
                    <div className="flex space-x-4 w-3/4">
                    <div
                        onClick={() => setActiveTab("tab1")}
                        className={`cursor-pointer pb-2 ${activeTab === "tab1" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
                    >
                        Phim
                    </div>
                    <div
                        onClick={() => setActiveTab("tab2")}
                        className={`cursor-pointer pb-2 ${activeTab === "tab2" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
                    >
                        Sản Phẩm
                    </div>
                    </div>
                    <div className="text-sm text-blue-500">TP Hồ Chí Minh</div>
                </div>

                {/* Di chuyển render ra ngoài header */}
                <div className="flex mt-8 gap-4">
                    <div className=" w-3/4">
                        {activeTab === "tab1" ? <Movies /> : <Products />}
                    </div>
                    <div className="w-1/4 ">
                        <div className="  bg-white rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Thông Tin</h2>
                            <p className="text-gray-700">Chào mừng bạn đến với hệ thống quản lý rạp chiếu phim.</p>
                            <p className="text-gray-700 mt-2">Bạn có thể quản lý các bộ phim và sản phẩm tại đây.</p>
                            <button
                                onClick={() => navigate("/")}
                                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Quản Lý
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home;
