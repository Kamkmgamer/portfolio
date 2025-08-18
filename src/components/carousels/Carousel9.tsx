'use client';

import React, { useState } from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel45/1200/800',
  'https://picsum.photos/seed/carousel46/1200/800',
  'https://picsum.photos/seed/carousel47/1200/800',
  'https://picsum.photos/seed/carousel48/1200/800',
  'https://picsum.photos/seed/carousel49/1200/800',
];

const Carousel9 = () => {
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(images.length);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative w-full max-w-3xl mx-auto h-96 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <div className="overflow-hidden relative w-full h-full">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-contain" loading="lazy" onDragStart={(e) => e.preventDefault()} />
          </div>
        ))}
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">
        &#10094;
      </button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">
        &#10095;
      </button>
      <button onClick={toggleFullscreen} className="absolute top-4 right-4 bg-white/50 rounded-full p-2 focus:outline-none">
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>
    </div>
  );
};

export default Carousel9;
