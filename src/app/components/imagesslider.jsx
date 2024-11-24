'use client';
import React, { useState, useEffect } from 'react';

export default function ImageSlider() {
  const images = [
    'https://www.ppkhosp.go.th/images/king.jpg',
    'https://www.ppkhosp.go.th/images/HealthID.jpg',
    'https://www.ppkhosp.go.th/images/happynewyear.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 15000); // เลื่อนภาพทุก 3 วินาที
    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
  }, []);

  return (
    <div>
      <div className="relative w-[70rem] mx-auto p-5">
        <div className="overflow-hidden rounded-lg">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-fuul object-cover transition duration-700 ease-in-out"
          />
        </div>

        {/* ปุ่มเลื่อนสไลด์ */}
        <button
          onClick={goToPrevSlide}
          className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}