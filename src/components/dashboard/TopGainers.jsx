import React, { useEffect, useState } from "react";
import Stock from "./Stocks"; // Your Stock component that handles chart rendering
import { getStockData } from "../../api/api";

function TopGainers({ darkMode }) {
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const stockList = [
        { shortName: "TCS", fullName: "Tata Consultancy Services", symbol: "TCS.NS" },
        { shortName: "INFY", fullName: "Infosys", symbol: "INFY.NS" },
        { shortName: "RELIANCE", fullName: "Reliance Industries", symbol: "RELIANCE.NS" },
        { shortName: "HDFC", fullName: "HDFC Bank", symbol: "HDFCBANK.NS" },
        { shortName: "BAJAJ", fullName: "Bajaj Finance", symbol: "BAJFINANCE.NS" },
      ];

      try {
        const updatedGainers = await Promise.all(
          stockList.map(async (stock) => {
            try {
              const data = await getStockData(stock.symbol);

              return {
                ...stock,
                price: `₹ ${data.currentPrice?.toFixed(2) || "N/A"}`,
                percentageChange: `${data.percentageChange || 0}%`, // Format as percentage
                todayChange: `${data.todayChange || 0}`, // Format as ₹ with 2 decimal places
                stockPrices: data.stockPrices || Array(30).fill(0),
                labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
              };
            } catch (error) {
              console.error(`Error fetching data for ${stock.symbol}:`, error);
              return {
                ...stock,
                price: "₹ N/A",
                percentageChange: "N/A%",
                todayChange: "₹ N/A",
                stockPrices: Array(30).fill(0),
                labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
              };
            }
          })
        );

        setGainers(updatedGainers);
      } catch (error) {
        console.error("Error fetching gainers:", error);
      } finally {
        setLoading(false);
      }
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
            percentageChange={stock.percentageChange}
            todayChange={stock.todayChange}
            stockPrices={stock.stockPrices}
            labels={stock.labels}
            darkMode={darkMode}
          />
        ))
      )}
    </div>
  );
}

export default TopGainers;
