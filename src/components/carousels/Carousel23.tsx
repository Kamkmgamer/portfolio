'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  { left: 'https://picsum.photos/seed/carousel92/400/600', right: 'https://picsum.photos/seed/carousel93/400/600' },
  { left: 'https://picsum.photos/seed/carousel94/400/600', right: 'https://picsum.photos/seed/carousel95/400/600' },
  { left: 'https://picsum.photos/seed/carousel96/400/600', right: 'https://picsum.photos/seed/carousel97/400/600' },
];

const Carousel23 = () => {
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(images.length);

  return (
    <div className={`relative w-full max-w-3xl mx-auto h-96 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="flex h-full">
        <div className="w-1/2 h-full overflow-hidden">
          <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentItem * 100}%)` }}>
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 h-full">
                <img src={image.left} alt={`Left image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 h-full overflow-hidden">
          <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${(images.length - 1 - currentItem) * 100}%)` }}>
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 h-full">
                <img src={image.right} alt={`Right image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10094;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10095;</button>
    </div>
  );
};

export default Carousel23;
