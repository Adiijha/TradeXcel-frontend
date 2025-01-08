import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Import the base URL from the environment variables
console.log(import.meta.env.VITE_API_BASE_URL);
console.log("Backend URL:", BASE_URL); // Log to verify the URL is correct

const BASE_FINANCE_URL = import.meta.env.VITE_API_FINANCE_URL; // Import the finance API URL
console.log(import.meta.env.VITE_API_FINANCE_URL);
console.log("Finance API URL:", BASE_FINANCE_URL); // Log the finance API URL

// Function to log in the user
export const loginUser = async (emailOrUsername, password, pin) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`, // Use the base URL with the login endpoint
      { emailOrUsername, password, pin },
      {
        withCredentials: true, // Ensure cookies are sent/received for authentication
      }
    );

    return response.data; // Return server response data
  } catch (error) {
    // Log detailed error info for debugging
    console.error("Login API Error:", error.response || error.message);

    // Extract error message from server or fallback to a default message
    const message =
      error?.response?.data?.message ||
      error.message ||
      "An unexpected error occurred while logging in";

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
export const getUserName = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    const response = await axios.get(`${BASE_URL}/name`, {
      withCredentials: true, // Send cookies if the backend uses them
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request
      },
    });

    return response.data; // Successfully fetched profile data
  } catch (error) {
    console.error("Error fetching user name:", error); // Log detailed error for debugging
    const message =
      error?.response?.data?.message || error.message || "Failed to fetch user name";
    throw new Error(message); // Throw a user-friendly error message
  }
};

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
}

export const updateUserProfile = async (formData) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    const response = await axios.patch(`${BASE_URL}/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request
      },
    });

    return response.data; // Successfully updated the profile
  } catch (error) {
    console.error("Error updating user profile:", error); // Log detailed error for debugging
    const message =
      error?.response?.data?.message || error.message || "Failed to update user profile";
    throw new Error(message); // Throw a user-friendly error message
  }
};

export const changePasswordAndPin = async (formData) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    const response = await axios.patch(`${BASE_URL}/change-password-pin`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request
      },
    });

    return response.data; // Successfully updated the password and pin
  } catch (error) {
    console.error("Error updating password and pin:", error); // Log detailed error for debugging
    const message =
      error?.response?.data?.message || error.message || "Failed to update password and pin";
    throw new Error(message); // Throw a user-friendly error message
  }
};

export const getAvatar = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    const response = await axios.get(`${BASE_URL}/getavatar`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request
      },
    });

    return response.data; // Successfully fetched the avatar
  } catch (error) {
    console.error("Error fetching user avatar:", error); // Log detailed error for debugging
    const message =
      error?.response?.data?.message || error.message || "Failed to fetch user avatar";
    throw new Error(message); // Throw a user-friendly error message
  }
};

export const updateAvatar = async (formData) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    // Sending formData directly without manually setting Content-Type
    const response = await axios.patch(`${BASE_URL}/updateavatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request
        // No need to manually set Content-Type when sending formData
      },
    });

    return response.data; // Successfully updated the avatar
  } catch (error) {
    console.error("Error updating user avatar:", error); // Log detailed error for debugging
    const message =
      error?.response?.data?.message || error.message || "Failed to update user avatar";
    throw new Error(message); // Throw a user-friendly error message
  }
};

// Fetch stock data from the backend for a specific symbol
export const getStockData = async (symbol) => {
  try {
    // Construct the API URL for the stock symbol
    const url = `${BASE_FINANCE_URL}/stock/${symbol}`;

    // Make the request to the backend
    const response = await axios.get(url);

    // Handle unsuccessful response
    if (response.data.status !== 200) {
      console.error(`Error fetching stock data: ${response.data.message}`);
      return null;
    }

    const { currentPrice, stockPrices, percentageChange, todayChange } = response.data.data;


    return {
      currentPrice: currentPrice || 0,
      stockPrices: stockPrices || Array.from({ length: 30 }, () => currentPrice || 0),
      percentageChange: percentageChange, // Convert to number if not already
      todayChange: todayChange,           // Convert to number if not already
    };
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw new Error("Failed to fetch stock data");
  }
};




