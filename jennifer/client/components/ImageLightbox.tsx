// src/components/ImageLightbox.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxContextType {
  openLightbox: (src: string, title?: string) => void;
}

const LightboxContext = createContext<LightboxContextType>({
  openLightbox: () => {}
});

export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [activeImage, setActiveImage] = useState<{ src: string; title?: string } | null>(null);

  const openLightbox = (src: string, title?: string) => {
    setActiveImage({ src, title });
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
            className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out select-none"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-base font-mono transition-all border border-white/20 shadow-xl cursor-pointer"
              aria-label="Close image preview"
            >
              ✕
            </button>

            {/* Modal Image Box with Tactile Picking-Up Spring Animation */}
            <motion.div
              initial={{ scale: 0.82, y: 40, opacity: 0, rotate: -1.5 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.85, y: 30, opacity: 0, rotate: 1.5 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center cursor-default"
            >
              <div className="relative w-full h-[70vh] sm:h-[78vh] overflow-hidden rounded-xs border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.6)] bg-neutral-900/60">
                <Image
                  src={activeImage.src}
                  alt={activeImage.title || 'Style with J Editorial Image'}
                  fill
                  className="object-contain object-center"
                  unoptimized
                />
              </div>

              {activeImage.title && (
                <div className="mt-4 px-5 py-2 bg-black/80 rounded-full border border-white/15 backdrop-blur-sm shadow-md">
                  <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase font-light text-white/90">
                    {activeImage.title}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
