import axios from 'axios';

// Base URL for API
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("Backend URL:", BASE_URL);
// Function to log in the user
export const loginUser = async (emailOrUsername, password, pin) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      { emailOrUsername, password, pin },
      {
        withCredentials: true, // Ensure cookies are sent/received for authentication
      }
    );

    return response.data; // Return server response data
  } catch (error) {
    // Extract error message from server or fallback to a default message
    const message = error?.response?.data?.message || 
                    error.message || 
                    "An unexpected error occurred while logging in";
    
    console.error("Login API Error:", message);
    throw new Error(message); // Re-throw error with user-friendly message
  }
};


// Function to register a user (now registers in PendingUsers collection)
export const registerUser = async ({ name, username, email, password, dob, phoneNumber, countryCode, pin, otpMethod }) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      name,
      username,
      email,
      password,
      dob,
      phoneNumber,
      countryCode,
      pin,
      otpMethod
    });
    return response.data; // Return success message for OTP sent
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Error registering user.";
    throw new Error(message); // More consistent error message handling
  }
};

// Function to verify OTP (the OTP verification process should now be on a pending user)
export const verifyOTP = async (otpMethod, email, phoneNumber, otp) => {
  try {
    // Construct the payload dynamically based on otpMethod
    const payload = {
      otpMethod, // Specifies whether it's 'email' or 'phone'
      otp,       // OTP as a string
      email,
      phoneNumber
    };

    console.log("Verifying OTP with data:", payload);

    // Send OTP verification data in the POST request
    const response = await axios.post(
      `${BASE_URL}/verify-otp`,  // Endpoint for OTP verification
      payload,                   // Include dynamically constructed payload
      {
        withCredentials: true,    // Include credentials if needed for cookies
      }
    );

    // Log the successful response for debugging purposes
    console.log("OTP verification response:", response.data);

    // Return the response data for use in the frontend
    return response.data;
  } catch (error) {
    // Handle and log errors consistently
    const message =
      error?.response?.data?.message || error.message || "Error verifying OTP";
    console.error("OTP Verification failed:", message);

    // Throw an error to propagate it to the calling function/component
    throw new Error(message);
  }
};

// Function to log out the user
export const logoutUser = async (token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/logout`,
      {}, // Empty body
      {
        headers: { Authorization: `Bearer ${token}` }, // Pass token as Bearer
        withCredentials: true, // Ensure cookies are included
      }
    );
    return response.data; // Return success message
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Error logging out";
    throw new Error(message); // More consistent error message handling
  }
};

// Function to get the logged-in user's profile
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    const response = await axios.get(`${BASE_URL}/profile`, {
      withCredentials: true, // Send cookies if the backend uses them
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request
      },
    });

    return response.data; // Successfully fetched profile data
  } catch (error) {
    console.error("Error fetching user profile:", error); // Log detailed error for debugging
    const message =
      error?.response?.data?.message || error.message || "Failed to fetch user profile";
    throw new Error(message); // Throw a user-friendly error message
  }
};


