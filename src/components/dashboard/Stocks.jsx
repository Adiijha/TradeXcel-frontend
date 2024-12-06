import React, { useRef, useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, LineElement, LineController, PointElement } from 'chart.js';

// Register necessary components
Chart.register(CategoryScale, LinearScale, LineElement, LineController, PointElement);

function Stocks({ shortName, fullName, stockPrices, labels, percentageChange, price, todayChange, darkMode }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart instance (if any) before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a gradient color for line chart (based on whether it's a gainer or loser)
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, percentageChange > 0 ? 'green' : 'red');
    gradient.addColorStop(1, 'white');

    // Create a new chart with sharp edges and no fill
    chartInstance.current = new Chart(ctx, {
      type: 'line', // Line chart to simulate stock price trend
      data: {
        labels: labels, // X-axis labels (days of the week)
        datasets: [
          {
            label: shortName, // Stock name (short form)
            data: stockPrices, // Stock price data
            borderColor: gradient, // Use gradient colors for the line
            backgroundColor: 'transparent', // No fill under the line
            tension: 0, // Sharp edges (no smoothing)
            borderWidth: 2,
            pointRadius: 0, // No points (dots)
            showLine: true, // Show the line
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
            enabled: false, // Disable tooltip
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
  }, [percentageChange, shortName, stockPrices, labels]); // Re-run this effect when any relevant prop changes

  // Format today's change and percentage change
  const formattedChange = `${todayChange > 0 ? '+' : ''}${todayChange} (${Math.abs(percentageChange).toFixed(2)}%)`;

  return (
    <div className={`p-3 w-full flex flex-row sm:flex-row items-center rounded-lg shadow-md mb-2 md:mb-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} transition-all duration-300`}>
      {/* Stock details (name, full name, price, and change) */}
      <div className="flex flex-col items-center w-full sm:w-1/3 mb-4 sm:mb-0">
        {/* Stock short name */}
        <div className="text-md md:text-lg font-semibold">{shortName}</div>

        {/* Full stock name with truncation */}
        <div
          className={`text-xs md:text-sm ${darkMode ?  'text-gray-200' : ' text-gray-600'} transition-all duration-300 overflow-hidden whitespace-nowrap text-ellipsis`}
          title={fullName} // Show full name on hover
        >
          {fullName.length > 15 ? `${fullName.substring(0, 15)}...` : fullName}
        </div>
      </div>

      {/* Line chart canvas for stock price */}
      <div className="flex justify-center w-full sm:w-1/3 mb-4 sm:mb-0">
        <canvas ref={chartRef} className="max-w-16 max-h-8"></canvas> {/* Graph width and height */}
      </div>

      {/* Stock price and today's change */}
      <div className="flex flex-col items-center justify-end w-full sm:w-1/3">
        <div className="text-sm md:text-lg font-medium">{price}</div>

        {/* Display today's change and percentage */}
        <div className={`text-xs md:text-sm ${todayChange < 0 || percentageChange < 0 ? 'text-red-500' : 'text-green-500'}`}>
          {formattedChange}
        </div>
      </div>
    </div>
  );
}

export default Stocks;
