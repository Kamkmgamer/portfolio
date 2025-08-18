'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel80/800/600',
  'https://picsum.photos/seed/carousel81/800/600',
  'https://picsum.photos/seed/carousel82/800/600',
];

const Carousel20 = () => {
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(images.length);

  return (
    <div className={`relative w-full max-w-3xl mx-auto h-96 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${currentItem === index ? 'z-10' : 'z-0'}`}
          style={{ transform: `translateY(${(index - currentItem) * 20}px) scale(${1 - Math.abs(index - currentItem) * 0.1})` }}>
          <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover rounded-lg" loading="lazy" onDragStart={(e) => e.preventDefault()} />
        </div>
      ))}
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none z-20">&#10094;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none z-20">&#10095;</button>
    </div>
  );
};

export default Carousel20;
