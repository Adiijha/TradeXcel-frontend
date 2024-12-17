import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo-full-bg.png";
import { verifyOTP } from "../../api/api";

function EnterOTP() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    phoneNumber = "",
    countryCode = "",
    allowOTP = false,
    email = "",
    otpMethod = "",
  } = location.state || {};

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
    if (!/^\d?$/.test(value)) return;
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

    const enteredOtp = otp.join("");

    try {
      setIsLoading(true);
      if (otpMethod === "phone" && phoneNumber) {
        await verifyOTP(otpMethod, "", phoneNumber, enteredOtp, countryCode);
      } else if (otpMethod === "email" && email) {
        await verifyOTP(otpMethod, email, "", enteredOtp);
      } else {
        return setError("OTP method mismatch or missing information.");
      }
      alert("OTP verified successfully! Please Sign In to continue.");
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    }finally{
    setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center min-h-screen pt-10 font-pop p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex flex-row gap-3 justify-center items-center text-xl sm:text-2xl font-bold text-blue-900 text-center pb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img className="w-8 sm:w-10 h-8 sm:h-10" src={logo} alt="Logo" />
        <span>TradeXcel</span>
      </motion.div>

      <motion.div
        className="max-w-md w-full mx-auto bg-white border border-gray-300 rounded-2xl p-6 sm:p-8 shadow-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 sm:space-y-6">
            {error && (
              <motion.p
                className="text-red-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {error}
              </motion.p>
            )}
            <div>
              <label className="text-gray-800 text-sm sm:text-base mb-2 block">
                Enter OTP
              </label>
              <div className="flex gap-2 sm:gap-4 justify-center">
                {otp.map((digit, index) => (
                  <motion.input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl border border-gray-300 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="-"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            className="mt-6 w-full py-3 px-4 text-sm tracking-wider flex justify-center items-center font-semibold rounded-md text-white bg-btn-blue hover:bg-blue-600 focus:outline-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
      {isLoading ? (
          <div className="loader border-t-2 border-white w-5 h-5 rounded-full animate-spin"></div>
          ) : (
          "Submit OTP"
          )}
      </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default EnterOTP;
