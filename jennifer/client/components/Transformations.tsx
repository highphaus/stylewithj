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
      className="relative w-full bg-[#FAF9F6] border-b border-black/10 py-12 sm:py-20 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
              <span className="text-[10px] tracking-[0.4em] uppercase font-light text-black/50 font-sans font-semibold">
                VISUAL IDENTITY ARCHIVE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-tight">
              Transformations
            </h2>
          </div>

          {/* Slide Progress Counter */}
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-black/50 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black/60 animate-pulse" />
            0{currentIndex + 1} / 0{transformationData.length}
          </div>
        </div>

        {/* Dynamic Carousel Slide Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col gap-6"
          >
            
            {/* EXPANDED MAXIMUM HEIGHT PORTRAIT PHOTO CANVAS PROJECTION (HEADER TEXT REMOVED SO IMAGES COVER AREA FULLY) */}
            <div className="w-full">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                
                {/* BEFORE FRAME */}
                <div 
                  onClick={() => handleOpenLightbox(currentItem.beforeImg, 'BEFORE')}
                  className="group relative w-full h-[80vh] min-h-[500px] sm:min-h-[600px] bg-[#0D0D0D] overflow-hidden border border-black/10 cursor-pointer rounded-xs shadow-md"
                  title="Click to view full high-res image & details"
                >
                  <img
                    src={currentItem.beforeImg}
                    alt={`${currentItem.client} Before`}
                    className="w-full h-full object-cover object-top grayscale-[15%] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-[#FAF9F6]/95 border border-black/10 px-3.5 py-1.5 text-[8px] sm:text-[9px] tracking-[0.25em] font-mono text-black uppercase font-bold shadow-xs">
                    BEFORE // INITIAL FIT
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white/90 px-3.5 py-1.5 text-[8px] tracking-[0.25em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    ✦ CLICK TO EXPAND
                  </div>
                </div>

                {/* AFTER FRAME */}
                <div 
                  onClick={() => handleOpenLightbox(currentItem.afterImg, 'AFTER')}
                  className="group relative w-full h-[80vh] min-h-[500px] sm:min-h-[600px] bg-[#0D0D0D] overflow-hidden border border-black/10 cursor-pointer rounded-xs shadow-md"
                  title="Click to view full high-res image & details"
                >
                  <img
                    src={currentItem.afterImg}
                    alt={`${currentItem.client} After`}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 right-4 bg-black text-white px-3.5 py-1.5 text-[8px] sm:text-[9px] tracking-[0.25em] font-mono uppercase font-bold shadow-xs border border-white/10">
                    AFTER // REFINED SILHOUETTE
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white/90 px-3.5 py-1.5 text-[8px] tracking-[0.25em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    ✦ CLICK TO EXPAND
                  </div>
                </div>

              </div>
            </div>

            {/* Subtext Bar: Narrative & Specs Underneath */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#EFECE6] p-6 border border-black/10 rounded-xs shadow-xs">
              <div className="flex flex-col gap-1 max-w-xl">
                <p className="font-serif text-sm sm:text-base italic font-light text-black/85 leading-relaxed">
                  "{currentItem.concept}"
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/40 font-bold mr-1">
                    SPECS:
                  </span>
                  {currentItem.specs.map((spec, i) => (
                    <span 
                      key={i} 
                      className="font-mono text-[9px] tracking-wide text-black/75 bg-white/70 px-2.5 py-0.5 rounded-xs border border-black/5"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                <Link
                  href="/connect"
                  className="tracking-[0.25em] text-[9px] uppercase font-mono font-semibold text-white bg-[#1A1A1A] hover:bg-black transition-all py-3 px-6 shadow-xs rounded-xs cursor-pointer"
                >
                  Book Transformation →
                </Link>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Slide Indicator Dots */}
        <div className="flex justify-center items-center gap-3 mt-10">
          {transformationData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                currentIndex === idx ? 'w-10 bg-[#1A1A1A]' : 'w-2 bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Ledger Footer Call to Action */}
      {!hideButton && (
        <div className="w-full pt-14 pb-6 border-t border-black/10 flex flex-col items-center text-center px-6 mt-14">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-black/45 block mb-2 font-semibold">
            EXPLORE THE COMPLETE COLLECTION
          </span>
          <h4 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1A1A] mb-6 leading-tight max-w-md">
            Ready for your personal style transformation?
          </h4>
          <Link
            href="/transformations"
            className="tracking-[0.3em] text-[9px] uppercase font-mono font-semibold text-[#1A1A1A] bg-[#EFECE6] hover:bg-[#EAE8E3] border border-black/10 transition-all py-4 px-8 rounded-xs cursor-pointer inline-block"
          >
            Access Full Archive →
          </Link>
        </div>
      )}

    </section>
  );
}