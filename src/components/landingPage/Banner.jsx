import React from 'react'
import { Link } from 'react-router-dom'

function Banner({ heading, description, img, reverse }) {
  return (
    <div
      className={`w-full h-full bg-white p-6 md:px-24 py-5 md:py-10 flex flex-col ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      } justify-between gap-6`}
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img src={img} alt="Banner" className="w-full h-auto max-w-sm md:max-w-full" />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center">
        <h6 className="text-blue-500 font-pop text-xl text-left font-semibold">OUR FEATURE</h6>
        <h2 className="text-3xl md:text-4xl font-semibold text-left">{heading}</h2>
        <p className="text-gray-600 text-left pr-0 md:pr-7 lg:pr-20">{description}</p>
        <Link to="/signup">
          <button className="flex justify-center pl-0 border-2 w-32 py-3 rounded-lg font-semibold bg-btn-blue border-transparent text-white text-sm">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Banner
