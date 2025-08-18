'use client';

import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel1/800/600',
  'https://picsum.photos/seed/carousel2/800/600',
  'https://picsum.photos/seed/carousel3/800/600',
  'https://picsum.photos/seed/carousel4/800/600',
  'https://picsum.photos/seed/carousel5/800/600',
];

const Carousel1 = () => {
  const { currentItem, nextItem, prevItem, goToItem, handleMouseDown, handleMouseUp, isDragging } = useCarousel(images.length);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div
        className={`overflow-hidden relative h-96 rounded-lg ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
          </div>
        ))}
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">
        &#10094;
      </button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">
        &#10095;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToItem(index)}
            className={`w-3 h-3 rounded-full ${currentItem === index ? 'bg-white' : 'bg-white/50'}`}></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel1;
