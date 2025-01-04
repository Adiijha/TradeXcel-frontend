import React from 'react';
import Header from '../dashboard/Header';
import Vheader from '../dashboard/Vheader';
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext.jsx";

function Portfolio() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  // Dummy data for the portfolio (Indian stocks in INR)
  const portfolioData = {
    investedAmount: 0, // Example value in INR
    cashBalance: 100000, // Example value in INR
    totalPortfolioValue: 100000, // Example value in INR
    stockHoldings: [
      { symbol: "TCS", shares: 10, value: 35000 },
      { symbol: "RELIANCE", shares: 15, value: 42000 },
      { symbol: "HDFC", shares: 20, value: 30000 },
      { symbol: "INFY", shares: 12, value: 45000 },
    ],
  };

  return (
    <>
      <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} font-pop mb-16 md:mb-0  transition-all duration-300`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex">
          <Vheader darkMode={darkMode} />
          <main className="flex-1 p-6 m-0 md:m-10">
            <h1 className="text-3xl md:text-4xl font-bold">Your Portfolio</h1>
            <div className="h-2 w-44 bg-blue-500 rounded-full mb-6"></div>

            {/* Portfolio Summary Section */}
            <section className={`p-6 rounded-lg w-full shadow-lg ${darkMode ? "bg-gray-900" : "bg-gray-50"} transition-all duration-300`}>
              <h2 className="text-xl md:text-2xl font-semibold mb-6">Portfolio Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className={`p-3 md:p-5 rounded-lg border-2 ${
                    darkMode ? "border-blue-500 bg-gray-700" : "border-blue-300 bg-white"
                  } shadow-lg hover:scale-105 transform transition-all duration-300`}
                >
                  <h3 className="text-md md:text-lg font-medium mb-2">Total Portfolio Value</h3>
                  <p className="text-2xl md:text-3xl font-bold">₹{portfolioData.totalPortfolioValue.toLocaleString('en-IN')}</p>
                </div>
                <div
                  className={`p-3 md:p-5 rounded-lg border-2 ${
                    darkMode ? "border-blue-500 bg-gray-700" : "border-blue-300 bg-white"
                  } shadow-lg hover:scale-105 transform transition-all duration-300`}
                >
                  <h3 className="text-md md:text-lg font-medium mb-2">Invested Amount</h3>
                  <p className="text-2xl md:text-3xl font-bold">₹{portfolioData.investedAmount.toLocaleString('en-IN')}</p>
                </div>
                <div
                  className={`p-3 md:p-5 rounded-lg border-2 ${
                    darkMode ? "border-blue-500 bg-gray-700" : "border-blue-300 bg-white"
                  } shadow-lg hover:scale-105 transform transition-all duration-300`}
                >
                  <h3 className="text-md md:text-lg font-medium mb-2">Cash Balance</h3>
                  <p className="text-2xl md:text-3xl font-bold ">₹{portfolioData.cashBalance.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </section>

            {/* Stock Holdings Section */}
            <section className={`mt-8 w-full p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-900" : "bg-gray-50"} transition-all duration-300`}>
              <h2 className="text-xl md:text-2xl font-semibold mb-6">Stock Holdings</h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-gray-700">
                    <th className="py-3 px-4 text-sm md:text-lg font-medium">Stock Symbol</th>
                    <th className="py-3 px-4 text-sm md:text-lg font-medium">Shares</th>
                    <th className="py-3 px-4 text-sm md:text-lg font-medium">Value (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioData.stockHoldings.map((stock, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        darkMode ? "dark:border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-100"
                      } `}
                    >
                      <td className="py-3 px-4 text-xs md:text-lg font-medium">{stock.symbol}</td>
                      <td className="py-3 px-4 text-xs md:text-lg ">{stock.shares}</td>
                      <td className="py-3 px-4 text-xs md:text-lg ">₹{stock.value.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
