import React from 'react';
import Stock from './Stocks';

// Function to generate random stock prices for 30 days
const generateRandomStockData = (initialPrice) => {
  let prices = [];
  for (let i = 0; i < 30; i++) {
    initialPrice = parseFloat((initialPrice + (Math.random() * 80 - 40)).toFixed(2)); // Random fluctuation between -40 and +40
    prices.push(initialPrice);
  }
  return prices;
};

function TopGainers({darkMode}) {
  // Real data for top gainers with short form, full name, random stock price data for 30 days, and percentage change
  const gainers = [
    { 
      shortName: 'TCS', 
      fullName: 'Tata Consultancy Services', 
      price: '₹ 1,500', 
      stockPrices: generateRandomStockData(1500), // Random stock prices generated based on initial value
      percentageChange: +5.323,
      todayChange: +10.21,
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`), // X-axis labels for 30 days
    },
    { 
      shortName: 'INFY', 
      fullName: 'Infosys', 
      price: '₹ 2,200', 
      stockPrices: generateRandomStockData(2200),
      percentageChange: +3.134,
      todayChange: +15.98,
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    },
    { 
      shortName: 'RELIANCE', 
      fullName: 'Reliance Industries', 
      price: '₹ 3,000', 
      stockPrices: generateRandomStockData(3000),
      percentageChange: +7.565,
      todayChange: +20.24,
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    },
    { 
      shortName: 'HDFC', 
      fullName: 'HDFC Bank', 
      price: '₹ 1,100', 
      stockPrices: generateRandomStockData(1100),
      percentageChange: +2.487,
      todayChange: +8.54,
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    },
    { 
      shortName: 'BAJAJ', 
      fullName: 'Bajaj Finance', 
      price: '₹ 4,500', 
      stockPrices: generateRandomStockData(4500),
      percentageChange: +6.812,
      todayChange: +25.12,
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    },
  ];

  return (
    <div>
      <div className="text-xl font-medium mb-4">Today's Gainers</div>
      {gainers.map((stock, index) => (
        <Stock 
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
      ))}
    </div>
  );
}

export default TopGainers;
