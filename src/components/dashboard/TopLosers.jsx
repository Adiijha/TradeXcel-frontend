import React, { useEffect, useState } from 'react';
import Stock from './Stocks'; // Your Stock component that handles chart rendering
import { getStockData } from '../../api/api';

function TopLosers({ darkMode }) {
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Updated list of top losers with valid symbols
      const stockList = [
        {
          "shortName": "CANBK",
          "fullName": "Canara Bank",
          "symbol": "CANBK.NS"
        },
        {
          "shortName": "ADANIPOWER",
          "fullName": "Adani Power",
          "symbol": "ADANIPOWER.NS"
        },
        {
          "shortName": "SIEMENS",
          "fullName": "Siemens Limited",
          "symbol": "SIEMENS.NS"
        },
        {
          "shortName": "BEL",
          "fullName": "Bharat Electronics Limited",
          "symbol": "BEL.NS"
        },
        {
          "shortName": "BPCL",
          "fullName": "Bharat Petroleum Corporation Limited",
          "symbol": "BPCL.NS"
        }
      ];

      const updatedLosers = await Promise.all(
        stockList.map(async (stock) => {
          const data = await getStockData(stock.symbol);

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
            percentageChange: `${data.percentageChange || 0}%`, // Format as percentage
            todayChange: `${data.todayChange || 0}`, // Format as ₹ with 2 decimal places
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
