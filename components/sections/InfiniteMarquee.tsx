// src/components/sections/InfiniteMarquee.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fullLooks = [
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600',
];

const detailTextures = [
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600',
  'https://images.unsplash.com/photo-152436991641-6745cdb1723f?q=80&w=600',
];

export default function InfiniteMarquee() {
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  const upperStream = [...fullLooks, ...fullLooks, ...fullLooks];
  const lowerStream = [...detailTextures, ...detailTextures, ...detailTextures];

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="bg-[#FAF9F6] py-36 border-t border-neutral-200/60 overflow-hidden w-full relative cursor-none"
    >
      
      {/* 1. EDITORIAL TEXT ARCHITECTURE */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <span className="font-mono text-[9px] tracking-[0.6em] text-neutral-400 uppercase block mb-3">
            Atelier Feed // Vol_026
          </span>
          <h3 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-[#1A1A1A] leading-none">
            The Lookbook Stream
          </h3>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <p className="font-sans text-[11px] tracking-widest text-neutral-500 uppercase font-light max-w-xs leading-relaxed text-left md:text-right">
            Dual-axis matrix displaying structural compositions and micro textile alignments simultaneously.
          </p>
          <a 
            href="/gallery" 
            className="font-mono text-[9px] tracking-[0.25em] text-black hover:text-neutral-500 uppercase border-b border-black pb-1 transition-colors"
          >
            Access Full Archive (84+) →
          </a>
        </div>
      </div>

      {/* 2. TRACK SYSTEM MATRIX */}
      <div className="flex flex-col gap-8 relative select-none">
        
        {/* UPPER TRACK: Moves Right to Left (Full Silhouette Profiles) */}
        <div className="flex w-full overflow-hidden relative">
          <motion.div 
            className="flex gap-8 pr-8 flex-shrink-0"
            animate={{ x: [0, '-33.33%'] }}
            transition={{ ease: "linear", duration: 32, repeat: Infinity }}
          >
            {upperStream.map((src, idx) => {
              const uniqueId = `upper-${idx}`;
              return (
                <div 
                  key={uniqueId}
                  onMouseEnter={() => setHoveredIdx(uniqueId)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="relative w-[220px] md:w-[280px] aspect-[2/3] overflow-hidden bg-neutral-100 border border-neutral-200/40 group"
                >
                  <Image
                    src={src}
                    alt="Runway Blueprint Frame"
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-all duration-1000 ease-out"
                    sizes="(max-width: 768px) 220px, 280px"
                  />
                  <div className="absolute inset-0 border border-black/0 group-hover:border-black/20 transition-colors duration-500" />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* LOWER TRACK: Moves Left to Right (Micro Textile Textures) */}
        <div className="flex w-full overflow-hidden relative">
          <motion.div 
            className="flex gap-8 pl-8 flex-shrink-0"
            animate={{ x: ['-33.33%', '0%'] }}
            transition={{ ease: "linear", duration: 26, repeat: Infinity }}
          >
            {lowerStream.map((src, idx) => {
              const uniqueId = `lower-${idx}`;
              return (
                <div 
                  key={uniqueId}
                  onMouseEnter={() => setHoveredIdx(uniqueId)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="relative w-[280px] md:w-[360px] aspect-[16/10] overflow-hidden bg-neutral-100 border border-neutral-200/40 group"
                >
                  <Image
                    src={src}
                    alt="Textile Blueprint Micro"
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-all duration-1000 ease-out"
                    sizes="(max-width: 768px) 280px, 360px"
                  />
                  <div className="absolute inset-0 border border-black/0 group-hover:border-black/20 transition-colors duration-500" />
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>

      {/* 3. TECHNICAL SPEC CAD CURSOR */}
      <div 
        style={{ left: mousePos.x, top: mousePos.y }}
        className="absolute pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hidden md:flex"
      >
        {/* Studio Alignment Reticle Crosshairs */}
        <div className="absolute w-12 h-px bg-neutral-400/40" />
        <div className="absolute h-12 w-px bg-neutral-400/40" />
        <div className="w-1 h-1 bg-black rounded-full" />
        
        {/* Dynamic Parameter Display readout tag */}
        <div className="absolute top-4 left-4 font-mono text-[7px] text-neutral-400 bg-[#FAF9F6] border border-neutral-200 px-1.5 py-0.5 whitespace-nowrap tracking-widest uppercase">
          {hoveredIdx ? `TRACK_LOCK // ${hoveredIdx.toUpperCase()}` : `CAD_MATRIX // X:${mousePos.x} Y:${mousePos.y}`}
        </div>
      </div>

    </section>
  );
}