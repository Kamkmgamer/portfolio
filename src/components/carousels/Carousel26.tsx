'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  { src: 'https://picsum.photos/seed/carousel101/400/600', width: 'w-1/3' },
  { src: 'https://picsum.photos/seed/carousel102/800/600', width: 'w-2/3' },
  { src: 'https://picsum.photos/seed/carousel103/600/600', width: 'w-1/2' },
];

const Carousel26 = () => {
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(images.length);

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="overflow-hidden relative h-96 rounded-lg">
        <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentItem * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className={`flex-shrink-0 h-full ${image.width}`}>
              <img src={image.src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10094;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10095;</button>
    </div>
  );
};

export default Carousel26;
