'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface EditorialReview {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
}

export const EDITORIAL_REVIEWS: EditorialReview[] = [
  {
    id: 'rev-01',
    quote: "Jennifer completely redefined how I perceive my silhouette. The change in how board members and peers respond was immediate. My wardrobe finally matches my seniority without feeling stiff or performative.",
    author: "R. Varma",
    role: "Managing Partner",
    location: "Bangalore",
    rating: 5,
  },
  {
    id: 'rev-02',
    quote: "Jennifer completely transformed how I present myself for investor summits and keynotes. My wardrobe finally reflects my leadership style with authentic, effortless polish.",
    author: "Ananya R.",
    role: "Founder & CEO",
    location: "New Delhi",
    rating: 5,
  },
  {
    id: 'rev-03',
    quote: "The shift was extraordinary. People at events take note of the balance between raw Indian textures and sharp contemporary cuts. It is the first time clothes felt authentically mine.",
    author: "K. Nambiar",
    role: "Creative Director",
    location: "Indiranagar",
    rating: 5,
  },
  {
    id: 'rev-04',
    quote: "Jennifer understood exactly what I needed for high-stakes investor summits in Singapore and Bangalore. The transformation gave me commanding poise without sacrificing comfort.",
    author: "Dr. A. Menon",
    role: "VP Global Strategy",
    location: "Bengaluru & Singapore",
    rating: 5,
  },
  {
    id: 'rev-05',
    quote: "A true masterclass in proportion and restraint. Jennifer stripped away the unnecessary noise and built an evening look that makes me feel poised and invincible every single time.",
    author: "P. Sen",
    role: "Tech Founder",
    location: "Whitefield",
    rating: 5,
  },
  {
    id: 'rev-06',
    quote: "Working with Style with J gave me structural clarity. I no longer panic when getting dressed for international exhibitions. Every single piece now has purpose and precision.",
    author: "Meera K.",
    role: "Principal Architect",
    location: "Mumbai",
    rating: 5,
  },
];

export default function EditorialReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = EDITORIAL_REVIEWS.length;
  const current = EDITORIAL_REVIEWS[currentIndex];

  // Auto-cycle every 6 seconds, pausing on hover/interaction
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Touch Swipe Handlers for mobile devices
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="reviews-carousel"
      className="w-full bg-[#FAF9F6] border-t border-black/10 py-16 sm:py-24 lg:py-28 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        
        {/* Top Header */}
        <div className="flex flex-col items-center gap-3 mb-10 sm:mb-14">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-black/50 font-bold">
            ✦ CLIENT ACCLAIM &amp; VERIFIED EXPERIENCES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight">
            Words from the <span className="italic font-normal text-black/50">Atelier</span>
          </h2>
          <p className="font-serif text-xs sm:text-sm italic text-black/60 font-light max-w-xl mx-auto">
            Real perspectives from leaders, founders, and creatives who transformed their silhouette and presence.
          </p>
        </div>

        {/* ── PURE WRITINGS / TYPOGRAPHY CAROUSEL CARD ── */}
        <div className="relative min-h-[300px] sm:min-h-[260px] md:min-h-[240px] flex items-center justify-center max-w-4xl mx-auto">
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, y: direction > 0 ? 16 : -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? -16 : 16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6 w-full"
            >
              {/* Star Rating & Verified Pill */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[#D4AF37] text-xs">
                  {'★'.repeat(current.rating)}
                </div>
                <span className="text-black/25">•</span>
                <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/45 font-bold">
                  VERIFIED CLIENT
                </span>
              </div>

              {/* Large Editorial Quotation */}
              <blockquote className="font-serif text-lg sm:text-2xl md:text-3xl font-light italic leading-relaxed text-[#1A1A1A] max-w-3xl mx-auto">
                "{current.quote}"
              </blockquote>

              {/* Author & Location Details */}
              <div className="flex flex-col items-center gap-1 pt-2">
                <div className="font-serif text-base sm:text-lg font-medium text-black">
                  {current.author}
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-black/50">
                  {current.role} &middot; {current.location}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* ── CAROUSEL CONTROLS: ARROWS, COUNTER & DOTS ── */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-6">
          
          {/* Arrows & Counter Bar */}
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-black/15 bg-white/70 hover:bg-black hover:text-white transition-all flex items-center justify-center font-mono text-xs cursor-pointer shadow-xs hover:scale-105"
            >
              &larr;
            </button>

            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-black/50 font-medium">
              0{currentIndex + 1} / 0{total}
            </span>

            <button
              onClick={handleNext}
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-black/15 bg-white/70 hover:bg-black hover:text-white transition-all flex items-center justify-center font-mono text-xs cursor-pointer shadow-xs hover:scale-105"
            >
              &rarr;
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {EDITORIAL_REVIEWS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => handleSelect(dotIdx)}
                aria-label={`Go to review ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIdx === currentIndex
                    ? 'w-7 h-1.5 bg-black'
                    : 'w-1.5 h-1.5 bg-black/20 hover:bg-black/50'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

