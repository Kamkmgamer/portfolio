'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel50/800/600',
  'https://picsum.photos/seed/carousel51/800/600',
  'https://picsum.photos/seed/carousel52/800/600',
];

const Carousel10 = () => {
  const { currentItem, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave, draggedX, isDragging } = useCarousel(images.length);

  return (
    <div
      className={`relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(calc(-${currentItem * 100}% + ${draggedX}px))` }}>
        {images.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0 h-96">
            <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel10;