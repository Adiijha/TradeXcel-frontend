import React, { useState } from "react";
import logo from "../../assets/logo-full-bg.png";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";

function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility
  const [showPin, setShowPin] = useState(false); // State for toggling PIN visibility
  const [selectedOtpMethod, setSelectedOtpMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
    day: "",
    month: "",
    year: "",
    phone: "",
    countryCode: "+91", 
    pin: "", 
    otpMethod: "email" 
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpMethodChange = (e) => {
  setFormData(prevState => ({
    ...prevState,
    otpMethod: e.target.value,
  }));
  setSelectedOtpMethod(e.target.value); 
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, username, email, password, cpassword, day, month, year, phone, countryCode, pin, otpMethod } = formData;

    // Basic validation
    if (!name || !username || !email || !password || !cpassword || !day || !month || !year || !phone || !countryCode || !pin || !otpMethod) {
      return setError("All fields are required.");
    }

    if (password !== cpassword) {
      return setError("Password and Confirm Password do not match.");
    }

    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
      return setError("Enter a valid 10-digit phone number.");
    }

    // Validate PIN
    if (!/^\d{4}$/.test(pin)) {
      return setError("PIN must be a 4-digit number.");
    }

    // Check if username contains special characters or whitespaces
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username should only contain letters, numbers, and underscores. No spaces or special characters allowed.");
      return;
    }

    const dob = new Date(`${year}-${month}-${day}`).toISOString().split("T")[0];

    const payload = {
      name,
      username,
      email,
      password,
      dob, // Format DOB as YYYY-MM-DD
      phoneNumber: phone, 
      countryCode, 
      pin, 
      otpMethod : otpMethod, 
    };

    try {
      setIsLoading(true);
      // Send registration request
      const response = await registerUser(payload);

      // Navigate to OTP page with necessary data (phoneNumber, countryCode, email, otpMethod)
      if (response?.message) {
        navigate("/signup/otp", {
          state: {
            phoneNumber: payload.phoneNumber,
            countryCode,
            email: payload.email,
            otpMethod: payload.otpMethod,
            allowOTP: true,
          },
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error sending OTP. Please try again.";
      setError(errorMsg);
    }
    finally {
      setIsLoading(false);
    }
  };

  // Toggle show password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle show PIN
  const togglePinVisibility = () => {
    setShowPin(!showPin);
  };

  // Toggle show confirm password
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
<motion.div
      className="flex flex-col justify-center font-pop h-full p-4 pb-10 bg-grey"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <div className="flex flex-col items-center font-pop justify-center pt-8">
        <motion.span
          className="text-4xl text-blue-900 font-bold font-pop pb-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          SIGN UP
        </motion.span>
        <motion.p
          className="text-lg font-pop pb-7"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          Create Your Account
        </motion.p>
      </div>

      <motion.div
        className="max-w-md w-full mx-auto border-2 border-btn-blue rounded-2xl p-8 bg-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
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
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="text-gray-800 text-sm mb-2 block">Your Name</label>
              <input
                name="name"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label className="text-gray-800 text-sm mb-2 block">Your Username</label>
              <input
                name="username"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter Your Username"
                value={formData.username}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}>
              <label className="text-gray-800 text-sm mb-2 block">Email ID</label>
              <input
                name="email"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div 
            initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            className="relative">
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer pt-6"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </motion.div>
            <motion.div
            initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
             className="relative">
              <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <input
                name="cpassword"
                type={showConfirmPassword ? "text" : "password"}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter confirm password"
                value={formData.cpassword}
                onChange={handleChange}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer pt-6"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </motion.div>
            <motion.div 
            initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            className="relative">
              <label className="text-gray-800 text-sm mb-2 block">4-Digit PIN</label>
              <input
                name="pin"
                type={showPin ? "text" : "password"}
                inputMode="numeric"
                maxLength="4"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter a 4-digit PIN"
                value={formData.pin}
                onChange={handleChange}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer pt-6"
                onClick={togglePinVisibility}
              >
                {showPin ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </motion.div>
            
            <motion.div
            initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}>
              <label className="text-gray-800 text-sm mb-2 block">Phone Number</label>
              <div className="flex gap-4">
                <select
                  name="countryCode"
                  className="text-gray-800 bg-white border border-gray-300 w-16 md:w-28 text-sm px-0 py-3 rounded-md"
                  value={formData.countryCode}
                  onChange={handleChange}
                >
                  <option value="+1">+1 (USA/Canada)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (India)</option>
                  {/* Add other country codes as needed */}
                </select>
                <input
                  name="phone"
                  type="text"
                  maxLength="10"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </motion.div>
            <motion.div
            initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              >
              <label className="text-gray-800 text-sm mb-2 block">Date of Birth</label>
              <div className="flex gap-4">
                <select
                  name="day"
                  className="text-gray-800 bg-white border border-gray-300 w-24 text-sm px-2 md:px-4 py-3 rounded-md"
                  value={formData.day}
                  onChange={handleChange}
                >
                  <option value="">Day</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  name="month"
                  className="text-gray-800 bg-white border border-gray-300 w-36 text-sm px-1 md:px-4 py-3 rounded-md"
                  value={formData.month}
                  onChange={handleChange}
                >
                  <option value="">Month</option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, i) => (
                    <option key={i} value={i + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  className="text-gray-800 bg-white border border-gray-300 w-28 text-sm px-2 md:px-4 py-3 rounded-md"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">Year</option>
                  {Array.from({ length: 100 }, (_, i) => 2024 - i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
            <motion.div
            initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              >
      <label className="text-gray-800 text-sm mb-2 block">OTP Method</label>
      <div className="flex gap-4 justify-between relative">
        {/* Phone OTP Option */}
        <div
          className={`flex items-center border border-gray-300 w-44 h-12 rounded px-8 ${
            selectedOtpMethod === "phone" ? "bg-blue-200" : ""
          }`}
        >
          <label
            className="w-full py-4 ms-2 text-sm font-medium px-2 flex items-center cursor-pointer"
          >
            <input
              type="radio"
              name="otpMethod"
              value="phone"
              checked={formData.otpMethod === "phone"}
              onChange={handleOtpMethodChange}
              className="hidden"
            />
            Phone OTP
          </label>
        </div>

        {/* Email OTP Option */}
        <div
          className={`flex items-center border border-gray-300 w-44 h-12 rounded px-8 ${
            selectedOtpMethod === "email" ? "bg-blue-200" : ""
          }`}
        >
          <label
            className="w-full py-4 ms-2 text-sm font-medium px-2 flex items-center cursor-pointer"
          >
            <input
              type="radio"
              name="otpMethod"
              value="email"
              checked={formData.otpMethod === "email"}
              onChange={handleOtpMethodChange}
              className="hidden"
            />
            Email OTP
          </label>
        </div>
      </div>
    </motion.div>

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
              "Sign Up"
              )}
          </motion.button>
          </div>
        </form>
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="text-sm text-gray-700">Already have an account?</span>
          <Link to="/signin" className="text-blue-500 text-sm font-bold ml-2">
            Login here
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
    </>
  );
}

export default SignUp;
