import React, { useContext, useState, useEffect } from 'react';
import Header from '../dashboard/Header';
import Vheader from '../dashboard/Vheader';
import { Helmet } from 'react-helmet';
import ThemeContext from '../../context/ThemeContext.jsx';
import { getUserName } from '../../api/api';
import { getAvatar } from '../../api/api';


function Wallet() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [userName, setUserName] = useState('');
    const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token is missing. Please log in again.");
        }

        const name = await getUserName();
        console.log("Fetched User Profile:", name);
        setUserName(name.data.name);
      } catch (error) {
        console.error("Failed to fetch user name:", error.message);
        setUserName('User');
      }
    };

    const fetchAvatar = async () => {
          try {
            const data = await getAvatar();  // Call the API to get the avatar
            setAvatar(data.avatar);  // Set the avatar URL to state (make sure your API returns `avatar`)
          } catch (err) {
            setError(err.message);  // Handle error
          }
        };
    
    fetchAvatar();
    fetchUserName();
  }, []);

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
        className={`${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-white text-black"
        } min-h-screen transition-all duration-300`}
      >
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex flex-col font-pop md:flex-row">
          <Vheader darkMode={darkMode} />
          <main className="flex-grow p-4 md:p-6 m-4 pb-24 md:m-10">
            <h1 className="text-3xl md:text-4xl font-bold">Wallet</h1>
            <div className="h-2 w-20 md:w-32 bg-blue-500 rounded-full mb-6"></div>

            {/* Profile Section */}
            <div
              className={`rounded-lg p-4 mb-6 transition-colors duration-300 ${
                darkMode ? "bg-gray-800" : "bg-gray-100 shadow"
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div
                    className={`transition-all duration-300 rounded-full ${
                      darkMode ? "bg-blue-500 text-gray-100" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <img className=" w-10 h-10 md:w-16 md:h-16 cursor-pointer rounded-full overflow-hidden" src={avatar || "https://via.placeholder.com/120x120.png?text=No+Avatar"} alt="" />
                  </div>
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
            {[
  { label: 'Bonus', value: walletData.bonus, button: 'Redeem', color: 'purple' },
  { label: 'Deposit', value: walletData.deposit, button: 'Add Money', color: 'blue' },
  { label: 'Cash', value: walletData.cash, button: 'Verify to Withdraw', color: 'green' },
  { label: 'Lifetime Earnings', value: walletData.lifetimeEarnings, button: null, color: null },
].map((item, index) => (
  <div
    key={index}
    className={`p-4 rounded-lg transition-colors duration-300 ${
      darkMode ? "bg-gray-700" : "bg-gray-100 shadow"
    }`}
  >
    <h3 className="text-md md:text-xl font-semibold">{item.label}</h3>
    <p className="text-lg md:text-2xl my-2 font-bold">₹ {item.value}</p>
    {item.button && (
      <button
        className={`text-xs md:text-lg px-4 py-2 mt-2 rounded transition-colors duration-300
          ${item.button === 'Redeem' 
            ? darkMode 
              ? "bg-purple-500 text-white hover:bg-purple-400" 
              : "bg-purple-600 text-white hover:bg-purple-500"
            : item.button === 'Add Money'
            ? darkMode 
              ? "bg-blue-500 text-white hover:bg-blue-400"
              : "bg-blue-600 text-white hover:bg-blue-500"
            : item.button === 'Verify to Withdraw'
            ? darkMode 
              ? "bg-green-500 text-white hover:bg-green-400"
              : "bg-green-600 text-white hover:bg-green-500"
            : ""
          }
        `}
      >
        {item.button}
      </button>
    )}
  </div>
))}

            </div>

            {/* Transaction Filter Tabs */}
            <div className="flex flex-wrap items-center space-x-2 gap-2 mb-4">
              {['All', 'Deposit', 'Cash', 'Bonus'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs md:text-lg rounded transition-colors duration-300 ${
                    activeTab === tab
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-black"
                  } hover:bg-blue-400`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Transactions List */}
            <div
              className={`rounded-lg p-4 transition-colors duration-300 ${
                darkMode ? "bg-gray-800" : "bg-white shadow"
              }`}
            >
              <h2 className="text-lg md:text-2xl font-semibold mb-4">Transactions</h2>
              <div className="space-y-4 overflow-y-auto max-h-80">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg transition-colors duration-300 ${
                      darkMode ? "bg-gray-900 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-300"
                    }`}
                  >
                    <div>
                      <h3 className="text-sm md:text-lg font-bold">{transaction.name}</h3>
                      <p className="text-xs md:text-sm text-gray-400">{transaction.date}</p>
                    </div>
                    <div
                      className={`text-sm md:text-lg font-bold mt-2 md:mt-0 ${
                        transaction.amount > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}{transaction.amount}
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
