'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel56/800/600',
  'https://picsum.photos/seed/carousel57/800/600',
  'https://picsum.photos/seed/carousel58/800/600',
];

const Carousel12 = () => {
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(images.length, 3000);

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="overflow-hidden relative h-96 rounded-lg">
        <div className="flex h-full">
          {images.map((src, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentItem * 100}%)` }}>
              <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10094;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10095;</button>
    </div>
  );
};

export default Carousel12;
