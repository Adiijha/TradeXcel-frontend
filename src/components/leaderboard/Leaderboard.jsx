import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import Header from "../dashboard/Header";
import Vheader from "../dashboard/Vheader";
import ThemeContext from "../../context/ThemeContext.jsx";

function Leaderboard() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [activeTab, setActiveTab] = useState("weekly");

  const dummyData = {
    daily: [
      { rank: "🥇", name: "Alice", points: 120, contests: 5, strikeRate: "80%", contestsWon: 4 },
      { rank: "🥈", name: "Bob", points: 110, contests: 6, strikeRate: "70%", contestsWon: 3 },
      { rank: "🥉", name: "Charlie", points: 100, contests: 4, strikeRate: "90%", contestsWon: 3 },
      { rank: 4, name: "David", points: 90, contests: 5, strikeRate: "75%", contestsWon: 2 },
      { rank: 5, name: "Eleanor", points: 85, contests: 4, strikeRate: "70%", contestsWon: 1 },
      { rank: 6, name: "Fay", points: 80, contests: 3, strikeRate: "66%", contestsWon: 1 },
      { rank: 7, name: "Grace", points: 75, contests: 3, strikeRate: "70%", contestsWon: 2 },
      { rank: 8, name: "Hannah", points: 70, contests: 4, strikeRate: "65%", contestsWon: 1 },
      { rank: 9, name: "Isaac", points: 65, contests: 3, strikeRate: "60%", contestsWon: 2 },
      { rank: 10, name: "Jack", points: 60, contests: 2, strikeRate: "50%", contestsWon: 1 },
    ],
    weekly: [
      { rank: "🥇", name: "Diana", points: 700, contests: 20, strikeRate: "85%", contestsWon: 17 },
      { rank: "🥈", name: "Eve", points: 650, contests: 18, strikeRate: "78%", contestsWon: 14 },
      { rank: "🥉", name: "Frank", points: 600, contests: 15, strikeRate: "80%", contestsWon: 12 },
      { rank: 4, name: "George", points: 580, contests: 14, strikeRate: "76%", contestsWon: 11 },
      { rank: 5, name: "Holly", points: 550, contests: 12, strikeRate: "74%", contestsWon: 9 },
      { rank: 6, name: "Irene", points: 530, contests: 11, strikeRate: "72%", contestsWon: 8 },
      { rank: 7, name: "Jack", points: 500, contests: 10, strikeRate: "70%", contestsWon: 7 },
      { rank: 8, name: "Lily", points: 480, contests: 9, strikeRate: "65%", contestsWon: 6 },
      { rank: 9, name: "Mark", points: 460, contests: 8, strikeRate: "62%", contestsWon: 5 },
      { rank: 10, name: "Nina", points: 440, contests: 7, strikeRate: "60%", contestsWon: 4 },
    ],
    monthly: [
      { rank: "🥇", name: "Grace", points: 3000, contests: 50, strikeRate: "88%", contestsWon: 44 },
      { rank: "🥈", name: "Hank", points: 2900, contests: 48, strikeRate: "83%", contestsWon: 40 },
      { rank: "🥉", name: "Ivy", points: 2800, contests: 46, strikeRate: "87%", contestsWon: 41 },
      { rank: 4, name: "Jack", points: 2700, contests: 44, strikeRate: "82%", contestsWon: 36 },
      { rank: 5, name: "Karen", points: 2600, contests: 42, strikeRate: "80%", contestsWon: 35 },
      { rank: 6, name: "Leo", points: 2500, contests: 40, strikeRate: "79%", contestsWon: 33 },
      { rank: 7, name: "Mona", points: 2400, contests: 38, strikeRate: "78%", contestsWon: 30 },
      { rank: 8, name: "Nina", points: 2300, contests: 36, strikeRate: "75%", contestsWon: 28 },
      { rank: 9, name: "Oscar", points: 2200, contests: 34, strikeRate: "74%", contestsWon: 27 },
      { rank: 10, name: "Paul", points: 2100, contests: 32, strikeRate: "72%", contestsWon: 25 },
    ],
  };
  

  const leaderboardData = dummyData[activeTab];

  return (
    <div
      className={
        darkMode
          ? "bg-gray-800 text-white min-h-screen transition-all duration-300 font-pop"
          : "bg-white text-black min-h-screen transition-all duration-300 font-pop"
      }
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-col md:flex-row">
        <Vheader darkMode={darkMode} className="" />
        <main className="flex-1 p-4 m-4 md:m-10">
          <h1 className="text-3xl md:text-4xl font-bold">Leaderboard</h1>
          <div className="h-2 w-44 bg-blue-500 rounded-full mb-6"></div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-8">
            {["daily", "weekly", "monthly"].map((tab) => (
              <button
                key={tab}
                className={`px-4 md:px-6 py-2 mx-1 md:mx-2 text-sm md:text-lg rounded-md ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:opacity-90`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Top Ranks */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-3 space-y-4 md:space-y-0 md:space-x-12 mb-10">
            {leaderboardData.slice(0, 3).map((entry) => (
              <motion.div
                key={entry.rank}
                className={`w-80 md:w-72 h-24 md:h-48 flex flex-col items-center justify-center rounded-2xl ${
                  darkMode ? "bg-slate-900 text-white" : "bg-blue-100 text-blue-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              <div className="flex flex-row md:flex-col items-center justify-center">
                <div className="flex flex-row mt-4 md:mt-0 mb-4 pb-3 w-32 md:w-40 items-center justify-center md:border-b-2">
                  <span className="text-2xl md:text-5xl font-bold">{entry.rank}</span>
                  <span className="text-lg md:text-2xl font-bold mt-4 md:mt-0 md:ml-4">{entry.name}</span>
                </div>
                <div className="flex gap-2 flex-row max-w-40 md:flex-col md:gap-0">
                <span className="text-xs md:text-lg">{entry.points} Points</span>
                <span className="text-xs md:text-lg">{entry.contests} Contests</span>
                <span className="text-xs md:text-lg">{entry.contestsWon} Wins</span>
                </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Leaderboard Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-lg text-center border-collapse mb-16 md:mb-0">
              <thead className={darkMode ? "bg-gray-700" : "bg-gray-200"}>
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Points</th>
                  <th className="p-3">Contests Participated</th>
                  <th className="p-3">Contests Won</th>
                  <th className="p-3">Strike Rate</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry) => (
                  <tr
                    key={entry.rank}
                    className={
                      darkMode
                        ? "hover:bg-gray-600 border-b-2"
                        : "hover:bg-gray-100 border-b-2"
                    }
                  >
                    <td className="p-3">{entry.rank}</td>
                    <td className="p-3">{entry.name}</td>
                    <td className="p-3">{entry.points}</td>
                    <td className="p-3">{entry.contests}</td>
                    <td className="p-3">{entry.contestsWon}</td>
                    <td className="p-3">{entry.strikeRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Leaderboard;
