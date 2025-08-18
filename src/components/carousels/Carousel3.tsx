'use client';

import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel11/800/600',
  'https://picsum.photos/seed/carousel12/800/600',
  'https://picsum.photos/seed/carousel13/800/600',
  'https://picsum.photos/seed/carousel14/800/600',
  'https://picsum.photos/seed/carousel15/800/600',
];

const Carousel3 = () => {
  const { currentItem, nextItem, prevItem, goToItem, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave, draggedX, isDragging } = useCarousel(images.length);

  return (
    <div
      className={`relative w-full max-w-3xl mx-auto h-96 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ perspective: '1000px' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}>
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d', transform: `rotateY(${-draggedX / 10}deg)` }}>
        {images.map((src, index) => {
          const angle = (index - currentItem) * (360 / images.length);
          return (
            <div
              key={index}
              className="absolute w-full h-full transition-transform duration-1000 ease-in-out"
              style={{
                transform: `rotateY(${angle}deg) translateZ(250px)`,
                backfaceVisibility: 'hidden',
              }}>
              <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover rounded-lg" loading="lazy" onDragStart={(e) => e.preventDefault()} />
            </div>
          );
        })}
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">
        &#10094;
      </button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">
        &#10095;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToItem(index)}
            className={`w-3 h-3 rounded-full ${currentItem === index ? 'bg-white' : 'bg-white/50'}`}></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel3;
