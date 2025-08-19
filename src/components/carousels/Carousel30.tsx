'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCarousel } from '../../hooks/useCarousel';

interface PicsumPhoto {
  download_url: string;
}

const Carousel30 = () => {
  const [images, setImages] = useState<string[]>([]);
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(images.length);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=5')
      .then(res => res.json())
      .then(data => setImages(data.map((img: PicsumPhoto) => img.download_url)));
  }, []);

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="overflow-hidden relative h-96 rounded-lg">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src={src}
              alt={`Carousel image ${index + 1}`}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 768px"
            />
          </div>
        ))}
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10094;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10095;</button>
    </div>
  );
};

export default Carousel30;