'use client';
import React, { useState } from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const images = [
  'https://picsum.photos/seed/carousel104/800/600',
  'https://picsum.photos/seed/carousel105/800/600',
  'https://picsum.photos/seed/carousel106/800/600',
];

const Carousel27 = () => {
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(images.length);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="overflow-hidden relative h-96 rounded-lg cursor-pointer" onClick={openLightbox}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={src} alt={`Carousel image ${index + 1}`} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
          </div>
        ))}
      </div>
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={closeLightbox}>
          <img src={images[currentItem]} alt={`Carousel image ${currentItem + 1}`} className="max-w-full max-h-full" />
        </div>
      )}
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10094;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10095;</button>
    </div>
  );
};

export default Carousel27;
