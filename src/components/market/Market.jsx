import React, { useState, useEffect, useContext } from "react";
import Header from "../dashboard/Header";
import Vheader from "../dashboard/Vheader";
import Stocks from "../dashboard/Stocks";
import ThemeContext from "../../context/ThemeContext.jsx";


function Market() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [stocks, setStocks] = useState([
    { name: "AAPL", fullName: "Apple Inc.", price: 150, quantity: 0, todayChange: 2, percentageChange: 1.34, stockPrices: [148, 149, 150, 151, 150, 150], labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    { name: "GOOGL", fullName: "Alphabet Inc.", price: 2800, quantity: 0, todayChange: -15, percentageChange: -0.53, stockPrices: [2800, 2810, 2805, 2803, 2795, 2800], labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    { name: "AMZN", fullName: "Amazon.com, Inc.", price: 3450, quantity: 0, todayChange: 20, percentageChange: 0.58, stockPrices: [3440, 3450, 3455, 3445, 3448, 3450], labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    { name: "TSLA", fullName: "Tesla, Inc.", price: 900, quantity: 0, todayChange: -5, percentageChange: -0.55, stockPrices: [905, 910, 900, 895, 900, 900], labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
  ]);

  const [balance, setBalance] = useState(10000);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => ({
          ...stock,
          price: Math.max(1, stock.price + (Math.random() * 20 - 10).toFixed(2)),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleBuy = (stockName) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) => {
        if (stock.name === stockName && balance >= stock.price) {
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
        if (stock.name === stockName && stock.quantity > 0) {
          setBalance((prevBalance) => prevBalance + stock.price);
          return { ...stock, quantity: stock.quantity - 1 };
        }
        return stock;
      })
    );
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-800 text-white min-h-screen transition-all duration-300"
          : "bg-white text-black min-h-screen transition-all duration-300"
      }
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex">
        <Vheader darkMode={darkMode} />
        <div className="p-6 flex-1">
          <h1 className="text-2xl font-bold mb-4">Trade Market</h1>
          <p className="mb-4">Balance: ${balance.toFixed(2)}</p>

          {selectedStock ? (
            <div className="mb-6">
              <button
                onClick={() => setSelectedStock(null)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Back to Stocks List
              </button>
              <Stocks
                shortName={selectedStock.name}
                fullName={selectedStock.fullName}
                stockPrices={selectedStock.stockPrices}
                labels={selectedStock.labels}
                percentageChange={selectedStock.percentageChange}
                price={selectedStock.price}
                todayChange={selectedStock.todayChange}
                darkMode={darkMode}
              />
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 border-r">Stock</th>
                    <th className="p-2 border-r">Price</th>
                    <th className="p-2 border-r">Quantity</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock) => (
                    <tr key={stock.name} className="border-b">
                      <td
                        className="p-2 border-r text-center cursor-pointer"
                        onClick={() => setSelectedStock(stock)}
                      >
                        {stock.name}
                      </td>
                      <td className="p-2 border-r text-center">${stock.price.toFixed(2)}</td>
                      <td className="p-2 border-r text-center">{stock.quantity}</td>
                      <td className="p-2 text-center">
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                          onClick={() => handleBuy(stock.name)}
                        >
                          Buy
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded"
                          onClick={() => handleSell(stock.name)}
                        >
                          Sell
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Market;
