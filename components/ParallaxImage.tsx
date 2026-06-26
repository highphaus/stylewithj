"use client";
import React, { useState, useRef } from 'react';

export default function ParallaxImage({ 
  src, 
  alt, 
  containerClassName = "", 
  imageClassName = "" 
}: { 
  src: string; 
  alt: string; 
  containerClassName?: string;
  imageClassName?: string;
}) {
  const [transform, setTransform] = useState("translate(0,0) scale(1.02)");
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    // Move opposite to mouse direction for parallax depth
    setTransform(`translate(${x * -15}px, ${y * -15}px) scale(1.08)`);
  };

  const handleMouseLeave = () => {
    setTransform("translate(0,0) scale(1.02)");
  };

  return (
    <div 
      ref={ref}
      className={`overflow-hidden ${containerClassName}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${imageClassName}`}
        style={{ transform }}
      />
    </div>
  );
}
