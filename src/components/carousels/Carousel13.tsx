'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel59/800/600',
  'https://picsum.photos/seed/carousel60/800/600',
  'https://picsum.photos/seed/carousel61/800/600',
];

const Carousel13 = () => {
  const { currentItem, isDragging } = useCarousel(images.length, 2000);

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="overflow-hidden relative h-96 rounded-lg">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel13;
