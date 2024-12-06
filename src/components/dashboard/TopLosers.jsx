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

function TopLosers({ darkMode }) {
  // Real data for top losers with short form, full name, random stock price data for 30 days, and percentage change
  const losers = [
    { 
      shortName: 'BHARTI', 
      fullName: 'Bharti Airtel', 
      price: '₹ 500', 
      stockPrices: generateRandomStockData(500), // Random stock prices generated based on initial value
      percentageChange: -2.321,
      todayChange: -10.65,
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`), // X-axis labels for 30 days
    },
    { 
      shortName: 'INDUSIND', 
      fullName: 'IndusInd Bank', 
      price: '₹ 700', 
      stockPrices: generateRandomStockData(700),
      percentageChange: -3.534,
      todayChange: -15,
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    },
    { 
      shortName: 'HINDALCO', 
      fullName: 'Hindalco Industries', 
      price: '₹ 600', 
      stockPrices: generateRandomStockData(600),
      percentageChange: -1.887,
      todayChange: -8.31,
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    },
    { 
      shortName: 'WIPRO', 
      fullName: 'Wipro', 
      price: '₹ 800', 
      stockPrices: generateRandomStockData(800),
      percentageChange: -4.245,
      todayChange: -20.45,
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    },
    { 
      shortName: 'POWERGRID', 
      fullName: 'Power Grid Corporation', 
      price: '₹ 1,200', 
      stockPrices: generateRandomStockData(1200),
      percentageChange: -5.121,
      todayChange: -25.76,
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    },
  ];

  return (
    <div>
      <div className="text-xl font-medium mb-4">Today's Losers</div>
      {losers.map((stock, index) => (
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

export default TopLosers;
