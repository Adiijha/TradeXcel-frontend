import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaSave, FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "./Header.jsx";
import Vheader from "./Vheader.jsx";
import ThemeContext from "../../context/ThemeContext.jsx";
import { Helmet } from "react-helmet";
import { getUserProfile, updateUserProfile, changePasswordAndPin } from "../../api/api.js";

function YourProfile() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    dob: "",
    profilePicture: null,
  });

  const [securityData, setSecurityData] = useState({
    oldPassword: "",
    newPassword: "",
    oldPin: "",
    newPin: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    oldPin: false,
    newPin: false,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        if (response.status === 200 && response.data) {
          const { name, username, email, phoneNumber, dob, profilePicture } = response.data;
          const formattedDob = dob ? new Date(dob).toISOString().split("T")[0] : "";

          setFormData((prev) => ({
            ...prev,
            name: name || "",
            username: username || "",
            email: email || "",
            phoneNumber: phoneNumber || "",
            dob: formattedDob,
            profilePicture: profilePicture || null,
          }));
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (activeSection === "personal") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (activeSection === "security") {
      setSecurityData((prev) => ({ ...prev, [name]: value }));
    }
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
    // Auto-save before switching sections
    if (isEditing) {
      handleSubmit();
    }
    setActiveSection(section);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const payload = {};

    if (activeSection === "personal") {
      if (formData.name || formData.username || formData.email || formData.phoneNumber || formData.dob || formData.profilePicture) {
        payload.name = formData.name;
        payload.username = formData.username;
        payload.email = formData.email;
        payload.phoneNumber = formData.phoneNumber;
        payload.dob = formData.dob;
        if (formData.profilePicture instanceof File) {
          payload.profilePicture = formData.profilePicture;
        }
      }
    }

    if (activeSection === "security") {
      const hasPassword = securityData.oldPassword && securityData.newPassword;
      const hasPin = securityData.oldPin && securityData.newPin;

      if (!hasPassword && !hasPin) {
        alert("Please provide either password or PIN details to update.");
        return;
      }

      if (hasPassword) {
        if (!securityData.oldPassword || !securityData.newPassword) {
          alert("Both old and new passwords are required to update the password.");
          return;
        }
        payload.oldPassword = securityData.oldPassword;
        payload.newPassword = securityData.newPassword;
      }

      if (hasPin) {
        if (!securityData.oldPin || !securityData.newPin) {
          alert("Both old and new PINs are required to update the PIN.");
          return;
        }
        payload.oldPin = securityData.oldPin;
        payload.newPin = securityData.newPin;
      }
    }

    if (Object.keys(payload).length === 0) {
      alert("Please provide information to update.");
      return;
    }

    try {
      if (activeSection === "personal") {
        const response = await updateUserProfile(payload);
        if (response.status === 200) {
          alert("Personal information updated successfully!");
        } else {
          alert("Failed to update personal information. Please try again.");
        }
      } else if (activeSection === "security") {
        const response = await changePasswordAndPin(payload);
        if (response.status === 200) {
          alert("Password and/or PIN updated successfully!");
        } else {
          alert("Failed to update password or PIN. Please try again.");
        }
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("There was an error updating the information. Please try again.");
    } finally {
      setIsEditing(false);
      setSecurityData({
        oldPassword: "",
        newPassword: "",
        oldPin: "",
        newPin: "",
      });
    }
  };

  const handleShowPassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const renderField = (label, name, type = "text") => (
    <div>
      <label
        htmlFor={name}
        className={`block font-pop font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}
      >
        {label}
      </label>
      {isEditing ? (
        <div className="relative">
          <input
            type={showPassword[name] ? "text" : type}
            id={name}
            name={name}
            value={activeSection === "personal" ? formData[name] : securityData[name]}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
              darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-800"
            }`}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => handleShowPassword(name)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword[name] ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
      ) : (
        <p
          className={`p-3 border rounded-md transition-all duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-gray-100 border-gray-300 text-gray-800"
          }`}
        >
          {type === "password" ? "********" : (activeSection === "personal" ? formData[name] : securityData[name]) || "N/A"}
        </p>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Your Profile</title>
      </Helmet>
      <div className={`min-h-screen font-pop transition-all duration-300 ${darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex flex-col lg:flex-row mb-16 md:mb-0">
          <Vheader darkMode={darkMode} />
          <main className="flex-1 p-6 md:m-10">
            <h1 className={`text-3xl md:text-4xl font-bold transition-all duration-300 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
              Your Profile
            </h1>
            <div className="h-2 w-32 md:w-44 bg-blue-500 rounded-full mb-7"></div>
            <div className={`max-w-4xl mx-auto transition-all duration-300 shadow-lg rounded-lg overflow-hidden ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"}`}>
              <div className={`p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full ${
                      activeSection === "personal" ? "bg-blue-500 text-white shadow" : darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-300 text-black"
                    }`}
                    onClick={() => handleSectionChange("personal")}
                  >
                    Personal Info
                  </button>
                  <button
                    className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full ${
                      activeSection === "security" ? "bg-blue-500 text-white shadow" : darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-300 text-black"
                    }`}
                    onClick={() => handleSectionChange("security")}
                  >
                    Security Info
                  </button>
                </div>
                <button
                  onClick={isEditing ? handleSubmit : handleEditToggle}
                  className={`flex items-center px-4 py-2 mt-4 sm:mt-0 rounded-full transition shadow-md ${
                    isEditing ? "bg-green-500 hover:bg-green-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isEditing ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />} {isEditing ? "Save" : "Edit"}
                </button>
              </div>
              <form id="profile-form" onSubmit={handleSubmit} className="p-4 sm:p-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                {activeSection === "personal" && (
                  <>
                    <div className="col-span-1 md:col-span-2 flex flex-col items-center">
                      <div className="relative">
                        <img
                          src={formData.profilePicture || "https://via.placeholder.com/120x120.png?text=Profile+Photo"}
                          alt="Profile Preview"
                          className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full transition-all duration-300 border-4 object-cover ${darkMode ? "border-gray-600" : "border-gray-200"}`}
                        />
                        {isEditing && (
                          <>
                            <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition">
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
                    {renderField("Phone Number", "phoneNumber")}
                    {renderField("Date of Birth", "dob", "date")}
                  </>
                )}
                {activeSection === "security" && (
                  <>
                    {renderField("Current Password", "oldPassword", "password")}
                    {renderField("New Password", "newPassword", "password")}
                    {renderField("Current PIN", "oldPin", "password")}
                    {renderField("New PIN", "newPin", "password")}
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
