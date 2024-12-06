import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-full-bg.png";
import { loginUser } from "../../api/api.js"; // Import the login API function
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // To handle cookies
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { login } from "../../redux/authSlice.js"; // Import the login action
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons from react-icons

function SignIn() {
  const [emailOrUsername, setEmailOrUsername] = useState(""); // State for email or username
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState(""); // Added PIN field
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showPin, setShowPin] = useState(false); // State for toggling PIN visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Check if the user is already logged in (using Redux state)
    if (isAuthenticated) {
      // Redirect to the dashboard if the user is logged in
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Function to handle sign in
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setError(null);

      // Regular Expression for validating username (only letters, numbers, and underscores allowed)

      // Call the login API
      const response = await loginUser(emailOrUsername, password, pin);
      console.log("Login Response:", response); // Log full response

      // Check if the response has an accessToken
      const accessToken = response?.data?.accessToken;

      if (accessToken) {
        // Store the token in cookies
        Cookies.set("accessToken", accessToken, { httpOnly: true, secure: true });

        // Dispatch login action to store the accessToken in Redux
        dispatch(login(accessToken));

        // Redirect to the dashboard
        navigate("/dashboard");
      } else {
        throw new Error("Access Token not found");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
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

  return (
    <div className="flex flex-col justify-center font-pop h-full p-4 pb-10 bg-grey ">
      <div className="flex flex-row gap-3 justify-center text-2xl font-bold text-blue-900 text-center pb-8">
        <img className="w-10 h-10" src={logo} alt="Logo" />
        TradeXcel
      </div>
      <div className="max-w-md w-full mx-auto border-2 border-btn-blue rounded-2xl p-8 bg-white">
        <form onSubmit={handleSignIn}>
          <div className="space-y-6">
            {/* Email or Username Field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email or Username</label>
              <input
                name="emailOrUsername"
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter email or username"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility} // Toggle visibility on click
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />} {/* Eye icon toggle */}
                </span>
              </div>
            </div>

            {/* PIN Field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">4-Digit PIN</label>
              <div className="relative">
                <input
                  name="pin"
                  type={showPin ? "text" : "password"} // Toggle between text and password
                  inputMode="numeric"
                  maxLength="4"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter a 4-digit PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePinVisibility} // Toggle visibility on click
                >
                  {showPin ? <AiOutlineEyeInvisible /> : <AiOutlineEye />} {/* Eye icon toggle */}
                </span>
              </div>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center pt-4">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 shrink-0 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="text-gray-800 ml-3 block text-sm"
            >
              Remember me
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mt-4">
              {error}
            </div>
          )}

          {/* Sign In Button */}
          <div className="!mt-6">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none"
            >
              Sign In
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-gray-800 text-sm mt-6 text-center">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-500 font-semibold hover:underline ml-1"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
