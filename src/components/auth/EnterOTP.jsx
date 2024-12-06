import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-full-bg.png";
import { verifyOTP } from "../../api/api";

function EnterOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber = "", countryCode = "", allowOTP = false, email = "", otpMethod = "" } = location.state || {};
  
  useEffect(() => {
    if (!allowOTP) {
      navigate("/");
    }
  }, [allowOTP, navigate]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  useEffect(() => {
    const firstInput = document.getElementById(`otp-input-0`);
    if (firstInput) firstInput.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    } else if (!value && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.some((digit) => digit === "")) {
      return setError("Please enter the full OTP.");
    }

    // If OTP method is email, use email for OTP verification
    if (otpMethod === "email" && !email) {
      return setError("Missing email. Please try again.");
    }
    
    const enteredOtp = otp.join("");


    try {
  if (otpMethod === "phone" && phoneNumber) {
    // OTP verification via phone
    await verifyOTP(otpMethod, "", phoneNumber, enteredOtp, countryCode); // Send empty string for email
  } else if (otpMethod === "email" && email) {
    // OTP verification via email
    await verifyOTP(otpMethod, email, "", enteredOtp); // Send empty string for phoneNumber
  } else {
    return setError("OTP method mismatch or missing information.");
  }
  alert("OTP verified successfully! Please Sign In to continue.");
  navigate("/signin");
} catch (err) {
  setError(err.response?.data?.message || "Invalid OTP. Please try again.");
}

  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen pt-10 font-pop p-4">
      <div className="flex flex-row gap-3 justify-center items-center text-xl sm:text-2xl font-bold text-blue-900 text-center pb-6">
        <img className="w-8 sm:w-10 h-8 sm:h-10" src={logo} alt="Logo" />
        <span>TradeXcel</span>
      </div>
      <div className="max-w-md w-full mx-auto bg-white border border-gray-300 rounded-2xl p-6 sm:p-8 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 sm:space-y-6">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label className="text-gray-800 text-sm sm:text-base mb-2 block">Enter OTP</label>
              <div className="flex gap-2 sm:gap-4 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl border border-gray-300 rounded-md outline-blue-500"
                    placeholder="-"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 sm:py-3 px-4 text-sm sm:text-base tracking-wider font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
            >
              Submit OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnterOTP;
