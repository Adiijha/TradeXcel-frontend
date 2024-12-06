import React, { useState } from "react";
import logo from "../../assets/logo-full-bg.png";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility
  const [showPin, setShowPin] = useState(false); // State for toggling PIN visibility
  const [selectedOtpMethod, setSelectedOtpMethod] = useState("");

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
    <div className="flex flex-col justify-center font-pop h-full p-4 pb-10 bg-grey">
      <div className="flex flex-row gap-3 justify-center text-2xl font-bold text-blue-900 text-center pb-8">
        <img className="w-10 h-10" src={logo} alt="Logo" />
        TradeXcel
      </div>
      <div className="max-w-md w-full mx-auto border-2 border-btn-blue rounded-2xl p-8 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Your Name</label>
              <input
                name="name"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Your Username</label>
              <input
                name="username"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter Your Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email ID</label>
              <input
                name="email"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
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
            </div>
            <div className="relative">
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
            </div>
            <div className="relative">
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
            </div>
            
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
    </div>

            <button
              type="submit"
              className="w-full text-white bg-btn-blue py-3 rounded-md text-sm mt-6"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          <span className="text-sm text-gray-700">Already have an account?</span>
          <Link to="/signin" className="text-blue-500 text-sm font-bold ml-2">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
