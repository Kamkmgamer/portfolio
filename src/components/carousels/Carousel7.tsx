'use client';

import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel31/800/600',
  'https://picsum.photos/seed/carousel32/800/600',
  'https://picsum.photos/seed/carousel33/800/600',
  'https://picsum.photos/seed/carousel34/800/600',
  'https://picsum.photos/seed/carousel35/800/600',
];

const Carousel7 = () => {
  const { currentItem, nextItem, prevItem, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave, draggedY, isDragging } = useCarousel(images.length, 5000, 'vertical');

  return (
    <div className="relative w-full max-w-3xl mx-auto h-96">
      <div
        className={`overflow-hidden relative h-full rounded-lg ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}>
        <div
          className="transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateY(calc(-${currentItem * 100}% + ${draggedY}px))` }}>
          {images.map((src, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={prevItem} className="absolute left-1/2 top-4 transform -translate-x-1/2 bg-white/50 rounded-full p-2 focus:outline-none">
        &#9650;
      </button>
      <button onClick={nextItem} className="absolute left-1/2 bottom-4 transform -translate-x-1/2 bg-white/50 rounded-full p-2 focus:outline-none">
        &#9660;
      </button>
    </div>
  );
};

export default Carousel7;
