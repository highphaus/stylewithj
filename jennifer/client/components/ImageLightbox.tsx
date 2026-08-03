// src/components/ImageLightbox.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export interface StoryDetails {
  num?: string;
  category?: string;
  concept?: string;
  fabric?: string;
  story?: string;
  occasion?: string;
  tag?: string;
}

interface LightboxContextType {
  openLightbox: (src: string, title?: string, details?: StoryDetails) => void;
}

const LightboxContext = createContext<LightboxContextType>({
  openLightbox: () => {}
});

export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [activeImage, setActiveImage] = useState<{ 
    src: string; 
    title?: string;
    details?: StoryDetails;
  } | null>(null);

  const openLightbox = (src: string, title?: string, details?: StoryDetails) => {
    setActiveImage({ src, title, details });
  };

  const closeLightbox = () => {
    setActiveImage(null);
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
              className="relative max-w-6xl w-full my-auto bg-[#FAF9F6] text-[#1A1A1A] rounded-xs border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.7)] overflow-hidden cursor-default"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[88vh] overflow-y-auto lg:overflow-visible">
                
                {/* ── LEFT COLUMN: SEPARATE IMAGE VIEWPORT ── */}
                <div className="lg:col-span-7 relative bg-[#0D0D0D] min-h-[380px] sm:min-h-[500px] lg:h-[80vh] flex items-center justify-center p-4">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.title || 'Style with J Editorial Look'}
                    fill
                    className="object-contain object-center"
                    priority
                    unoptimized
                  />
                  <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md text-white/80 px-3 py-1 text-[8px] tracking-[0.3em] font-mono uppercase rounded-xs border border-white/10">
                    ✦ HIGH-RES LOOKBOOK PREVIEW
                  </div>
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

                  {/* CTA Action */}
                  <div className="pt-6 mt-6 border-t border-black/10 flex flex-col gap-3">
                    <Link
                      href="/connect"
                      onClick={closeLightbox}
                      className="group flex items-center justify-between w-full px-6 py-3.5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-all rounded-xs shadow-md"
                    >
                      <span>Inquire About This Look</span>
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
