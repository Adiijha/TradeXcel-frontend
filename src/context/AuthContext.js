import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setIsAuthenticated(true);
      navigate("/dashboard"); // Redirect to dashboard if authenticated
    } else {
      setIsAuthenticated(false);
      navigate("/signin"); // Redirect to sign-in if not authenticated
    }
  }, [navigate]);

  const login = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove("accessToken"); // Remove the token when logging out
    navigate("/signin"); // Redirect to sign-in page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
