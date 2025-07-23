import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaArrowLeft, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const BASE_URL = "http://localhost:5000";
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/email/send-otp`, { email });
      if (response.data.success) {
        setStep(2);
        setError("");
      } else {
        setError(response.data.message || "Không thể gửi OTP.");
      }
    } catch (err) {
      setError("Lỗi khi gửi OTP.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/email/verify-otp`, { email, otp });
      if (response.data.success) {
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role.includes("Admin")) {
  navigate("/admin/home");
} else if (user.role.includes("Manager")) {
  navigate("/manager/home");
} else if (user.role.includes("Customer")) {
  navigate("/home");
} else {
  setError("Không xác định được vai trò.");
}

      } else {
        setError(response.data.message || "OTP không chính xác.");
      }
    } catch (err) {
      setError("Lỗi khi xác minh OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-orange-200 to-yellow-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">Đăng nhập / Đăng ký</h2>

        {step === 2 && (
          <button onClick={() => setStep(1)} className="mb-4 text-gray-500 hover:text-red-500 flex items-center gap-2">
            <FaArrowLeft /> Quay lại
          </button>
        )}

        {step === 1 && (
          <>
            <label className="text-sm text-gray-600 mb-1 block">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-white shadow-sm">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                className="w-full py-2 outline-none"
              />
            </div>
            <button
              onClick={handleSendOTP}
              disabled={!email}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold disabled:opacity-50"
            >
              Xác nhận
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="text-sm text-gray-600 mb-1 block">Nhập mã OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Mã xác thực"
              className="w-full py-2 px-3 border rounded-lg mb-4"
            />
            <button
              onClick={handleVerifyOTP}
              disabled={!otp}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              Xác minh OTP
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-center mt-4 text-sm">{error}</p>}

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">hoặc</p>
          <button
            disabled
            className="mt-2 flex items-center justify-center gap-2 w-full border py-2 rounded-lg text-gray-400 cursor-not-allowed bg-gray-50"
          >
            <FaGoogle className="text-red-400" />
            <span>Đăng nhập bằng Google (chưa hỗ trợ)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
