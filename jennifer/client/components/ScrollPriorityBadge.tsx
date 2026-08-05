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
    // Reference the parent image container element
    const parentEl = badgeRef.current?.parentElement;
    if (!parentEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the target image is prioritized in the viewport (threshold 45%)
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      }
    );

    observer.observe(parentEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={badgeRef}
      onClick={onClick}
      className={`absolute bottom-4 left-4 z-30 bg-black/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full border border-white/30 text-[9px] font-mono tracking-[0.2em] uppercase flex items-center gap-1.5 shadow-2xl transition-all duration-500 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-3 scale-90 pointer-events-none'
      } ${className}`}
    >
      <span>{text}</span>
      <span className="text-[10px]">{icon}</span>
    </div>
  );
}
