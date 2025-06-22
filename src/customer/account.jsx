import React from 'react';
import { FiSettings } from "react-icons/fi";
import { MdHistory } from "react-icons/md";
import { BiBarcode } from "react-icons/bi";
import { FaMedal, FaAward, FaBarcode } from "react-icons/fa";

function Account() {
    return (
        <div className='mb-28 mt-4 px-4'>
            <div className='flex items-center justify-between'>
                <h1 className="text-2xl font-bold">Tài Khoản</h1>
                <button className='mt-1'>
                    <FiSettings size={24} color="blue" />
                </button>
            </div>

            <div className='flex justify-between items-center mt-6'>
                <div className='flex items-center gap-4'>
                    <img
                        src="https://i.pravatar.cc/150?img=3"
                        alt="avatar"
                        className="w-20 h-20 rounded-lg shadow-lg"
                    />
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <FaMedal size={20} color="gold" />
                            <p className="font-semibold">Qui Mui</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <BiBarcode size={20} color="#333" />
                            <p>12 Stars</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FaBarcode size={20} />
                    <p className="text-sm">Mã sản phẩm</p>
                </div>
            </div>
        </div>
    );
}

export default Account;
