import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const slides = [
  "https://media.istockphoto.com/id/1135284188/photo/if-you-need-its-here.webp?a=1&b=1&s=612x612&w=0&k=20&c=BESYqHIccHzlUNRthSmOcaZGaJCVCbYS6nsUQyc4Hfs=",
  "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBoYXJtYWN5fGVufDB8fDB8fHww"
];

export default function CarouselSlide({ autoSlide = true, autoSlideInterval = 3000 }) {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="relative overflow-hidden w-full h-[500px]">
      <div
        className="flex transition-transform ease-out duration-500 h-full"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className="w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`transition-all w-3 h-3 rounded-full bg-white ${
              curr === i ? "p-2" : "bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
