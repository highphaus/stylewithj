// src/components/sections/ExhibitionShowcase.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface VideoLook {
  id: string;
  tag: string;
  title: string;
  thumbnail: string;
  conceptUrl: string;
}

const exhibitionLooks: VideoLook[] = [
  {
    id: 'moment-1',
    tag: '#GLVPS // THE GRAND ENTRANCE',
    title: 'Ethereal Illusion Bodice & Veil Scale',
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800',
    conceptUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200'
  },
  {
    id: 'moment-2',
    tag: '#GLVPS // THE ATELIER REVEAL',
    title: 'Sculpted Corsetry & Hand-Placed Applique',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800',
    conceptUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200'
  }
];

export default function ExhibitionShowcase() {
  const [activeMedia, setActiveMedia] = useState<string | null>(null);
  const activeItem = exhibitionLooks.find(look => look.id === activeMedia);

  return (
    <section className="px-6 md:px-16 py-32 max-w-7xl mx-auto bg-[#FAF9F6]">
      
      {/* Editorial Title Block */}
      <div className="mb-24 border-b border-neutral-200 pb-10">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-neutral-400 block mb-3">
          Celebrating Iconic Moments
        </span>
        <h3 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-[#1A1A1A]">
          The Narrative Stream
        </h3>
      </div>

      {/* Asymmetric Exhibition Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {exhibitionLooks.map((look, index) => (
          <div 
            key={look.id}
            className={`w-full flex flex-col cursor-pointer ${index % 2 === 1 ? 'md:mt-24' : ''}`}
            onClick={() => setActiveMedia(look.id)}
          >
            {/* Visual Display Card with Hover Scale */}
            <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 group mb-6">
              <Image
                src={look.thumbnail}
                alt={look.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/40 px-4 py-2 backdrop-blur-[2px]">
                  View Fragment
                </span>
              </div>
            </div>

            {/* Typography Frame Subtext */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-400">
                {look.tag}
              </span>
              <h4 className="font-serif text-xl font-light tracking-wide text-[#1A1A1A]">
                {look.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Immersive Playback Frame */}
      <AnimatePresence>
        {activeMedia && activeItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMedia(null)}
            className="fixed inset-0 bg-black/90 z-[10000] flex items-center justify-center p-6 md:p-16 backdrop-blur-sm cursor-zoom-out"
          >
            <div className="relative w-full max-w-5xl aspect-video bg-neutral-900 overflow-hidden shadow-2xl">
              <Image 
                src={activeItem.conceptUrl} 
                alt="Expanded Look Details" 
                fill 
                className="object-cover"
              />
              {/* Top Control Bar */}
              <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent text-white">
                <span className="font-mono text-[10px] tracking-widest opacity-60">
                  {activeItem.tag}
                </span>
                <button className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}