import React, { useState, useContext } from "react";
import Header from "../dashboard/Header";
import Vheader from "../dashboard/Vheader";
import ThemeContext from "../../context/ThemeContext.jsx";
import { Helmet } from "react-helmet";

function Contest() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [showMyContests, setShowMyContests] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedContest, setSelectedContest] = useState(null);
  const [myContestsTab, setMyContestsTab] = useState("active");

  // Dummy contest data
  const contests = {
    active: [
      {
        id: 1,
        title: "New Year Trading Contest",
        description: "Compete with others to earn the highest returns in a virtual stock market.",
        startTime: "Ongoing",
        endTime: "Ends: 31 Dec 2024",
        prize: "Prize Pool: $500",
        details: "This contest allows participants to trade in a simulated environment using virtual money. The top performers will win exciting cash prizes.",
      },
      {
        id: 2,
        title: "Christmas Special Contest",
        description: "Show your trading skills and win exciting prizes.",
        startTime: "Ongoing",
        endTime: "Ends: 25 Dec 2024",
        prize: "Prize Pool: $300",
        details: "Join this festive trading competition and stand a chance to win amazing rewards while enjoying the holiday season.",
      },
    ],
    upcoming: [
      {
        id: 3,
        title: "Q1 Mega Contest",
        description: "Start the new quarter with a trading bang!",
        startTime: "Starts: 1 Jan 2025",
        endTime: "Ends: 31 Jan 2025",
        prize: "Prize Pool: $1,000",
        details: "Gear up for an exciting trading contest this quarter with massive prizes and opportunities to showcase your skills.",
      },
    ],
    past: [
      {
        id: 4,
        title: "Diwali Bonanza Contest",
        description: "Celebrate Diwali with profitable trades and amazing rewards.",
        startTime: "1 Oct 2024",
        endTime: "31 Oct 2024",
        prize: "Winner: John Doe - $200",
        details: "Participants celebrated the festival of lights by engaging in thrilling trading sessions and winning lucrative rewards.",
      },
    ],
  };

  const myContests = {
    active: [
      {
        id: 1,
        title: "New Year Trading Contest",
        description: "Compete with others to earn the highest returns in a virtual stock market.",
        startTime: "Ongoing",
        endTime: "Ends: 31 Dec 2024",
        prize: "Prize Pool: $500",
        details: "This contest allows participants to trade in a simulated environment using virtual money. The top performers will win exciting cash prizes.",
      },
    ],
    past: [
      {
        id: 4,
        title: "Diwali Bonanza Contest",
        description: "Celebrate Diwali with profitable trades and amazing rewards.",
        startTime: "1 Oct 2024",
        endTime: "31 Oct 2024",
        prize: "Winner: John Doe - $200",
        details: "Participants celebrated the festival of lights by engaging in thrilling trading sessions and winning lucrative rewards.",
      },
    ],
  };

  const currentContests = showMyContests
    ? myContests[myContestsTab]
    : [...contests.active, ...contests.upcoming, ...contests.past];

  const selectedContests = showMyContests
    ? myContests[myContestsTab]
    : currentContests.filter((contest) => {
        if (activeTab === "active") return contests.active.some((c) => c.id === contest.id);
        if (activeTab === "upcoming") return contests.upcoming.some((c) => c.id === contest.id);
        if (activeTab === "past") return contests.past.some((c) => c.id === contest.id);
        return false;
      });

  return (
    <>
    <Helmet>
          <title>Contests</title>
        </Helmet>
    <div
      className={
        darkMode
          ? "bg-gray-800 text-white min-h-screen transition-all duration-300 font-pop"
          : "bg-white text-black min-h-screen transition-all duration-300 font-pop"
      }
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-col lg:flex-row">
        <Vheader darkMode={darkMode} />
        <main className="flex-1 pb-24 md:pb-0 p-6 m-2 md:m-12">
          <h1 className="text-3xl md:text-4xl font-bold">Contests</h1>
          <div className="h-2 w-32 md:w-36 bg-blue-500 rounded-full mb-6"></div>

          {/* Toggle Buttons */}
          <div className="flex flex-row justify-center font-medium mb-6 gap-4">
            <button
              className={`px-6 py-2 text-sm md:text-lg rounded-md ${
                !showMyContests
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:opacity-90`}
              onClick={() => {
                setShowMyContests(false);
                setSelectedContest(null);
              }}
            >
              All Contests
            </button>
            <button
              className={`px-6 py-2 text-sm md:text-lg rounded-md ${
                showMyContests
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:opacity-90`}
              onClick={() => {
                setShowMyContests(true);
                setSelectedContest(null);
              }}
            >
              My Contests
            </button>
          </div>

          {/* Tabs for All Contests */}
          {!showMyContests && !selectedContest && (
            <div className="flex justify-center text-sm md:text-md mb-8">
              {[
                { key: "active", label: "Active" },
                { key: "upcoming", label: "Upcoming" },
                { key: "past", label: "Past" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`px-6 py-2 mx-2 font-medium rounded-md ${
                    activeTab === key
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-800"
                  } hover:opacity-90`}
                  onClick={() => setActiveTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Tabs for My Contests */}
          {showMyContests && !selectedContest && (
            <div className="flex justify-center mb-8 text-sm md:text-md">
              {[
                { key: "active", label: "Active" },
                { key: "past", label: "Past" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`px-6 py-2 mx-2 font-medium rounded-md ${
                    myContestsTab === key
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-800"
                  } hover:opacity-90`}
                  onClick={() => setMyContestsTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Contest Cards */}
          {!selectedContest ? (
            <div className="flex flex-col md:flex-row gap-6">
              {selectedContests.length > 0 ? (
                selectedContests.map((contest) => (
                  <div
                    key={contest.id}
                    className={`p-8 md:w-1/2 md:h-72 mt-2 md:mt-6 rounded-2xl shadow-lg ${
                      darkMode ? "bg-gray-900" : "bg-gray-100"
                    }`}
                  >
                    <h2 className="text-xl md:text-2xl font-bold mb-2">{contest.title}</h2>
                    <p className="text-sm md:text-md mb-2">{contest.description}</p>
                    <p className="text-xs md:text-sm font-medium mb-2">{contest.startTime}</p>
                    <p className="text-xs md:text-sm font-medium mb-2">{contest.endTime}</p>
                    <p className="text-xs md:text-sm font-medium text-blue-500">{contest.prize}</p>
                    <button
                      className={`mt-4 px-4 py-2 rounded-md ${
                        darkMode
                          ? "bg-blue-500 text-white"
                          : "bg-blue-600 text-white"
                      } hover:opacity-90`}
                      onClick={() => setSelectedContest(contest)}
                    >
                      {!showMyContests && activeTab === "active" ? "Participate" : "View Details"}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-lg">No contests available in this category.</p>
              )}
            </div>
          ) : (
            <div className={`p-6 rounded-xl mt-10 shadow-lg ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
              <h2 className="text-xl md:text-2xl font-bold mb-4">{selectedContest.title}</h2>
              <p className="text-md md:text-lg mb-4">{selectedContest.details}</p>
              <p className="text-xs md:text-sm font-medium mb-2">Start Time: {selectedContest.startTime}</p>
              <p className="text-xs md:text-sm font-medium mb-2">End Time: {selectedContest.endTime}</p>
              <p className="text-xs md:text-sm font-medium text-blue-500 mb-4">{selectedContest.prize}</p>
              <div className="flex">
              <button
                className={`px-4 py-2 text-sm md:text-md font-medium rounded-md mr-5 ${
                  darkMode ? "bg-blue-500 text-white" : "bg-blue-600 text-white"
                } hover:opacity-90`}
              >
                Participate
              </button>
              <button
                className={`px-4 py-2 text-sm md:text-md font-medium rounded-md ${
                  darkMode ? "bg-blue-500 text-white" : "bg-blue-600 text-white"
                } hover:opacity-90`}
                onClick={() => setSelectedContest(null)}
              >
                Back to Contests
              </button>
              </div>
            </div>

          )}
        </main>
      </div>
    </div>
    </>
  );
}

export default Contest;
