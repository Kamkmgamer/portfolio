'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel98/800/600',
  'https://picsum.photos/seed/carousel99/800/600',
  'https://picsum.photos/seed/carousel100/800/600',
];

const Carousel24 = () => {
  const { currentItem, goToItem, isDragging } = useCarousel(images.length);

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
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button key={index} onClick={() => goToItem(index)} className="w-4 h-4 rounded-full bg-white/50 transition-all duration-300 ease-in-out" style={{ transform: `scale(${currentItem === index ? 1.5 : 1})` }}></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel24;
