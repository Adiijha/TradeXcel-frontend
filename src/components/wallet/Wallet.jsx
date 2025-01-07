import React, { useContext, useState, useEffect } from 'react';
import Header from '../dashboard/Header';
import Vheader from '../dashboard/Vheader';
import { Helmet } from 'react-helmet';
import ThemeContext from '../../context/ThemeContext.jsx';
import { getUserProfile } from '../../api/api';

function Wallet() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [userName, setUserName] = useState(''); // State to store user's name

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


  const [walletData, setWalletData] = useState({
    bonus: 0,
    deposit: 0,
    cash: 682,
    lifetimeEarnings: 698,
    transactions: [
      { id: 1, name: 'Bonus Amount Expired', amount: -16, type: 'Bonus', date: '01 Aug 2024 00:04' },
      { id: 2, name: 'Winnings of Wednesday Trident', amount: 8, type: 'Bonus', date: '12 Jun 2024 15:39' },
      { id: 3, name: 'Winnings of Tuesday Mania', amount: 8, type: 'Cash', date: '11 Jun 2024 12:39' },
      { id: 4, name: 'Winnings of Friday Trident', amount: 8, type: 'Bonus', date: '07 Jun 2024 15:39' },
    ],
  });

  const [activeTab, setActiveTab] = useState('All');

  const filteredTransactions =
    activeTab === 'All'
      ? walletData.transactions
      : walletData.transactions.filter((t) => t.type === activeTab);

  return (
    <>
      <Helmet>
        <title>Wallet</title>
      </Helmet>
      <div
        className={
          darkMode
            ? "bg-gray-800 text-white min-h-screen transition-all duration-300"
            : "bg-white text-black min-h-screen transition-all duration-300"
        }
      >
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex flex-col font-pop md:flex-row">
          <Vheader darkMode={darkMode} />
          <main className="flex-grow p-4 md:p-6 m-4 pb-24 md:m-10">
            <h1 className="text-3xl md:text-4xl font-bold">Wallet</h1>
            <div className="h-2 w-20 md:w-32 bg-blue-500 rounded-full mb-6"></div>

            {/* Profile Section */}
            <div className="bg-gray-900 text-white rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">A</div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold">{userName || 'User'}</h2>
                    <p className="text-sm text-red-400">Oops! Your KYC verification failed.</p>
                  </div>
                </div>
                <button className="bg-red-500 text-xs md:text-lg text-white px-4 py-2 rounded hover:bg-red-600">Retry KYC</button>
              </div>
            </div>

            {/* Wallet Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-700 text-white p-4 rounded-lg">
                <h3 className="text-md md:text-xl font-semibold">Bonus</h3>
                <p className="text-lg md:text-2xl my-2 font-bold">₹ {walletData.bonus}</p>
                <button className="bg-purple-500 text-white text-xs md:text-lg px-4 py-2 mt-2 rounded hover:bg-purple-600">Redeem</button>
              </div>
              <div className="bg-gray-700 text-white p-4 rounded-lg">
                <h3 className="text-md md:text-xl font-semibold">Deposit</h3>
                <p className="text-lg md:text-2xl my-2 font-bold">₹ {walletData.deposit}</p>
                <button className="bg-blue-500 text-white text-xs md:text-lg px-4 py-2 mt-2 rounded hover:bg-blue-600">Add Money</button>
              </div>
              <div className="bg-gray-700 text-white p-4 rounded-lg">
                <h3 className="text-md md:text-xl font-semibold">Cash</h3>
                <p className="text-lg md:text-2xl my-2 font-bold">₹ {walletData.cash}</p>
                <button className="bg-green-500 text-white text-xs md:text-lg px-4 py-2 mt-2 rounded hover:bg-green-600">Verify to Withdraw</button>
              </div>
              <div className="bg-gray-700 text-white p-4 rounded-lg">
                <h3 className="text-md md:text-xl font-semibold">Lifetime Earnings</h3>
                <p className="text-lg md:text-2xl my-2 font-bold">₹ {walletData.lifetimeEarnings}</p>
              </div>
            </div>

            {/* Transaction Filter Tabs */}
            <div className="flex flex-wrap items-center space-x-2 gap-2 mb-4">
              {['All', 'Deposit', 'Cash', 'Bonus'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs md:text-lg  rounded ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  } hover:bg-blue-400 transition`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Transactions List */}
            <div className="bg-gray-800 text-white rounded-lg p-0 md:p-4">
              <h2 className="text-lg md:text-2xl font-semibold mb-4">Transactions</h2>
              <div className="space-y-4 overflow-y-auto max-h-80">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-900 p-4 rounded-lg hover:bg-gray-700 transition"
                  >
                    <div>
                      <h3 className="text-sm md:text-lg font-bold">{transaction.name}</h3>
                      <p className="text-xs md:text-sm text-gray-400">{transaction.date}</p>
                    </div>
                    <div
                      className={`text-sm md:text-lg font-bold mt-2 md:mt-0 ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Wallet;
