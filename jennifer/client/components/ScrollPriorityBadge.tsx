'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollPriorityBadgeProps {
  text?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
}

export default function ScrollPriorityBadge({
  text = 'Click & View',
  icon = '👁',
  onClick,
  className = '',
}: ScrollPriorityBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const parentEl = badgeRef.current?.parentElement;
    if (!parentEl) return;

    // Lightweight single-threshold observer for maximum scroll performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35);
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(parentEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={badgeRef}
      onClick={onClick}
      className={`absolute bottom-4 left-4 z-30 bg-black/90 text-white px-3.5 py-1.5 rounded-full border border-white/30 text-[9px] font-mono tracking-[0.2em] uppercase flex items-center gap-1.5 shadow-xl transition-all duration-300 ease-out transform transform-gpu ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
      } ${className}`}
    >
      <span>{text}</span>
      <span className="text-[10px]">{icon}</span>
    </div>
  );
}
