import React, { useState } from "react";
import axios from "axios";
import { FaGoogle, FaLock, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Home from "./home"; // Giả sử bạn có một trang Home để điều hướng sau khi đăng nhập  

function Login() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCheckEmail = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/check-email", { email });
      if (res.data.exists) {
        await axios.post("http://localhost:5000/api/email/send-otp", { email });
        setStep(2);
        setError("");
      } else {
        setError("Email không tồn tại.");
      }
    } catch (err) {
      setError("Lỗi khi kiểm tra email.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/email/verify-otp", { email, otp });
      if (res.status === 200) {
        setStep(3);
        setError("");
      }
    } catch (err) {
      setError("Mã OTP sai hoặc đã hết hạn.");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      setError("Sai mật khẩu.");
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-white px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">Đăng Nhập</h2>

        {/* Nút quay lại */}
        {step > 1 && (
          <button onClick={handleBack} className="mb-4 text-gray-500 hover:text-red-500 flex items-center gap-2">
            <FaArrowLeft /> Quay lại
          </button>
        )}

        {/* Bước 1: Nhập email */}
        {step === 1 && (
          <>
            <label className="text-sm text-gray-600 mb-1 block">Email</label>
            <div className="flex items-center border rounded-lg px-3 mb-4">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full py-2 outline-none"
              />
            </div>
            <button
              onClick={handleCheckEmail}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
            >
              Gửi mã xác thực
            </button>
          </>
        )}

        {/* Bước 2: Nhập OTP */}
        {step === 2 && (
          <>
            <label className="text-sm text-gray-600 mb-1 block">Mã OTP đã gửi qua email</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Nhập mã OTP"
              className="w-full py-2 px-3 border rounded-lg mb-4 focus:outline-red-500"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
            >
              Xác minh OTP
            </button>
          </>
        )}

        {/* Bước 3: Nhập mật khẩu */}
        {step === 3 && (
          <>
            <label className="text-sm text-gray-600 mb-1 block">Mật khẩu</label>
            <div className="flex items-center border rounded-lg px-3 mb-4">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full py-2 outline-none"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
            >
              Đăng nhập
            </button>
          </>
        )}

        {/* Hiển thị lỗi */}
        {error && <p className="text-red-500 text-center mt-4 text-sm">{error}</p>}

        {/* Hoặc đăng nhập với Google */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">hoặc</p>
          <button className="mt-2 flex items-center justify-center gap-2 w-full border py-2 rounded-lg hover:bg-gray-50">
            <FaGoogle className="text-red-500" />
            <span>Đăng nhập bằng Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
