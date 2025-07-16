import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaArrowLeft, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/check-email", { email });
      await axios.post("http://localhost:5000/api/email/send-otp", { email });
      setStep(2);
      setError("");
    } catch (err) {
      setError("Lỗi khi gửi mã OTP.");
    }
  };

  const handleVerifyOtp = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/email/verify-otp", { email, otp });
    if (res.status === 200) {
      const userRes = await axios.post("http://localhost:5000/api/check-email", { email });
      const role = userRes.data.role?.[0]; // Lấy role từ phản hồi API nếu đã có

      localStorage.setItem("user", JSON.stringify(userRes.data)); // Lưu info

      // Điều hướng theo role
      if (role === "Admin") {
        navigate("/admin/home");
      } else if (role === "Manager") {
        navigate("/manager/home");
      } else {
        navigate("/home");
      }
    }
  } catch (err) {
    setError("Mã OTP sai hoặc đã hết hạn.");
  }
};


  const handleBack = () => {
    setStep(1);
    setOtp("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-300 to-white px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl h-full ">
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">Đăng nhập / Đăng ký</h2>

        {step === 2 && (
          <button
            onClick={handleBack}
            className="mb-4 text-gray-500 hover:text-red-500 flex items-center gap-2"
          >
            <FaArrowLeft /> Quay lại
          </button>
        )}

        {step === 1 && (
          <>
            <label className="text-sm text-gray-600 mb-1 block">Email</label>
            <div className="flex items-center border rounded-lg px-3 mb-4">
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
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold"
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
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
            >
              Xác minh OTP
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-center mt-4 text-sm">{error}</p>}

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
