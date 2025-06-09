import React, { useEffect, useState } from 'react';
import { FiSettings, FiEdit, FiBell } from "react-icons/fi";
import { MdHistory } from "react-icons/md";
import { BiBarcode , FaMedal, FaAward } from "react-icons/fa";
function Account() {
    return (
        <div className='mb-28 mt-4'>
            <div className='flex items-center justify-center'>
                <h1 className="text-2xl font-bold text-center w-5/6">Tài Khoản</h1>
                <button className='mt-2'>
                    <FiSettings size={24} color="blue" />
                </button>
            </div>
            <div className='flex justify-between'>   
                <div className='flex'>
                    <div>
                        <img src="https://www.facebook.com/photo/?fbid=1533931694199236&set=a.103497080576045" alt="avatar" className="w-1/4 h-auto rounded-lg shadow-lg"/>
                    </div>
                    <div>
                        <div className='flex'>
                            <FaMedal size={28} color="gold" />
                            <p>Qui Mui</p>
                        </div>
                        <div className='flex'>
                            <BiBarcode size={32} color="#333" />
                            <p>12 Stars</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div><FaBarcode size={20} /></div>
                    <p>Mã sản phẩm</p>
                </div>
                
            </div>
        </div>
    )
}

export default Account;