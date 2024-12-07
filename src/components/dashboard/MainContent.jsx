import React, { useState, useEffect } from 'react';
import TopGainers from './TopGainers';
import TopLosers from './TopLosers';
import logo from '../../assets/logo-full-bg.png';
import rupee from '../../assets/rupee.png';
import { getUserProfile } from '../../api/api';
import { Link } from 'react-router-dom';

function MainContent({ darkMode }) {
  const [selectedMarket, setSelectedMarket] = useState('gainers'); // State to track the selected market
  const [userName, setUserName] = useState(''); // State to store user's name

  const handleToggle = (marketType) => {
    setSelectedMarket(marketType);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token is missing. Please log in again.");
        }
  
        const userProfile = await getUserProfile(); // Fetch user profile from API
        console.log("Fetched User Profile:", userProfile); // Log the response for debugging
  
        // Assuming the API returns { data: { name: "User Name" } }
        setUserName(userProfile.data.name);
      } catch (error) {
        console.error("Failed to fetch user profile:", error.message);
        setUserName('User'); // Fallback to 'User' if there's an error
      }
    };
  
    fetchUserProfile(); // Fetch user profile when component mounts
  }, []); // Empty dependency array to run only once on mount
  

  return (
    <div className={`flex flex-col md:flex-row w-10/12 md:w-10/12 rounded-2xl h-auto font-pop mx-7 md:mx-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} transition-all duration-300`}>
      {/* Portfolio Section */}
      <div className="flex flex-col w-full md:w-3/5 m-6 ml-0 md:m-14 ">
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start mb-2 md:mt-0">
            <div className="text-3xl md:text-5xl font-semibold mt-5">
              Welcome <span className="text-blue-500">{userName || 'User'}!</span>
            </div>
            <div className="h-2 w-44 bg-blue-500 rounded-full"></div> {/* Blue Div below name */}
            <div className=" text-xl mt-10 font-semibold">Today's Quote</div>
            <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
            <div className="text-md md:text-lg mt-2 mb-5">
              Do not save what is left after spending, but spend what is left after saving.
            </div>
          </div>
        </div>

        <div className="text-xl md:text-2xl font-semibold mb-1">My Portfolio</div>
        <div className="h-2 w-20 bg-blue-500 rounded-full mb-6 "></div>
        <div className={`w-full h-60 md:h-72 rounded-3xl relative ${darkMode ? 'bg-gray-900 text-white' : 'bg-grey text-black'} transition-all duration-300`}>
          <div className="font-pop absolute top-0 left-0 p-5">
            <div className=" p-2 relative">
              <div className="text-md md:text-lg font-normal">Portfolio Value</div>
              <div className="text-2xl md:text-3xl">₹ 1,00,000</div>
              {/* Rupee Icon */}
              <img
                src={rupee}
                alt="Rupee"
                className="absolute w-9/12 h-9/12 md:w-10/12 md:h-10/12 opacity-30 -left-8 md:-left-10 -right-1 top-12 md:top-16  transform"
              />
            </div>
          </div>
          <div className="font-pop absolute top-0 right-0 p-5">
            <div className=" p-2">
              <div className="text-md md:text-lg">Returns</div>
              <div className="text-2xl md:text-3xl text-green-600">0.00%</div>
            </div>
          </div>
          <div className="font-pop absolute bottom-0 left-0 p-5">
            <div className=" p-2">
              <div className="text-md md:text-lg">Balance</div>
              <div className="text-2xl md:text-3xl">₹ 1,00,000</div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 pr-7">
            <div className="">
              <img className="w-28 h-28 md:w-44 md:h-44 opacity-30" src={logo} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Market Section */}
      <div className="flex flex-col w-full md:w-2/5 m-14 ml-2 md:mt-16 mt-6">
        <div className="text-xl md:text-2xl font-semibold mb-1">Today's Market</div>
        <div className="h-2 w-20 bg-blue-500 rounded-full mb-6"></div>
        <div className={`w-full h-full rounded-3xl p-5 flex flex-col items-center justify-center mt-0 ${darkMode ? 'bg-gray-900 text-white' : 'bg-grey text-black'} transition-all duration-300`}>
          <div className="flex justify-center mb-4 space-x-4">
            <button
              className={`px-4 py-2 rounded-xl ${
                selectedMarket === 'gainers' ? 'bg-green-500 text-white'
                : darkMode ? 'bg-gray-800 text-white': 'bg-gray-300 text-black'
              } transition-all duration-300`}
              onClick={() => handleToggle('gainers')}
            >
              Top Gainers
            </button>
            <button
              className={`px-5 py-2 rounded-xl ${
                selectedMarket === 'losers' ? 'bg-red-500 text-white'
                : darkMode ? 'bg-gray-800 text-white': 'bg-gray-300 text-black'
              } transition-all duration-300`}
              onClick={() => handleToggle('losers')}
            >
              Top Losers
            </button>
          </div>

          {/* Market Content */}
          <div className="w-full h-full text-center text-md">
            {selectedMarket === 'gainers' ? <TopGainers darkMode={darkMode} /> : <TopLosers darkMode={darkMode} />}
            <Link to="/market"><span className="text-sm md:text-md">See More &gt;</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
