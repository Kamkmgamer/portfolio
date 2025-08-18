'use client';

import { useState, useEffect, useCallback } from 'react';

export const useCarousel = (itemCount: number, interval = 5000, orientation: 'horizontal' | 'vertical' = 'horizontal') => {
  const [currentItem, setCurrentItem] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [draggedX, setDraggedX] = useState(0);
  const [draggedY, setDraggedY] = useState(0);

  const nextItem = useCallback(() => {
    setCurrentItem((prevItem) => (prevItem + 1) % itemCount);
  }, [itemCount]);

  const prevItem = useCallback(() => {
    setCurrentItem((prevItem) => (prevItem - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goToItem = (index: number) => {
    setCurrentItem(index);
  };

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        nextItem();
      }, interval);
      return () => clearInterval(timer);
    }
  }, [isPlaying, nextItem, interval]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (orientation === 'horizontal') {
        if (event.key === 'ArrowLeft') {
          prevItem();
        }
        if (event.key === 'ArrowRight') {
          nextItem();
        }
      } else {
        if (event.key === 'ArrowUp') {
          prevItem();
        }
        if (event.key === 'ArrowDown') {
          nextItem();
        }
      }
    },
    [prevItem, nextItem, orientation]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setDraggedX(0);
    setDraggedY(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    if (orientation === 'horizontal') {
      setDraggedX(e.clientX - startX);
    } else {
      setDraggedY(e.clientY - startY);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (orientation === 'horizontal') {
      if (draggedX < -50) {
        nextItem();
      }
      if (draggedX > 50) {
        prevItem();
      }
      setDraggedX(0);
    } else {
      if (draggedY < -50) {
        nextItem();
      }
      if (draggedY > 50) {
        prevItem();
      }
      setDraggedY(0);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return {
    currentItem,
    nextItem,
    prevItem,
    goToItem,
    isPlaying,
    setIsPlaying,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    draggedX,
    draggedY,
    isDragging,
  };
};
