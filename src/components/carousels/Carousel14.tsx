'use client';
import React, { useEffect, useState } from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel62/800/600',
  'https://picsum.photos/seed/carousel63/800/600',
  'https://picsum.photos/seed/carousel64/800/600',
];

const Carousel14 = () => {
  const interval = 5000;
  const { currentItem, nextItem, isDragging } = useCarousel(images.length, interval);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      setProgress((elapsedTime / interval) * 100);
    }, 100);

    return () => clearInterval(timer);
  }, [currentItem]);

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="overflow-hidden relative h-96 rounded-lg">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
        <div className="h-1 bg-blue-500" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default Carousel14;
