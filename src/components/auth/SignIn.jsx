import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/api.js"; // Import the login API function
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // To handle cookies
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { login } from "../../redux/authSlice.js"; // Import the login action
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons from react-icons
import { motion } from "framer-motion"; // Import Framer Motion

function SignIn() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setIsLoading(true);
      const response = await loginUser(emailOrUsername, password, pin);
      const accessToken = response?.data?.accessToken;
      if (!accessToken) throw new Error("Access Token not found");

      Cookies.set("accessToken", accessToken, { secure: true, sameSite: "lax" });
      dispatch(login(accessToken));
      localStorage.setItem("authToken", accessToken);
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    }
    finally {
        setIsLoading(false);
      }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center font-pop h-full p-4 pb-10 bg-grey"
    >
            <div className="flex flex-col items-center font-pop justify-center pt-8">
            <motion.span
              className="text-4xl text-blue-900 font-bold font-pop pb-2"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Welcome Back
            </motion.span>
            <motion.p
              className="text-lg font-pop pb-3"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              Enter Your Details to Login
            </motion.p>
            <motion.p
              className="text-xs text-gray-400 font-pop pb-7"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              Login Credentials for Testing Purposes:
              <div>Username: bot123</div>
              <div>Password: bot123!@#</div>
              <div>PIN: 1234</div>
            </motion.p>

          </div>
      <motion.div
        className="max-w-md w-full mx-auto border-2 border-btn-blue rounded-2xl p-8 bg-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSignIn}>
          <div className="space-y-6">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="text-gray-800 text-sm mb-2 block">
                Email or Username
              </label>
              <input
                name="emailOrUsername"
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter email or username"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="text-gray-800 text-sm mb-2 block">4-Digit PIN</label>
              <div className="relative">
                <input
                  name="pin"
                  type={showPin ? "text" : "password"}
                  inputMode="numeric"
                  maxLength="4"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter a 4-digit PIN"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Sign In Button */}
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
          "Sign In"
          )}
      </motion.button>
        </form>
        <p className="text-gray-800 text-md mt-6 text-center">
            Don't have an account?
            <Link to="/signup" className="text-blue-500 hover:underline font-semibold group ml-1">
              Sign up here
            </Link>
          </p>
      </motion.div>
    </motion.div>
  );
}

export default SignIn;
