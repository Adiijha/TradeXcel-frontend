import React, { useRef, useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, LineElement, LineController, PointElement, Tooltip, Filler } from 'chart.js';

// Register necessary components and Filler plugin
Chart.register(CategoryScale, LinearScale, LineElement, LineController, PointElement, Tooltip, Filler);

function Stocks({ shortName, fullName, stockPrices, labels, percentageChange, price, todayChange, darkMode }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Determine if today's change is positive or negative
  const isPositive = parseFloat(todayChange) >= 0;

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart instance (if any) before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a gradient color for the line with a more dynamic effect
    const gradientLine = ctx.createLinearGradient(0, 0, 0, 400);
    gradientLine.addColorStop(0, isPositive ? 'limegreen' : 'darkred'); // Green for positive, red for negative
    gradientLine.addColorStop(1, isPositive ? 'forestgreen' : 'firebrick'); // Darker green for positive, darker red for negative

    // Create a light color gradient for the area below the line with a smoother transition
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, isPositive ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)"); // Change based on positivity or negativity
    gradientFill.addColorStop(1, isPositive ? "rgba(0, 255, 0, 0.1)" : "rgba(255, 0, 0, 0.1)"); // Fading effect with transparency

    // Create a new chart with sharp edges and no fill
    chartInstance.current = new Chart(ctx, {
      type: 'line', // Line chart to simulate stock price trend
      data: {
        labels: labels, // X-axis labels (days of the week)
        datasets: [
          {
            label: shortName, // Stock name (short form)
            data: stockPrices, // Stock price data
            borderColor: gradientLine, // Use gradient colors for the line
            backgroundColor: gradientFill, // Light color fill below the line
            tension: 0, // Sharp edges (no smoothing)
            borderWidth: 2,
            pointRadius: 1, // Show points
            pointBackgroundColor: darkMode ? "white" : "black", // Point color
            pointBorderWidth: 2,
            fill: 'origin', // Ensure that the area under the line is filled
            hoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide legend
          },
          tooltip: {
            enabled: true, // Enable tooltips
            mode: 'nearest', // Display tooltip for the nearest point
            intersect: false, // Allow tooltip when hovering over the line
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)', // Tooltip background color
            titleColor: darkMode ? 'black' : 'white', // Tooltip title color
            bodyColor: darkMode ? 'black' : 'white', // Tooltip body color
            callbacks: {
              label: function (tooltipItem) {
                return `₹${tooltipItem.raw.toFixed(2)}`; // Format tooltip value as currency
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false, // Don't start the Y-axis from 0 for a more realistic stock chart
            ticks: {
              display: false, // Hide Y-axis ticks
            },
            grid: {
              drawOnChartArea: false,
              display: false,
            },
            border: {
              width: 0,
            },
          },
          x: {
            grid: {
              drawOnChartArea: false,
              display: false,
            },
            ticks: {
              display: false, // Hide X-axis ticks
            },
            border: {
              width: 0,
            },
          },
        },
      },
    });

    // Cleanup: Destroy the chart instance when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [percentageChange, shortName, stockPrices, labels, darkMode, todayChange]); // Re-run this effect when any relevant prop changes

  // Format today's change (string) with correct sign (+ or -)
  const formattedTodayChange = todayChange && todayChange !== 'NA' ? `${todayChange}` : 'NA';

  // Format percentage change as a number without + or - (remove the string formatting)
  const formattedPercentageChange = percentageChange && percentageChange !== 'NA' ? `${percentageChange}` : 'NA';

  return (
    <div className={darkMode ? "bg-gray-800 text-white transition-all duration-300" : "bg-white text-black transition-all duration-300"}>
      {/* Line chart canvas for stock price */}
      <div className="flex flex-col p-2 sm:p-4">
        <h1 className={`text-xl sm:text-2xl transition-all duration-300 ${darkMode ? "text-white" : "text-black"}`}>{fullName}</h1>
        <div className="h-1 w-44 bg-blue-500 rounded-full"></div>
        <div className="flex flex-col sm:flex-row sm:gap-3 mt-3">
          <p className={` text-3xl sm:text-4xl mt-1 md:mt-3 transition-all duration-300 ${darkMode ? "text-white" : "text-black"}`}> {price}</p>
          <p className={isPositive ? (darkMode ? "text-green-400 mt-0 md:mt-6" : "text-green-500 mt-2 md:mt-6") : (darkMode ? "text-red-400 mt-0 md:mt-6" : "text-red-500 mt-0 md:mt-6")}>
            {formattedTodayChange} ({formattedPercentageChange})
          </p>
        </div>
      </div>
      <div className="flex justify-center w-full h-full">
        <canvas ref={chartRef} className={`w-full h-72 sm:h-96 lg:h-[400px] px-0 pt-0 md:px-8 md:pt-8 border-dashed border-b-2 ${darkMode ? "border-white" : "border-black"}`}></canvas> {/* Graph width and height */}
      </div>
    </div>
  );
}8

export default Stocks;
