import React, { useEffect, useState } from "react";
import ShortStock from "../dashboard/Stocks"; // Your Stock component that handles chart rendering
import { getStockData } from "../../api/api";
import stockList from "./StockData.json";

function AllStocks({ setSelectedStock, darkMode, filteredStocks }) {
  const [allstocks, setAllStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const updatedStocks = await Promise.all(
        stockList.map(async (stock) => {
          const data = await getStockData(stock.symbol);

          // Use fallback values if data fetching fails
          const stockData = data || {
            currentPrice: 1000,
            percentageChange: "N/A", 
            todayChange: "N/A", 
            stockPrices: Array(30).fill(1000),
          };

          return {
            ...stock,
            price: `₹ ${stockData.currentPrice.toFixed(2)}`,
            percentageChange: `${stockData.percentageChange || 0}%`, // Format as percentage
            todayChange: `${stockData.todayChange || 0}`, // Format as ₹ with 2 decimal places
            stockPrices: stockData.stockPrices,
            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
          };
        })
      );

      setAllStocks(updatedStocks); // Set the updated stock data
      setLoading(false);
    };

    fetchData();
  }, []);

  const stocksToDisplay = filteredStocks || allstocks;

  return (
    <div className={`transition-all duration-300`}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        stocksToDisplay.map((stock, index) => (
          <div key={index} className="cursor-pointer" onClick={() => setSelectedStock(stock)}>
            <ShortStock
              key={index}
              shortName={stock.shortName}
              fullName={stock.fullName}
              price={stock.price}
              stockPrices={stock.stockPrices}
              percentageChange={stock.percentageChange}
              todayChange={stock.todayChange}
              labels={stock.labels}
              darkMode={darkMode}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default AllStocks;
