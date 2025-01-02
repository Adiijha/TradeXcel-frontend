import React, { useState, useEffect, useContext } from "react";
import Header from "../dashboard/Header";
import Vheader from "../dashboard/Vheader";
import Stock from "../market/Stocks";
import ThemeContext from "../../context/ThemeContext.jsx";
import { getStockData } from "../../api/api";
import AllStocks from "./AllStocks.jsx";
import stockList from "./StockData.json";

function Market() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [balance, setBalance] = useState(100000);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query

  useEffect(() => {
    const fetchData = async () => {
      const updatedStocks = await Promise.all(
        stockList.map(async (stock) => {
          const data = await getStockData(stock.symbol);

          const stockData = data || {
            currentPrice: 1000,
            percentageChange: "N/A", 
            todayChange: "N/A", 
            stockPrices: Array(30).fill(1000),
          };

          return {
            ...stock,
            price: stockData.currentPrice,
            percentageChange: `${stockData.percentageChange || 0}%`, // Format as percentage
            todayChange: `${stockData.todayChange || 0}`, // Format as ₹ with 2 decimal places
            stockPrices: stockData.stockPrices,
            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
            quantity: 0, // Initialize quantity
          };
        })
      );

      setStocks(updatedStocks);
    };

    fetchData();
  }, []);

  const handleBuy = (stockName) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) => {
        if (stock.shortName === stockName && balance >= stock.price) {
          setBalance((prevBalance) => prevBalance - stock.price);
          return { ...stock, quantity: stock.quantity + 1 };
        }
        return stock;
      })
    );
  };

  const handleSell = (stockName) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) => {
        if (stock.shortName === stockName && stock.quantity > 0) {
          setBalance((prevBalance) => prevBalance + stock.price);
          return { ...stock, quantity: stock.quantity - 1 };
        }
        return stock;
      })
    );
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } min-h-screen transition-all duration-300 font-pop`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-col md:flex-row">
        <Vheader darkMode={darkMode} />
        <div className="p-6 flex-1 mx-0 mb-20 md:mb-0 m-2 lg:m-10">
            <h1 className="text-3xl md:text-4xl font-bold">Market</h1>
          <div className="h-2 w-28 bg-blue-500 rounded-full mb-6"></div>
          <div className="flex justify-between items-center mt-6">
          <p className="mb-4 text-lg md:text-2xl">Balance: ₹ {balance.toFixed(2)}</p>
          {selectedStock && (
              <button
                onClick={() => setSelectedStock(null)}
                className="px-4 py-2 text-xs md:text-lg bg-blue-500 text-white rounded transition-all duration-300"
              >
                Back to Stocks
              </button>
            )}
          </div>

          {selectedStock ? (
            <div className="mb-6">
              <Stock
                shortName={selectedStock.shortName}
                fullName={selectedStock.fullName}
                price={selectedStock.price}
                stockPrices={selectedStock.stockPrices}
                percentageChange={selectedStock.percentageChange}
                todayChange={selectedStock.todayChange}
                labels={selectedStock.labels}
                darkMode={darkMode}
              />
              <div className="flex flex-col sm:flex-row mt-6 gap-2">
                <button
                  className={`${
                    darkMode ? "bg-green-600" : "bg-green-500"
                  } text-white px-7 py-2 rounded mr-2 transition-all duration-300 w-full sm:w-auto`}
                  onClick={() => handleBuy(selectedStock.shortName)}
                >
                  Buy
                </button>
                <button
                  className={`${
                    darkMode ? "bg-red-600" : "bg-red-500"
                  } text-white px-7 py-2 mr-2 rounded transition-all duration-300 w-full sm:w-auto`}
                  onClick={() => handleSell(selectedStock.shortName)}
                >
                  Sell
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`${
                darkMode ? "bg-gray-900" : "bg-gray-100"
              } w-full sm:w-3/5 p-5 lg:p-8 rounded-xl transition-all duration-300`}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                } w-full mb-6 p-2 border-2 rounded-lg transition-all duration-300`}
                placeholder="Search for a stock..."
              />
              <div
                className="flex flex-col overflow-y-auto scrollable-area"
                style={{ maxHeight: "500px" }} // Set max-height for the scrollable area
              >
                <AllStocks
                  setSelectedStock={setSelectedStock}
                  darkMode={darkMode}
                  filteredStocks={filteredStocks}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Market;
