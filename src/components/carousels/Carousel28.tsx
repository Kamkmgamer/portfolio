'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel107/400/300',
  'https://picsum.photos/seed/carousel108/400/300',
  'https://picsum.photos/seed/carousel109/400/300',
  'https://picsum.photos/seed/carousel110/400/300',
  'https://picsum.photos/seed/carousel111/400/300',
  'https://picsum.photos/seed/carousel112/400/300',
];

const Carousel28 = () => {
  const itemsPerPage = 3;
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(Math.ceil(images.length / itemsPerPage));

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="overflow-hidden relative h-96 rounded-lg">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentItem * 100}%)` }}>
          {Array.from({ length: Math.ceil(images.length / itemsPerPage) }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0 flex space-x-2">
              {images.slice(slideIndex * itemsPerPage, (slideIndex + 1) * itemsPerPage).map((src, index) => (
                <div key={index} className="w-1/3 h-full rounded-lg overflow-hidden">
                  <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10094;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10095;</button>
    </div>
  );
};

export default Carousel28;
