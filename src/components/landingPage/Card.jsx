import React from 'react';

function Card({ img, heading, description }) {
  return (
    <>
      <div className="w-full sm:w-72 h-full text-left">
        <div className="w-full sm:w-80 h-48 flex justify-center bg-grey pt-3">
          <div className="w-full sm:w-72 h-44 bg-grey">
            <img src={img} alt={heading} className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
        <h6 className="text-xl pt-6 font-semibold font-pop">{heading}</h6>
        <p className="font-pop pt-4 text-gray-600 text-sm">{description}</p>
      </div>
    </>
  );
}

export default Card;
