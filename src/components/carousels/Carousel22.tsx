'use client';
import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';

const events = [
  { year: '2020', title: 'Event 1', image: 'https://picsum.photos/seed/carousel89/800/600' },
  { year: '2021', title: 'Event 2', image: 'https://picsum.photos/seed/carousel90/800/600' },
  { year: '2022', title: 'Event 3', image: 'https://picsum.photos/seed/carousel91/800/600' },
];

const Carousel22 = () => {
  const { currentItem, goToItem, isDragging } = useCarousel(events.length);

  return (
    <div className={`relative w-full max-w-3xl mx-auto h-96 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="overflow-hidden relative h-80 rounded-lg">
        {events.map((event, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentItem === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" onDragStart={(e) => e.preventDefault()} />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
              <h3 className="text-xl font-bold">{event.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        {events.map((event, index) => (
          <button key={index} onClick={() => goToItem(index)} className={`text-lg ${currentItem === index ? 'font-bold' : ''}`}>
            {event.year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel22;
