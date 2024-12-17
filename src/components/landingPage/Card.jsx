import React from "react";
import { motion } from "framer-motion";

function Card({ img, heading, description }) {
  return (
    <motion.div
      className="w-full sm:w-72 h-full text-left"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full sm:w-80 h-48 flex justify-center bg-grey pt-3"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="w-full sm:w-72 h-44 bg-grey" whileHover={{ scale: 1.05 }}>
          <img
            src={img}
            alt={heading}
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>
      </motion.div>

      <motion.h6
        className="text-xl pt-6 font-semibold font-pop"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {heading}
      </motion.h6>

      <motion.p
        className="font-pop pt-4 text-gray-600 text-sm"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export default Card;
