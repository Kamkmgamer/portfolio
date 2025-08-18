'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const items = [
  { src: 'https://picsum.photos/seed/carousel53/800/600', caption: 'Caption for image 1' },
  { src: 'https://picsum.photos/seed/carousel54/800/600', caption: 'Caption for image 2' },
  { src: 'https://picsum.photos/seed/carousel55/800/600', caption: 'Caption for image 3' },
];

const Carousel11 = () => {
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(items.length);

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="overflow-hidden relative h-96 rounded-lg">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={item.src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
              <p>{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10094;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10095;</button>
    </div>
  );
};

export default Carousel11;
