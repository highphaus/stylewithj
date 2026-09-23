// src/components/ImageLightbox.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Look, seedLooks } from '@/lib/looks-data';

const STORAGE_KEY = 'swj_looks_v3';

export interface StoryDetails {
  id?: string;
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
  const [activeItem, setActiveItem] = useState<ActiveImageItem | null>(null);
  const [allGalleryLooks, setAllGalleryLooks] = useState<Look[]>(seedLooks);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Load all available looks from localStorage or seed
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Look[] = JSON.parse(stored);
        if (parsed.length < seedLooks.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(seedLooks));
          setAllGalleryLooks(seedLooks);
        } else {
          setAllGalleryLooks(parsed);
        }
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedLooks));
        setAllGalleryLooks(seedLooks);
      }
    } catch {
      setAllGalleryLooks(seedLooks);
    }
  }, []);

  const openLightbox = (src: string, title?: string, details?: StoryDetails) => {
    // Find matching look in seed or allGalleryLooks by src, num, or id
    const foundIndex = allGalleryLooks.findIndex(
      l => l.image === src || (details?.num && l.num === details.num) || (details?.id && l.id === details.id)
    );

    let foundLook: Look | undefined;
    if (foundIndex !== -1) {
      foundLook = allGalleryLooks[foundIndex];
    }

    setActiveItem({
      src: foundLook?.image || src,
      title: foundLook?.title || title,
      details: {
        id: foundLook?.id || details?.id,
        num: foundLook?.num || details?.num,
        category: foundLook?.category || details?.category,
        concept: foundLook?.concept || details?.concept,
        fabric: foundLook?.fabric || details?.fabric,
        story: foundLook?.story || details?.story,
        occasion: foundLook?.occasion || details?.occasion,
        tag: foundLook?.tag || details?.tag,
      },
    });
  };

  const closeLightbox = () => {
    setActiveItem(null);
  };

  // Find index of the currently active look in allGalleryLooks
  const currentLookIndex = useMemo(() => {
    if (!activeItem) return -1;
    return allGalleryLooks.findIndex(
      l => (activeItem.details?.num && l.num === activeItem.details.num) ||
           (activeItem.details?.id && l.id === activeItem.details.id) ||
           l.image === activeItem.src
    );
  }, [activeItem, allGalleryLooks]);

  const selectLookByIndex = (idx: number) => {
    if (idx < 0 || idx >= allGalleryLooks.length) return;
    const targetLook = allGalleryLooks[idx];
    setActiveItem({
      src: targetLook.image,
      title: targetLook.title,
      details: {
        id: targetLook.id,
        num: targetLook.num,
        category: targetLook.category,
        concept: targetLook.concept,
        fabric: targetLook.fabric,
        story: targetLook.story,
        occasion: targetLook.occasion,
        tag: targetLook.tag,
      },
    });
  };

  // Clean Look-to-Look navigation (1 photo per look, no 3-photo concept)
  const handlePrev = () => {
    const prevIdx = currentLookIndex > 0 ? currentLookIndex - 1 : allGalleryLooks.length - 1;
    selectLookByIndex(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = currentLookIndex < allGalleryLooks.length - 1 ? currentLookIndex + 1 : 0;
    selectLookByIndex(nextIdx);
  };

  // Keyboard navigation & Escape
  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, currentLookIndex, allGalleryLooks]);

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
        handleNext(); // Swiped left -> show next look
      } else {
        handlePrev(); // Swiped right -> show prev look
      }
    }
    setTouchStartX(null);
  };

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-5 cursor-zoom-out select-none overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="fixed top-4 right-4 z-[10000] w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center text-sm font-mono transition-all border border-white/20 shadow-xl cursor-pointer"
              aria-label="Close image preview"
            >
              ✕
            </button>

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ scale: 0.94, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 16, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full my-auto bg-[#FAF9F6] text-[#1A1A1A] rounded-xs border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.7)] overflow-hidden cursor-default"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto lg:overflow-visible">
                
                {/* ── LEFT COLUMN: SINGLE HIGH-RES LOOK PHOTO VIEWPORT WITH ARROWS ── */}
                <div 
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="lg:col-span-7 relative bg-[#0D0D0D] min-h-[420px] sm:min-h-[520px] lg:h-[82vh] flex flex-col items-center justify-between p-3 sm:p-5 group overflow-hidden"
                >
                  {/* Top Bar inside Viewport: Look Counter & Quick Prev/Next controls */}
                  <div className="w-full flex items-center justify-between z-30 pb-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="px-2 py-1 bg-black/80 hover:bg-white hover:text-black text-white text-[9px] font-mono rounded-xs border border-white/20 cursor-pointer transition-all"
                        title="Previous Look in Archive"
                      >
                        ‹
                      </button>
                      <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-white text-[9px] font-mono tracking-[0.25em] uppercase border border-white/15 rounded-xs">
                        LOOK {activeItem.details?.num || String(currentLookIndex + 1).padStart(2, '0')} OF {String(allGalleryLooks.length).padStart(2, '0')}
                      </span>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-2 py-1 bg-black/80 hover:bg-white hover:text-black text-white text-[9px] font-mono rounded-xs border border-white/20 cursor-pointer transition-all"
                        title="Next Look in Archive"
                      >
                        ›
                      </button>
                    </div>

                    <span className="px-2.5 py-1 bg-white/10 text-white/70 text-[8px] font-mono tracking-[0.2em] uppercase rounded-xs hidden sm:inline-block">
                      {activeItem.details?.category || 'EDITORIAL'}
                    </span>
                  </div>

                  {/* Single Clean Look Image */}
                  <div className="relative w-full flex-1 flex items-center justify-center min-h-[320px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeItem.src}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full h-full min-h-[340px] sm:min-h-[440px]"
                      >
                        <Image
                          src={activeItem.src}
                          alt={activeItem.title || 'Style with J Editorial Look'}
                          fill
                          className="object-contain object-center"
                          priority
                          unoptimized
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Prev & Next Look Navigation Arrows */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center text-xl font-mono border border-white/20 shadow-lg cursor-pointer transition-all z-30 active:scale-95"
                      title="Previous Look (Swipe Right)"
                      aria-label="Previous look"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center text-xl font-mono border border-white/20 shadow-lg cursor-pointer transition-all z-30 active:scale-95"
                      title="Next Look (Swipe Left)"
                      aria-label="Next look"
                    >
                      ›
                    </button>
                  </div>

                  {/* Bottom Counter Bar */}
                  <div className="w-full pt-2 z-30 flex items-center justify-between text-white/50 text-[8.5px] font-mono tracking-widest uppercase border-t border-white/10">
                    <span>SWIPE OR USE ARROWS TO BROWSE</span>
                    <span>{currentLookIndex + 1} / {allGalleryLooks.length}</span>
                  </div>
                </div>

                {/* ── RIGHT COLUMN: STORY & STYLING DETAILS PANEL ── */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-[#FAF9F6] flex flex-col justify-between overflow-y-auto lg:h-[82vh] border-t lg:border-t-0 lg:border-l border-black/10">
                  <div className="flex flex-col gap-5">
                    
                    {/* Category & Look Number */}
                    <div className="flex items-center justify-between pb-4 border-b border-black/10">
                      <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-black/50 font-bold">
                        {activeItem.details?.num ? `LOOK /${activeItem.details.num}` : 'LOOKBOOK EDIT'}
                      </span>
                      <span className="px-3 py-1 bg-[#1A1A1A] text-white text-[8px] tracking-[0.25em] font-mono uppercase font-semibold rounded-xs">
                        {activeItem.details?.category || 'CURATED STYLE'}
                      </span>
                    </div>

                    {/* Look Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] leading-tight">
                      {activeItem.title || 'Curated Silhouette Curation'}
                    </h3>

                    {/* Story Narrative Section */}
                    <div className="flex flex-col gap-2 pt-1">
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/40 font-bold">
                        THE STORY & STYLING NOTES
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-black/80 font-light leading-relaxed border-l-2 border-black/20 pl-4 py-1">
                        {activeItem.details?.story || 
                         'A continuous study in motion, proportion, and structural drape. Built for effortless transition and elevated everyday confidence.'}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-black/10 text-xs">
                      {activeItem.details?.concept && (
                        <div className="flex flex-col gap-1 bg-[#EFECE6] p-3 rounded-xs border border-black/5">
                          <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/40 font-bold">CONCEPT</span>
                          <span className="font-sans text-xs text-black/90 font-medium">{activeItem.details.concept}</span>
                        </div>
                      )}

                      {activeItem.details?.fabric && (
                        <div className="flex flex-col gap-1 bg-[#EFECE6] p-3 rounded-xs border border-black/5">
                          <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/40 font-bold">FABRIC & DRAPE</span>
                          <span className="font-sans text-xs text-black/90 font-medium">{activeItem.details.fabric}</span>
                        </div>
                      )}

                      {activeItem.details?.occasion && (
                        <div className="col-span-1 sm:col-span-2 flex flex-col gap-1 bg-[#EFECE6] p-3 rounded-xs border border-black/5">
                          <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/40 font-bold">OCCASION</span>
                          <span className="font-sans text-xs text-black/90 font-medium">{activeItem.details.occasion}</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Navigation controls between looks & CTA Action */}
                  <div className="pt-6 mt-6 border-t border-black/10 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="flex-1 py-3 border border-black/20 text-[9px] font-mono uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all rounded-xs cursor-pointer text-center"
                      >
                        ← Prev Look
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 py-3 border border-black/20 text-[9px] font-mono uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all rounded-xs text-center cursor-pointer"
                      >
                        Next Look →
                      </button>
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
