import React, { useState, useContext } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import Header from "./Header.jsx";
import Vheader from "./Vheader.jsx";
import ThemeContext from "../../context/ThemeContext.jsx";
import { Helmet } from "react-helmet";

function YourProfile() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState({
    name: "John Doe",
    username: "JohnDoe123",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    profilePicture: null,
    password: "123456",
    confirmPassword: "123456",
    pin: "1234",
    confirmPin: "1234",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSectionChange = (section) => {
    if (isEditing) {
      setIsEditing(false);
      alert(`${activeSection === "personal" ? "Personal Info" : "Security Info"} saved successfully!`);
      console.log("Saved Data:", formData);
    }
    setActiveSection(section);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated successfully!");
    console.log("Updated Profile Data:", formData);
  };

  const renderField = (label, name, type = "text") => (
    <div>
      <label
        htmlFor={name}
        className={`block font-pop font-medium mb-2 ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        {label}
      </label>
      {isEditing ? (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
            darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-800"
          }`}
        />
      ) : (
        <p
          className={`p-3 border rounded-md transition-all duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-gray-100 border-gray-300 text-gray-800"
          }`}
        >
          {formData[name]}
        </p>
      )}
    </div>
  );

  return (
    <>
    <Helmet>
      <title>Your Profile</title>
    </Helmet>
    <div
      className={`min-h-screen font-pop transition-all duration-300 mb-20 ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-col lg:flex-row">
        <Vheader darkMode={darkMode} />
        <main className="flex-1 p-6 md:m-10">
          <h1
            className={`text-3xl md:text-4xl font-bold transition-all duration-300 ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Your Profile
          </h1>
          <div className="h-2 w-32 md:w-44 bg-blue-500 rounded-full mb-7"></div>
          <div
            className={`max-w-4xl mx-auto transition-all duration-300 shadow-lg rounded-lg overflow-hidden ${
              darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
            }`}
          >
            <div
              className={`p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full ${
                    activeSection === "personal"
                      ? "bg-blue-500 text-white shadow"
                      : darkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-300 text-black"
                  }`}
                  onClick={() => handleSectionChange("personal")}
                >
                  Personal Info
                </button>
                <button
                  className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full ${
                    activeSection === "security"
                      ? "bg-blue-500 text-white shadow"
                      : darkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-300 text-black"
                  }`}
                  onClick={() => handleSectionChange("security")}
                >
                  Security Info
                </button>
              </div>
              <button
                onClick={handleEditToggle}
                className={`flex items-center px-4 py-2 mt-4 sm:mt-0 rounded-full transition shadow-md ${
                  isEditing
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isEditing ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />}{" "}
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
            >
              {activeSection === "personal" && (
                <>
                  <div className="col-span-1 md:col-span-2 flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={
                          formData.profilePicture ||
                          "https://via.placeholder.com/120x120.png?text=Profile+Photo"
                        }
                        alt="Profile Preview"
                        className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full transition-all duration-300 border-4 object-cover ${
                          darkMode ? "border-gray-600" : "border-gray-200"
                        }`}
                      />
                      {isEditing && (
                        <>
                          <label
                            htmlFor="profilePicture"
                            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition"
                          >
                            <FaEdit />
                          </label>
                          <input
                            type="file"
                            id="profilePicture"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                            className="hidden"
                          />
                        </>
                      )}
                    </div>
                  </div>
                  {renderField("Name", "name")}
                  {renderField("Username", "username")}
                  {renderField("Email", "email", "email")}
                  {renderField("Phone Number", "phone")}
                </>
              )}
              {activeSection === "security" && (
                <>
                  {renderField("Password", "password", "password")}
                  {renderField("Confirm Password", "confirmPassword", "password")}
                  {renderField("PIN", "pin", "password")}
                  {renderField("Confirm PIN", "confirmPin", "password")}
                </>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}

export default YourProfile;
