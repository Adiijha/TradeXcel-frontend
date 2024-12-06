import React from "react";
import Coming_Soon from "../../assets/Coming_Soon.png";

function ComingSoon({ darkMode }) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-screen ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } font-pop transition-all duration-300`}
    >
      {/* Image Section */}
      <img
        src={Coming_Soon} // Replace with a cute graphic URL
        alt="Coming Soon"
        className="w-64 h-64 sm:w-80 sm:h-80 mb-6 rounded-2xl"
      />

      {/* Text Section */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">
        Come Back Later!
      </h1>
      <p
        className={`text-base sm:text-lg text-center ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        We're still in production. Something amazing is on its way!
      </p>

      {/* Button Section */}
      <div className="mt-6">
        <button
          className={`px-6 py-3 text-white rounded-lg ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-blue-500 hover:bg-blue-600"
          } transition-all duration-300`}
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default ComingSoon;
