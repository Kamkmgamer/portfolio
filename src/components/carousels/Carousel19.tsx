'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel77/800/600',
  'https://picsum.photos/seed/carousel78/800/600',
  'https://picsum.photos/seed/carousel79/800/600',
];

const Carousel19 = () => {
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(images.length);

  return (
    <div className={`relative w-full max-w-3xl mx-auto h-96 overflow-hidden rounded-lg ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${currentItem === index ? 'scale-100' : 'scale-150'}`}>
          <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
        </div>
      ))}
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10094;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10095;</button>
    </div>
  );
};

export default Carousel19;
