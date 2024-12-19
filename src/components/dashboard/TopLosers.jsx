import React, { useEffect, useState } from 'react';
import Stock from './Stocks'; // Your Stock component that handles chart rendering

// Function to fetch stock data from the backend
const fetchStockData = async (symbol) => {

  const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Backend URL
  const url = `${BASE_URL}/api/v1/finance/stock/${symbol}`; // Backend URL
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if data is valid
    if (data.status !== 200) {
      console.error(`Error fetching stock data: ${data.message}`);
      return null;
    }

    const { currentPrice, stockPrices } = data.data;

    return {
      currentPrice,
      // percentageChange: percentageChange === "NA" ? "N/A" : percentageChange,
      // todayChange: todayChange === "NA" ? "N/A" : todayChange,
      stockPrices: stockPrices || Array.from({ length: 30 }, () => currentPrice), // Use actual data or fallback
    };
  } catch (error) {
    console.error(`Error fetching data from backend: ${error.message}`);
    return null;
  }
};

function TopLosers({ darkMode }) {
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Updated list of top losers with valid symbols
      const stockList = [
        { shortName: "ITC", fullName: "ITC Ltd", symbol: "ITC.NS", percentageChange: "-4.21", todayChange: "23.32" },
        { shortName: "AXISBANK", fullName: "Axis Bank", symbol: "AXISBANK.NS", percentageChange: "-2.23", todayChange: "145.74" },
        { shortName: "HINDALCO", fullName: "Hindalco Industries", symbol: "HINDALCO.NS", percentageChange: "-6.31", todayChange: "52.14" },
        { shortName: "WIPRO", fullName: "Wipro", symbol: "WIPRO.NS", percentageChange: "-9.54", todayChange: "85.95" },
        { shortName: "POWERGRID", fullName: "Power Grid Corporation", symbol: "POWERGRID.NS", percentageChange: "-8.41", todayChange: "42.32" },
      ];

      const updatedLosers = await Promise.all(
        stockList.map(async (stock) => {
          const data = await fetchStockData(stock.symbol);

          // Use fallback values if data fetching fails
          const stockData = data || { 
            currentPrice: 1000, 
            percentageChange: "N/A", 
            todayChange: "N/A", 
            stockPrices: Array(30).fill(1000) 
          };

          return {
            ...stock,
            price: `₹ ${stockData.currentPrice.toFixed(2)}`,
            // percentageChange: stockData.percentageChange,
            // todayChange: stockData.todayChange,
            stockPrices: stockData.stockPrices, // Pass the actual stockPrices here
            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`), // Labels for 30 days
          };
        })
      );

      setLosers(updatedLosers);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="text-xl font-medium mb-4">Today's Losers</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        losers.map((stock, index) => (
          <Stock 
            key={index} 
            shortName={stock.shortName} 
            fullName={stock.fullName} 
            price={stock.price} 
            stockPrices={stock.stockPrices} 
            percentageChange={stock.percentageChange} 
            todayChange={stock.todayChange}
            labels={stock.labels} // Pass labels here for chart X-axis
            darkMode={darkMode}
          />
        ))
      )}
    </div>
  );
}

export default TopLosers;
