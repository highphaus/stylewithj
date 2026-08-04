'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';

const transformationData = [
  {
    id: "01",
    client: "THE EXECUTIVE ARCHITECT",
    demographic: "FEMALE SILHOUETTE SYSTEM",
    concept: "Deconstructing traditional constraints into structural drop-shoulder lines and deep tonal textures.",
    beforeImg: "/images/Before.jpeg",
    afterImg: "/images/After.jpeg",
    specs: ["Canvas Alteration // Drop Line", "Heavy Matte Crepe Fabrics", "Palette // Pale Bone Tone"]
  },
  {
    id: "02",
    client: "THE MODERN PATRIARCH",
    demographic: "MALE SILHOUETTE SYSTEM",
    concept: "Restructuring upper-torso proportions using monolithic wool structures and raw minimalist layering.",
    beforeImg: "/images/img09.jpeg",
    afterImg: "/images/img10.jpeg",
    specs: ["Proportion Stance // Broadened", "Felted Wool Framework", "Palette // Deep Umber Ash"]
  },
  {
    id: "03",
    client: "THE VISUAL LEGACY FIELD",
    demographic: "FEMALE SILHOUETTE SYSTEM",
    concept: "Curating presence through fluid architectural drapery, asymmetric necklines, and clean geometric lines.",
    beforeImg: "/images/img11.jpeg",
    afterImg: "/images/img12.jpeg",
    specs: ["Fluid Geometric Draping", "Raw Spun Silk Composites", "Palette // True Charcoal Black"]
  },
  {
    id: "04",
    client: "CULTURAL AVANT-GARDE LENS",
    demographic: "MALE SILHOUETTE SYSTEM",
    concept: "A dramatic shift to curated minimalism, blending structured structural drops with historic tailored lines.",
    beforeImg: "/images/img13.jpeg",
    afterImg: "/images/img14.jpeg",
    specs: ["Asymmetric Hem Disruption", "Technical Linen Matrix", "Palette // Slate Graphite"]
  }
];

interface TransformationsProps {
  hideButton?: boolean;
  isStatic?: boolean;
}

export default function Transformations({ hideButton = false }: TransformationsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openLightbox } = useLightbox();

  const currentItem = transformationData[currentIndex];

  // ── AUTOMATIC MOVEMENT TIMER (ROTATES EVERY 5.5 SECONDS) ──
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % transformationData.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleOpenLightbox = (imgSrc: string, label: string) => {
    openLightbox(imgSrc, `${currentItem.client} (${label})`, {
      num: currentItem.id,
      category: currentItem.demographic,
      concept: currentItem.concept,
      story: `${currentItem.concept} — Specifications: ${currentItem.specs.join(' • ')}`,
      fabric: currentItem.specs.join(' • '),
      tag: label
    });
  };

  return (
    <section 
      id="transformations" 
      className="relative w-full h-[100dvh] min-h-[580px] bg-[#FAF9F6] border-b border-black/10 py-4 sm:py-6 overflow-hidden flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between px-4 sm:px-10 lg:px-16 overflow-hidden">
        
        {/* Section Header */}
        <div className="flex-shrink-0 flex items-center justify-between border-b border-black/10 pb-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
            <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1A1A] tracking-tight">
              Transformations
            </h2>
          </div>

          {/* Slide Progress Counter */}
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-black/50 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black/60 animate-pulse" />
            0{currentIndex + 1} / 0{transformationData.length}
          </div>
        </div>

        {/* Dynamic Carousel Slide Container (TRUE VERTICAL TALL PORTRAIT RATIO) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex-1 min-h-0 flex flex-col justify-between my-1 overflow-hidden"
          >
            
            {/* TRUE VERTICAL TALL PORTRAIT CANVAS (MAX-W-2XL FOR CRISP FASHION PORTRAIT PROPORTIONS) */}
            <div className="flex-1 min-h-0 w-full overflow-hidden my-1 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 sm:gap-8 h-full max-h-[66vh] max-w-2xl sm:max-w-3xl mx-auto w-full items-center justify-center">
                
                {/* BEFORE FRAME (TRUE TALL PORTRAIT 2:3 / 3:4) */}
                <div 
                  onClick={() => handleOpenLightbox(currentItem.beforeImg, 'BEFORE')}
                  className="group relative w-full h-full aspect-[2/3] max-h-full mx-auto bg-[#0D0D0D] overflow-hidden border border-black/10 cursor-pointer rounded-xs shadow-md"
                  title="Click to view full high-res image & details"
                >
                  <img
                    src={currentItem.beforeImg}
                    alt={`${currentItem.client} Before`}
                    className="w-full h-full object-cover object-top grayscale-[15%] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 bg-[#FAF9F6]/95 border border-black/10 px-3 py-1 text-[8px] sm:text-[9px] tracking-[0.25em] font-mono text-black uppercase font-bold shadow-xs">
                    BEFORE
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white/90 px-3 py-1 text-[8px] tracking-[0.2em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    ✦ CLICK TO EXPAND
                  </div>
                </div>

                {/* AFTER FRAME (TRUE TALL PORTRAIT 2:3 / 3:4) */}
                <div 
                  onClick={() => handleOpenLightbox(currentItem.afterImg, 'AFTER')}
                  className="group relative w-full h-full aspect-[2/3] max-h-full mx-auto bg-[#0D0D0D] overflow-hidden border border-black/10 cursor-pointer rounded-xs shadow-md"
                  title="Click to view full high-res image & details"
                >
                  <img
                    src={currentItem.afterImg}
                    alt={`${currentItem.client} After`}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 text-[8px] sm:text-[9px] tracking-[0.25em] font-mono uppercase font-bold shadow-xs border border-white/10">
                    AFTER
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white/90 px-3 py-1 text-[8px] tracking-[0.2em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    ✦ CLICK TO EXPAND
                  </div>
                </div>

              </div>
            </div>

            {/* Subtext Bar: Narrative & Specs Underneath */}
            <div className="flex-shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#EFECE6] p-4 border border-black/10 rounded-xs shadow-xs mt-1">
              <div className="flex flex-col gap-0.5 max-w-xl">
                <p className="font-serif text-xs sm:text-sm italic font-light text-black/85 leading-snug">
                  "{currentItem.concept}"
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-black/40 font-bold mr-1">
                    SPECS:
                  </span>
                  {currentItem.specs.map((spec, i) => (
                    <span 
                      key={i} 
                      className="font-mono text-[8px] tracking-wide text-black/75 bg-white/70 px-2 py-0.5 rounded-xs border border-black/5"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                <Link
                  href="/connect"
                  className="tracking-[0.2em] text-[8px] sm:text-[9px] uppercase font-mono font-semibold text-white bg-[#1A1A1A] hover:bg-black transition-all py-2.5 px-4 shadow-xs rounded-xs cursor-pointer"
                >
                  Book Transformation →
                </Link>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Slide Indicator Dots */}
        <div className="flex-shrink-0 flex justify-center items-center gap-2.5 mt-2">
          {transformationData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-[#1A1A1A]' : 'w-1.5 bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}