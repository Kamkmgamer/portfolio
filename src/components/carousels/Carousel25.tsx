'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const items = [
  { title: 'First item', content: 'This is the first item.', color: 'bg-blue-500' },
  { title: 'Second item', content: 'This is the second item.', color: 'bg-green-500' },
  { title: 'Third item', content: 'This is the third item.', color: 'bg-red-500' },
];

const Carousel25 = () => {
  const { currentItem, nextItem, prevItem, isDragging } = useCarousel(items.length);

  return (
    <div className={`relative w-full max-w-3xl mx-auto h-96 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="overflow-hidden relative h-full rounded-lg">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'} ${item.color} text-white flex flex-col items-center justify-center p-8`}>
            <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
      <button onClick={prevItem} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10094;</button>
      <button onClick={nextItem} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2 focus:outline-none">&#10095;</button>
    </div>
  );
};

export default Carousel25;
