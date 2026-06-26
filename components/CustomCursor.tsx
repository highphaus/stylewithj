"use client";
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over links, buttons, or images
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button') ||
        target.tagName.toLowerCase() === 'img'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    const interactables = document.querySelectorAll('a, button, input, select, textarea');
    interactables.forEach(el => {
      (el as HTMLElement).style.cursor = 'none';
    });
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Outer Trailing Ring */}
      <div 
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[99] flex items-center justify-center transition-all duration-[400ms] ease-out mix-blend-difference ${isHovering ? 'scale-[1.8] bg-[#F7F5F0] border-transparent' : 'scale-100 bg-transparent border-[#F7F5F0]'}`}
        style={{ 
          transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0)`
        }}
      ></div>

      {/* Inner Fast Dot */}
      <div 
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-[#F7F5F0] pointer-events-none z-[100] transition-opacity duration-300 mix-blend-difference ${isHovering ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`
        }}
      ></div>
    </>
  );
}
