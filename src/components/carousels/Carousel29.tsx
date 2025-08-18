'use client';
import React, { useState } from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const allImages = [
  { src: 'https://picsum.photos/seed/carousel113/800/600', category: 'nature' },
  { src: 'https://picsum.photos/seed/carousel114/800/600', category: 'city' },
  { src: 'https://picsum.photos/seed/carousel115/800/600', category: 'nature' },
  { src: 'https://picsum.photos/seed/carousel116/800/600', category: 'animals' },
  { src: 'https://picsum.photos/seed/carousel117/800/600', category: 'city' },
];

const Carousel29 = () => {
  const [filter, setFilter] = useState('all');
  const images = filter === 'all' ? allImages : allImages.filter(img => img.category === filter);
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(images.length);

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="flex justify-center space-x-4 mb-4">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'font-bold' : ''}>All</button>
        <button onClick={() => setFilter('nature')} className={filter === 'nature' ? 'font-bold' : ''}>Nature</button>
        <button onClick={() => setFilter('city')} className={filter === 'city' ? 'font-bold' : ''}>City</button>
        <button onClick={() => setFilter('animals')} className={filter === 'animals' ? 'font-bold' : ''}>Animals</button>
      </div>
      <div className="overflow-hidden relative h-96 rounded-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={image.src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
          </div>
        ))}
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10094;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10095;</button>
    </div>
  );
};

export default Carousel29;
