'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel26/800/600',
  'https://picsum.photos/seed/carousel27/800/600',
  'https://picsum.photos/seed/carousel28/800/600',
  'https://picsum.photos/seed/carousel29/800/600',
  'https://picsum.photos/seed/carousel30/800/600',
];

const Carousel6 = () => {
  const { currentItem, isPlaying, setIsPlaying, handleMouseDown, handleMouseUp, isDragging } = useCarousel(images.length, 3000);

  const handleDragStart = (e: React.MouseEvent) => {
    setIsPlaying(false);
    handleMouseDown(e);
  };

  const handleDragEnd = () => {
    setIsPlaying(true);
    handleMouseUp();
  };

  return (
    <div
      className={`relative w-full max-w-3xl mx-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}>
      <div className="overflow-hidden relative h-96 rounded-lg">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
          </div>
        ))}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white text-2xl">Paused</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel6;