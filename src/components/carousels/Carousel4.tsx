'use client';

import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel16/800/600',
  'https://picsum.photos/seed/carousel17/800/600',
  'https://picsum.photos/seed/carousel18/800/600',
  'https://picsum.photos/seed/carousel19/800/600',
  'https://picsum.photos/seed/carousel20/800/600',
];

const Carousel4 = () => {
  const { currentItem, nextItem, prevItem, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave, draggedX, isDragging } = useCarousel(images.length);

  return (
    <div
      className={`relative w-full max-w-3xl mx-auto h-96 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ perspective: '1000px' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}>
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {images.map((src, index) => {
          const offset = index - currentItem;
          const angle = offset * 45 - (draggedX / 10);
          const zIndex = images.length - Math.abs(offset);
          return (
            <div
              key={index}
              className="absolute w-full h-full transition-transform duration-500 ease-in-out"
              style={{
                transform: `rotateY(${angle}deg) translateZ(250px) translateX(${offset * 100}px)`,
                zIndex: zIndex,
                opacity: Math.abs(offset) > 1 ? 0 : 1,
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
    </div>
  );
};

export default Carousel4;
