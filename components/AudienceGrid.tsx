'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

const AUTO_DELAY = 3000; // Example duration matching your interval setup

export default function AudienceGrid() {
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use refs for values that change constantly to avoid breaking useCallback/useEffect dependencies
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startTimer = useCallback(() => {
    // Clean up any stale cycles
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animRef.current) cancelAnimationFrame(animRef.current);

    startTimeRef.current = Date.now();

    // High-frequency UI tick using standard requestAnimationFrame for buttery performance
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / AUTO_DELAY) * 100, 100);
      
      setProgress(pct);

      if (elapsed < AUTO_DELAY) {
        animRef.current = requestAnimationFrame(tick);
      }
    };

    animRef.current = requestAnimationFrame(tick);

    // The execution terminal timeout that actually switches frames
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % 4); // Adjust '4' to your data length
      setProgress(0);
    }, AUTO_DELAY);
  }, []);

  // Trigger setup cleanly only when the actual active slide changes
  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [currentIndex, startTimer]);

  return (
    <div>
      {/* Your Grid Implementation */}
      <div className="w-full bg-black/10 h-[2px]">
        <div className="bg-black h-full" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}