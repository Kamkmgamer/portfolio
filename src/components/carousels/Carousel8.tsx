'use client';

import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel36/400/300',
  'https://picsum.photos/seed/carousel37/400/300',
  'https://picsum.photos/seed/carousel38/400/300',
  'https://picsum.photos/seed/carousel39/400/300',
  'https://picsum.photos/seed/carousel40/400/300',
  'https://picsum.photos/seed/carousel41/400/300',
  'https://picsum.photos/seed/carousel42/400/300',
  'https://picsum.photos/seed/carousel43/400/300',
  'https://picsum.photos/seed/carousel44/400/300',
];

const Carousel8 = () => {
  const itemsPerPage = 6;
  const { currentItem, nextItem, prevItem, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave, draggedX, isDragging } = useCarousel(Math.ceil(images.length / itemsPerPage));

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div
        className={`overflow-hidden relative h-96 rounded-lg ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${currentItem * 100}% + ${draggedX}px))` }}>
          {Array.from({ length: Math.ceil(images.length / itemsPerPage) }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-3 grid-rows-2 gap-2 p-2">
              {images.slice(slideIndex * itemsPerPage, (slideIndex + 1) * itemsPerPage).map((src, index) => (
                <div key={index} className="w-full h-full rounded-lg overflow-hidden">
                  <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
                </div>
              ))}
            </div>
          ))}
        </div>
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

export default Carousel8;
