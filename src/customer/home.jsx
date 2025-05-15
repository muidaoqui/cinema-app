import {react} from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { FaFilm, FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';

function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our application.</p>
      <footer>
        <nav className=''>
            <ul className='flex justify-center space-x-4 text-gray-500 text-sm absolute bottom-0 left-0 right-0 bg-white py-16'>
                <li className="flex flex-col items-center hover:text-black cursor-pointer">
                    <a href="#home" className="flex flex-col items-center">
                        <AiOutlineHome size={24} />
                        <span>Trang chủ</span>
                    </a>
                </li>
                <li className="flex flex-col items-center hover:text-black cursor-pointer">
                    <a href="#about" className="flex flex-col items-center">
                        <FaFilm size={24} />
                        <span>Rạp phim</span>
                    </a>
                </li>
                <li className="flex flex-col items-center hover:text-black cursor-pointer">
                    <a href="#contact" className="flex flex-col items-center">
                        <FaShoppingCart size={24} />
                        <span>Sản phẩm</span>
                    </a>
                </li>
                <li className="flex flex-col items-center hover:text-black cursor-pointer">
                    <a href="#about" className="flex flex-col items-center">
                        <MdLocalMovies size={24} />
                        <span>Điện ảnh</span>
                    </a>
                </li>
                <li className="flex flex-col items-center hover:text-black cursor-pointer">
                    <a href="#contact" className="flex flex-col items-center">
                        <FaUser size={24} />
                        <span>Tài khoản</span>
                    </a>
                </li>
            </ul>
        </nav>
      </footer>
    </div>
  )
}

export default Home