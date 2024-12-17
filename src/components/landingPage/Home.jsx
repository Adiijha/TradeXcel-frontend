import React from 'react';
import Card from './Card';
import Banner from './Banner';
import person from '../../assets/person.png';
import Newsletter from './Newsletter';
import { Link } from 'react-router-dom';
import card1 from '../../assets/card1.webp';
import card2 from '../../assets/card2.webp';
import card3 from '../../assets/card3.webp';
import banner2 from '../../assets/banner2.webp';
import dashboard from "../../assets/dashboard.png";
import dashboard2 from "../../assets/dashboard2.png";
import { motion } from 'framer-motion';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <motion.div
        className="w-full h-full pb-12 flex flex-col md:flex-row bg-grey relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Side (Text) */}
        <motion.div
          className="h-auto w-full md:w-1/2 pl-6 md:pl-12 lg:pl-20 p-6 pt-12 pb-0"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-blue-500 font-pop text-lg">Master Virtual Trading</div>
          <div className="py-3 font-pop font-semibold text-4xl md:text-5xl lg:text-6xl lg:leading-tight">
            Learn, Trade, and Compete in a <span className="text-blue-500">Realistic Stock Market Simulation</span>
          </div>
          <div className="text-gray-600 text-lg">Experience the thrill of trading without the risk. Build your portfolio, track performance, and rise to the top of the leaderboard!</div>
          <div className="pt-8 flex flex-col sm:flex-row gap-4 sm:gap-8">
            <Link to="/signup">
              <button className="w-full sm:w-auto border-2 px-10 font-medium py-4 rounded-lg bg-btn-blue border-transparent text-white text-sm">
                Get Started
              </button>
            </Link>
            <Link to="/how-it-works">
              <button className="w-full sm:w-auto border-2 px-10 py-4 rounded-lg text-btn-blue border-transparent text-sm">
                How it Works?
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Side (Dashboard Image) */}
        <motion.div
          className="h-full w-full md:w-1/2 flex justify-center items-center relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={dashboard}
            alt="Dashboard"
            className="hidden sm:block w-full h-auto object-cover md:w-2/3 lg:w-full mt-6 border-2 rounded-2xl mr-48 border-btn-blue transform scale-100"
          />
          <img
            src={dashboard2}
            alt="Dashboard Overlay"
            className="hidden sm:block absolute bottom-[-47%] left-[1%] w-[80%] md:w-[70%] lg:w-full border-2 rounded-2xl border-btn-blue transform scale-95"
          />
        </motion.div>
      </motion.div>

      {/* Why Choose TradeXcel Section */}
      <motion.div
        className="bg-white w-full h-auto p-6 sm:p-10 md:p-12 lg:p-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h6 className="text-blue-500 font-pop text-xl font-semibold">Why You Should Choose TradeXcel?</h6>
        <p className="text-3xl md:text-4xl pt-4 font-semibold font-pop">Master trading with real-time insights!</p>
        <div className="gap-6 md:gap-10 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card img={card1} heading="Risk-Free Learning" description="TradeXcel offers a safe environment for learning to trade. Practice without real money while developing confidence and refining your trading skills effectively." />
          <Card img={card2} heading="Engaging Experience" description="Our platform combines competition and gamification. With leaderboards, achievements, and real-time updates, trading becomes exciting and rewarding for every participant." />
          <Card img={card3} heading="User-Friendly Design" description="We prioritize simplicity and efficiency. Navigate seamlessly, access real-time data, and utilize interactive tools tailored to both beginners and seasoned traders." />
        </div>
      </motion.div>

      {/* Banner Section */}
      <motion.div
        className="w-full bg-white py-0 md:py-24 px-6 sm:px-12 md:p-0 lg:px-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Banner
          img={person}
          heading="Real-Time Stock Simulation"
          description="Trade live with updated stock prices and dynamic market conditions. Build and manage portfolios, experience realistic fluctuations, and enhance your skills in an interactive environment. Our real-time features replicate actual stock market scenarios, offering a comprehensive and engaging virtual trading experience."
        />
        <Banner
          img={banner2}
          heading="Advanced Analytics and Insights"
          description="Access detailed stock charts, performance metrics, and intuitive data visualizations. Evaluate market trends, monitor portfolio performance, and identify growth opportunities. Our analytics tools empower users to make data-driven decisions and refine their trading strategies for maximum effectiveness and deeper market understanding."
          reverse={true}
        />
      </motion.div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Newsletter />
      </motion.div>
    </>
  );
}

export default Home;
