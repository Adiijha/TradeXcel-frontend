import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../dashboard/Header';
import Vheader from '../dashboard/Vheader';
import ThemeContext from "../../context/ThemeContext.jsx";

function Faq() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAnswer = (index) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      question: "What is TradExcel?",
      answer: "TradExcel is a virtual stock market game where users can simulate stock trading in real-time market conditions without any financial risk."
    },
    {
      question: "How do I get started with TradExcel?",
      answer: "Simply sign up on the platform, create a portfolio, and start trading with virtual currency."
    },
    {
      question: "Is TradExcel free to use?",
      answer: "Yes, TradExcel is completely free to use and is designed to help users learn and practice trading."
    },
    {
      question: "Can I track my trading performance?",
      answer: "Absolutely! TradExcel provides detailed performance analytics, including profit/loss tracking and portfolio insights."
    },
    {
      question: "Is TradExcel suitable for beginners?",
      answer: "Yes, TradExcel is ideal for beginners looking to learn trading strategies and understand market trends without financial risks."
    }
  ];

  return (
    <>
      <div className={darkMode ? "bg-gray-800 text-white min-h-screen transition-all duration-300" : "bg-white text-black min-h-screen transition-all duration-300"}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex">
          <Vheader darkMode={darkMode} className=" noscroller" />
          <div className="p-6 w-full md:w-3/4 m-2 md:m-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-10">Frequently Asked Questions</h1>
            <div className="space-y-10">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4">
                  <h2 
                    className="text-xl md:text-2xl font-semibold cursor-pointer flex justify-between items-center" 
                    onClick={() => toggleAnswer(index)}
                  >
                    {faq.question}
                    <span className="text-3xl">{expandedIndex === index ? '-' : '+'}</span>
                  </h2>
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: "auto" }} 
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-lg md:text-xl"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
