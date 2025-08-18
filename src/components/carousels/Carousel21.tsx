'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel83/200/200',
  'https://picsum.photos/seed/carousel84/200/200',
  'https://picsum.photos/seed/carousel85/200/200',
  'https://picsum.photos/seed/carousel86/200/200',
  'https://picsum.photos/seed/carousel87/200/200',
  'https://picsum.photos/seed/carousel88/200/200',
];

const Carousel21 = () => {
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(images.length);

  return (
    <div className={`relative w-full max-w-3xl mx-auto h-96 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full">
        {images.map((src, index) => (
          <div key={index} className={`transition-opacity duration-500 ease-in-out ${index === currentItem ? 'opacity-100' : 'opacity-50'}`}>
            <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover rounded-lg" loading="lazy" onDragStart={(e) => e.preventDefault()} />
          </div>
        ))}
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10094;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10095;</button>
    </div>
  );
};

export default Carousel21;
