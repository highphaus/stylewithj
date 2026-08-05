// src/components/ImageLightbox.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Look, seedLooks } from '@/lib/looks-data';

export interface StoryDetails {
  num?: string;
  category?: string;
  concept?: string;
  fabric?: string;
  story?: string;
  occasion?: string;
  tag?: string;
}

export interface ActiveImageItem {
  src: string;
  title?: string;
  details?: StoryDetails;
}

interface LightboxContextType {
  openLightbox: (src: string, title?: string, details?: StoryDetails) => void;
}

const LightboxContext = createContext<LightboxContextType>({
  openLightbox: () => {}
});

export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [activeImage, setActiveImage] = useState<ActiveImageItem | null>(null);
  const [allGalleryLooks, setAllGalleryLooks] = useState<Look[]>(seedLooks);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Load all available looks from localStorage or seed
  useEffect(() => {
    try {
      const stored = localStorage.getItem('swj_looks');
      if (stored) {
        setAllGalleryLooks(JSON.parse(stored));
      } else {
        setAllGalleryLooks(seedLooks);
      }
    } catch {
      setAllGalleryLooks(seedLooks);
    }
  }, []);

  const openLightbox = (src: string, title?: string, details?: StoryDetails) => {
    // Check if item matches a seed look
    const foundIndex = allGalleryLooks.findIndex(l => l.image === src);
    if (foundIndex !== -1) {
      const found = allGalleryLooks[foundIndex];
      setActiveImage({
        src: found.image,
        title: found.title,
        details: {
          num: found.num,
          category: found.category,
          concept: found.concept,
          fabric: found.fabric,
          story: found.story,
          occasion: found.occasion,
          tag: found.tag,
        }
      });
    } else {
      setActiveImage({ src, title, details });
    }
  };

  const closeLightbox = () => {
    setActiveImage(null);
  };

  const currentIdx = activeImage 
    ? allGalleryLooks.findIndex(l => l.image === activeImage.src)
    : -1;

  const handlePrev = () => {
    if (currentIdx > 0) {
      const prevLook = allGalleryLooks[currentIdx - 1];
      setActiveImage({
        src: prevLook.image,
        title: prevLook.title,
        details: {
          num: prevLook.num,
          category: prevLook.category,
          concept: prevLook.concept,
          fabric: prevLook.fabric,
          story: prevLook.story,
          occasion: prevLook.occasion,
          tag: prevLook.tag,
        }
      });
    }
  };

  const handleNext = () => {
    if (currentIdx !== -1 && currentIdx < allGalleryLooks.length - 1) {
      const nextLook = allGalleryLooks[currentIdx + 1];
      setActiveImage({
        src: nextLook.image,
        title: nextLook.title,
        details: {
          num: nextLook.num,
          category: nextLook.category,
          concept: nextLook.concept,
          fabric: nextLook.fabric,
          story: nextLook.story,
          occasion: nextLook.occasion,
          tag: nextLook.tag,
        }
      });
    }
  };

  // Keyboard navigation & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, allGalleryLooks]);

  // Touch Swipe Handlers for mobile horizontal swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext(); // Swiped left -> show next
      } else {
        handlePrev(); // Swiped right -> show prev
      }
    }
    setTouchStartX(null);
  };

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-zoom-out select-none overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="fixed top-4 right-4 z-[10000] w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center text-sm font-mono transition-all border border-white/20 shadow-xl cursor-pointer"
              aria-label="Close image preview"
            >
              ✕
            </button>

            {/* Separate Image & Story Modal Window */}
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative max-w-6xl w-full my-auto bg-[#FAF9F6] text-[#1A1A1A] rounded-xs border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.7)] overflow-hidden cursor-default"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[88vh] overflow-y-auto lg:overflow-visible">
                
                {/* ── LEFT COLUMN: SEPARATE IMAGE VIEWPORT (WITH HORIZONTAL SWIPE + NAVIGATION BUTTONS) ── */}
                <div className="lg:col-span-7 relative bg-[#0D0D0D] min-h-[380px] sm:min-h-[500px] lg:h-[80vh] flex items-center justify-center p-4 group">
                  <Image
                    key={activeImage.src}
                    src={activeImage.src}
                    alt={activeImage.title || 'Style with J Editorial Look'}
                    fill
                    className="object-contain object-center transition-all duration-300"
                    priority
                    unoptimized
                  />

                  {/* Horizontal Prev / Next Overlay Buttons */}
                  {currentIdx > 0 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-lg font-mono border border-white/20 shadow-lg cursor-pointer transition-all z-20"
                      title="Previous Image (Swipe Right)"
                    >
                      ‹
                    </button>
                  )}

                  {currentIdx !== -1 && currentIdx < allGalleryLooks.length - 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-lg font-mono border border-white/20 shadow-lg cursor-pointer transition-all z-20"
                      title="Next Image (Swipe Left)"
                    >
                      ›
                    </button>
                  )}
                </div>

                {/* ── RIGHT COLUMN: SEPARATE STORY & STYLING DETAILS PANEL ── */}
                <div className="lg:col-span-5 p-6 sm:p-10 bg-[#FAF9F6] flex flex-col justify-between overflow-y-auto lg:h-[80vh] border-t lg:border-t-0 lg:border-l border-black/10">
                  <div className="flex flex-col gap-6">
                    
                    {/* Category & Look Number */}
                    <div className="flex items-center justify-between pb-4 border-b border-black/10">
                      <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-black/50 font-bold">
                        {activeImage.details?.num ? `LOOK /${activeImage.details.num}` : 'LOOKBOOK EDIT'}
                      </span>
                      <span className="px-3 py-1 bg-[#1A1A1A] text-white text-[8px] tracking-[0.25em] font-mono uppercase font-semibold rounded-xs">
                        {activeImage.details?.category || 'CURATED STYLE'}
                      </span>
                    </div>

                    {/* Look Title */}
                    <h3 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1A1A] leading-tight">
                      {activeImage.title || 'Curated Silhouette Curation'}
                    </h3>

                    {/* Story Narrative Section */}
                    <div className="flex flex-col gap-2 pt-2">
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/40 font-bold">
                        THE STORY & STYLING NOTES
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-black/80 font-light leading-relaxed border-l-2 border-black/20 pl-4 py-1">
                        {activeImage.details?.story || 
                         'A continuous study in motion, proportion, and structural drape. Built for effortless transition and elevated everyday confidence.'}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/10 text-xs">
                      {activeImage.details?.concept && (
                        <div className="flex flex-col gap-1 bg-[#EFECE6] p-3 rounded-xs border border-black/5">
                          <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/40 font-bold">CONCEPT</span>
                          <span className="font-sans text-xs text-black/90 font-medium">{activeImage.details.concept}</span>
                        </div>
                      )}

                      {activeImage.details?.fabric && (
                        <div className="flex flex-col gap-1 bg-[#EFECE6] p-3 rounded-xs border border-black/5">
                          <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/40 font-bold">FABRIC & DRAPE</span>
                          <span className="font-sans text-xs text-black/90 font-medium">{activeImage.details.fabric}</span>
                        </div>
                      )}

                      {activeImage.details?.occasion && (
                        <div className="col-span-1 sm:col-span-2 flex flex-col gap-1 bg-[#EFECE6] p-3 rounded-xs border border-black/5">
                          <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/40 font-bold">OCCASION</span>
                          <span className="font-sans text-xs text-black/90 font-medium">{activeImage.details.occasion}</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* CTA Action & Navigation controls */}
                  <div className="pt-6 mt-6 border-t border-black/10 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      {currentIdx > 0 && (
                        <button
                          onClick={handlePrev}
                          className="px-4 py-3 border border-black/20 text-[9px] font-mono uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all rounded-xs"
                        >
                          ← Previous
                        </button>
                      )}
                      {currentIdx !== -1 && currentIdx < allGalleryLooks.length - 1 && (
                        <button
                          onClick={handleNext}
                          className="flex-1 py-3 border border-black/20 text-[9px] font-mono uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all rounded-xs text-center"
                        >
                          Next Look →
                        </button>
                      )}
                    </div>

                    <Link
                      href="/connect"
                      onClick={closeLightbox}
                      className="group flex items-center justify-between w-full px-6 py-3.5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-all rounded-xs shadow-md"
                    >
                      <span>Book Consultation / Inquire</span>
                      <span className="transform group-hover:translate-x-1.5 transition-transform">→</span>
                    </Link>
                  </div>

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
