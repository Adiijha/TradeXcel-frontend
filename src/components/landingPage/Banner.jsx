import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Banner({ heading, description, img, reverse }) {
  return (
    <motion.div
      className={`w-full h-full bg-white p-6 md:px-24 py-5 md:py-10 flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } justify-between gap-6`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }} // Triggers animation when 20% of the element is in view
      transition={{ duration: 0.8 }}
    >
      {/* Image Section */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ x: reverse ? 100 : -100 }}
        whileInView={{ x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={img}
          alt="Banner"
          className="w-full h-auto max-w-sm md:max-w-full"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h6 className="text-blue-500 font-pop text-xl text-left font-semibold">
          OUR FEATURE
        </h6>
        <h2 className="text-3xl md:text-4xl font-semibold text-left">{heading}</h2>
        <p className="text-gray-600 text-left pr-0 md:pr-7 lg:pr-20">
          {description}
        </p>
        <Link to="/signup">
          <motion.button
            className="flex justify-center pl-0 border-2 w-32 py-3 rounded-lg font-semibold bg-btn-blue border-transparent text-white text-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Banner;
