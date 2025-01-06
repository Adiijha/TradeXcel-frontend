import React, { useState, useRef, useEffect } from "react";
import alert from "../../assets/alerts.png";
import alert_w from "../../assets/alerts-w.png";

const Alerts = ({ darkMode }) => {
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New trade alert", time: "5 minutes ago" },
    { id: 2, message: "Balance updated", time: "1 hour ago" },
    { id: 3, message: "Stock price alert", time: "Yesterday" },
  ]);
  const alertsRef = useRef(null);

  const handleAlertsClick = () => {
    setAlertsOpen((prevState) => !prevState);
  };

  // Remove notification by ID
  const handleClearNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  // Clear all notifications
  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  // Close the alerts dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (alertsRef.current && !alertsRef.current.contains(event.target)) {
        setAlertsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={alertsRef} className="relative">
      {/* Alerts Icon */}
      <div
        onClick={handleAlertsClick}
        className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-300 ${
          alertsOpen
            ? darkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-black"
            : darkMode
            ? "text-white"
            : "text-black"
        }`}
      >
        <img
          className="w-6 h-6 sm:w-8 sm:h-8 mx-auto"
          src={darkMode ? alert_w : alert}
          alt="Alerts"
        />
        <span className="hidden sm:inline ml-2">Alerts</span>
      </div>

      {/* Alerts Dropdown */}
      {alertsOpen && (
        <div
          className={`absolute w-72 sm:w-96 md:w-80 lg:w-96 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          } rounded-md shadow-lg z-10 p-4 max-h-80 overflow-y-auto top-10 sm:top-12 md:left-0 left-1/2 transform -translate-x-1/2`}
        >
          <h4 className="font-bold text-lg md:text-xl mb-4">Notifications</h4>
          <ul className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`flex justify-between items-start gap-2 p-3 rounded-md shadow-sm ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  } transition-all duration-300`}
                >
                  <div className="flex-1">
                    <p className="font-medium text-md md:text-lg">{notification.message}</p>
                    <small className="text-gray-400 text-xs md:text-sm">{notification.time}</small>
                  </div>
                  <button
                    onClick={() => handleClearNotification(notification.id)}
                    className={`text-sm md:text-md px-3 py-1 rounded ${
                      darkMode
                        ? "bg-red-500 hover:bg-red-400 text-white"
                        : "bg-red-100 hover:bg-red-200 text-red-600"
                    }`}
                  >
                    Clear
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-400">No notifications</p>
            )}
          </ul>

          {/* Clear All Button */}
          {notifications.length > 0 && (
            <div className="mt-4 text-center">
              <button
                onClick={handleClearAllNotifications}
                className={`px-4 py-2 rounded-md text-sm ${
                  darkMode
                    ? "bg-red-500 hover:bg-red-400 text-white"
                    : "bg-red-100 hover:bg-red-200 text-red-600"
                }`}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Alerts;
