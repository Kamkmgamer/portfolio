'use client';

import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel21/800/600',
  'https://picsum.photos/seed/carousel22/800/600',
  'https://picsum.photos/seed/carousel23/800/600',
  'https://picsum.photos/seed/carousel24/800/600',
  'https://picsum.photos/seed/carousel25/800/600',
];

const Carousel5 = () => {
  const { currentItem, goToItem, handleMouseDown, handleMouseUp, isDragging } = useCarousel(images.length);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`overflow-hidden relative h-96 rounded-lg mb-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => goToItem(index)}
            className={`w-1/5 h-20 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${currentItem === index ? 'ring-2 ring-blue-500' : ''}`}>
            <img src={src} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel5;
