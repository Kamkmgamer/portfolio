'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel68/800/600',
  'https://picsum.photos/seed/carousel69/800/600',
  'https://picsum.photos/seed/carousel70/800/600',
];

const Carousel16 = () => {
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(images.length);

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="overflow-hidden relative h-96 rounded-lg">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
          </div>
        ))}
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-3 focus:outline-none text-2xl font-bold">&#x2190;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-3 focus:outline-none text-2xl font-bold">&#x2192;</button>
    </div>
  );
};

export default Carousel16;
