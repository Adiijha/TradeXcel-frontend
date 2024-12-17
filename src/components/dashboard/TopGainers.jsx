import React, { useEffect, useState } from "react";
import Stock from "./Stocks"; // Your Stock component that handles chart rendering

function TopGainers({ darkMode }) {
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);

 

  // Fetch stock data from the backend
  const fetchYahooFinanceData = async (symbol) => {
    const url = `http://localhost:5000/api/v1/finance/stock/${symbol}`; // Backend URL
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Check if data is valid
      if (data.status !== 200) {
        console.error(`Error fetching stock data: ${data.message}`);
        return null;
      }

      const { currentPrice, stockPrices } = data.data;

      // Override percentageChange and todayChange with random values

      return {
        currentPrice,
        stockPrices: stockPrices || Array.from({ length: 30 }, () => currentPrice), // Use actual or fallback stock prices
      };
    } catch (error) {
      console.error(`Error fetching data from backend: ${error.message}`);
      return null;
    }
  };

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
          const data = await fetchYahooFinanceData(stock.symbol);

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
