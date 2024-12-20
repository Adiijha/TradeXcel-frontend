import React, { useEffect, useState } from "react";
import Stock from "./Stocks"; // Your Stock component that handles chart rendering
import { getStockData } from "../../api/api";

function TopGainers({ darkMode }) {
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // List of top gainers with valid symbols
      const stockList = [
        { shortName: "TCS", fullName: "Tata Consultancy Services", symbol: "TCS.NS", percentageChange: "8.25", todayChange: "125.23"},
        { shortName: "INFY", fullName: "Infosys", symbol: "INFY.NS", percentageChange: "5.47", todayChange: "25.31"},
        { shortName: "RELIANCE", fullName: "Reliance Industries", symbol: "RELIANCE.NS", percentageChange: "6.12", todayChange: "36.12"},
        { shortName: "HDFC", fullName: "HDFC Bank", symbol: "HDFCBANK.NS", percentageChange: "2.14", todayChange: "78.95"},
        { shortName: "BAJAJ", fullName: "Bajaj Finance", symbol: "BAJFINANCE.NS", percentageChange: "9.41", todayChange: "12.34"},
      ];

      const updatedGainers = await Promise.all(
        stockList.map(async (stock) => {
          const data = await getStockData(stock.symbol);

          // Use fallback values if data fetching fails
          const stockData = data || {
            currentPrice: 1000,
            // percentageChange: `${generateRandomChange().percentageChange}%`,
            // todayChange: `₹ ${generateRandomChange().todayChange}`,
            stockPrices: Array(30).fill(1000),
          };

          return {
            ...stock,
            price: `₹ ${stockData.currentPrice.toFixed(2)}`,
            // percentageChange: stockData.percentageChange,
            // todayChange: stockData.todayChange,
            stockPrices: stockData.stockPrices, // Ensure stockPrices are passed
            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
          };
        })
      );

      setGainers(updatedGainers); // Set the updated stock data
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="text-xl font-medium mb-4">Today's Gainers</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        gainers.map((stock, index) => (
          <Stock
            key={index}
            shortName={stock.shortName}
            fullName={stock.fullName}
            price={stock.price}
            stockPrices={stock.stockPrices} // Pass stockPrices here
            percentageChange={stock.percentageChange}
            todayChange={stock.todayChange}
            labels={stock.labels} // Pass labels here as well
            darkMode={darkMode}
          />
        ))
      )}
    </div>
  );
}

export default TopGainers;
