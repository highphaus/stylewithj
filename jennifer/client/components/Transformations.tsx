'use client';

import React, { useState } from 'react';
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
  const [viewMode, setViewMode] = useState<'both' | 'before' | 'after'>('both');
  const { openLightbox } = useLightbox();

  const currentItem = transformationData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % transformationData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + transformationData.length) % transformationData.length);
  };

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
    <section id="transformations" className="relative w-full bg-[#FAF9F6] border-b border-black/10 py-16 lg:py-24 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
              <span className="text-[10px] tracking-[0.4em] uppercase font-light text-black/50 font-sans font-semibold">
                VISUAL IDENTITY ARCHIVE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-tight">
              Transformations
            </h2>
          </div>

          {/* Controls: Slide Indicator & Nav Arrows */}
          <div className="flex items-center gap-6">
            <div className="font-mono text-xs tracking-[0.3em] uppercase text-black/50 font-bold">
              0{currentIndex + 1} / 0{transformationData.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Transformation"
                className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all cursor-pointer shadow-xs"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Transformation"
                className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all cursor-pointer shadow-xs"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Carousel Slide Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >
            
            {/* Left Column: Photo Canvas Projection (8 Cols on Desktop) */}
            <div className="lg:col-span-8 w-full flex flex-col gap-4">
              
              {/* Mode Toggle Switcher */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/45 font-bold">
                  ✦ {currentItem.id} // {currentItem.demographic}
                </span>

                <div className="flex items-center gap-1 bg-[#EFECE6] p-1 rounded-full border border-black/10">
                  <button
                    onClick={() => setViewMode('both')}
                    className={`px-3 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-mono font-bold rounded-full transition-all cursor-pointer ${
                      viewMode === 'both' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-black/60 hover:text-black'
                    }`}
                  >
                    Side-by-Side
                  </button>
                  <button
                    onClick={() => setViewMode('before')}
                    className={`px-3 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-mono font-bold rounded-full transition-all cursor-pointer ${
                      viewMode === 'before' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-black/60 hover:text-black'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setViewMode('after')}
                    className={`px-3 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-mono font-bold rounded-full transition-all cursor-pointer ${
                      viewMode === 'after' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-black/60 hover:text-black'
                    }`}
                  >
                    After
                  </button>
                </div>
              </div>

              {/* Photo Display Grid */}
              <div className="w-full">
                {viewMode === 'both' ? (
                  <div className="grid grid-cols-2 gap-4">
                    {/* BEFORE FRAME */}
                    <div 
                      onClick={() => handleOpenLightbox(currentItem.beforeImg, 'BEFORE')}
                      className="group relative w-full aspect-[3/4] bg-[#0D0D0D] overflow-hidden border border-black/10 cursor-pointer rounded-xs shadow-md"
                      title="Click to view full image & details"
                    >
                      <img
                        src={currentItem.beforeImg}
                        alt={`${currentItem.client} Before`}
                        className="w-full h-full object-cover object-top grayscale-[15%] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 bg-[#FAF9F6]/95 border border-black/10 px-3 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] font-mono text-black uppercase font-bold shadow-xs">
                        BEFORE
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white/90 px-3 py-1 text-[8px] tracking-[0.2em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                        ✦ EXPAND
                      </div>
                    </div>

                    {/* AFTER FRAME */}
                    <div 
                      onClick={() => handleOpenLightbox(currentItem.afterImg, 'AFTER')}
                      className="group relative w-full aspect-[3/4] bg-[#0D0D0D] overflow-hidden border border-black/10 cursor-pointer rounded-xs shadow-md"
                      title="Click to view full image & details"
                    >
                      <img
                        src={currentItem.afterImg}
                        alt={`${currentItem.client} After`}
                        className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] font-mono uppercase font-bold shadow-xs border border-white/10">
                        AFTER
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white/90 px-3 py-1 text-[8px] tracking-[0.2em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                        ✦ EXPAND
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ISOLATED SINGLE FRAME */
                  <div
                    onClick={() => handleOpenLightbox(viewMode === 'before' ? currentItem.beforeImg : currentItem.afterImg, viewMode.toUpperCase())}
                    className="group relative w-full h-[65vh] min-h-[420px] bg-[#0D0D0D] overflow-hidden border border-black/10 cursor-pointer rounded-xs shadow-lg"
                    title="Click to view full image & details"
                  >
                    <img
                      src={viewMode === 'before' ? currentItem.beforeImg : currentItem.afterImg}
                      alt={viewMode}
                      className={`w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ${
                        viewMode === 'before' ? 'grayscale-[20%]' : ''
                      }`}
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 bg-black text-white px-3.5 py-1.5 text-[8px] sm:text-[9px] tracking-[0.25em] font-mono uppercase font-bold shadow-xs border border-white/10">
                      {viewMode === 'before' ? 'BEFORE // INITIAL FIT' : 'AFTER // REFINED SILHOUETTE'}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: High-Fashion Narrative & Specs Info (4 Cols on Desktop) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6 bg-[#EFECE6] p-8 lg:p-10 border border-black/10 rounded-xs shadow-xs">
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/50 font-bold block mb-2">
                  CASE STUDY 0{currentIndex + 1}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A] tracking-tight uppercase leading-snug mb-4">
                  {currentItem.client}
                </h3>

                <p className="font-serif text-base sm:text-lg italic font-light text-black/80 leading-relaxed mb-6 border-l-2 border-black/20 pl-4 py-1">
                  "{currentItem.concept}"
                </p>

                {/* Specs List */}
                <div className="space-y-2 pt-2 border-t border-black/10">
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/45 block mb-2 font-bold">
                    TAILORING SPECIFICATIONS:
                  </span>
                  <div className="flex flex-col gap-2">
                    {currentItem.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-black/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-black/10 flex flex-col gap-3">
                <Link
                  href="/connect"
                  className="w-full text-center tracking-[0.3em] text-[9px] uppercase font-mono font-semibold text-white bg-[#1A1A1A] hover:bg-black transition-all py-3.5 px-6 shadow-sm rounded-xs cursor-pointer"
                >
                  Book Transformation →
                </Link>

                <button
                  onClick={() => handleOpenLightbox(currentItem.afterImg, 'AFTER')}
                  className="w-full text-center tracking-[0.25em] text-[9px] uppercase font-mono font-semibold text-[#1A1A1A] hover:text-black transition-all py-2 border-b border-black/20 hover:border-black cursor-pointer"
                >
                  Read Full Details
                </button>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* Slide Indicator Dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {transformationData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-[#1A1A1A]' : 'w-2 bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Ledger Footer Call to Action */}
      {!hideButton && (
        <div className="w-full pt-16 pb-8 border-t border-black/10 flex flex-col items-center text-center px-6 mt-16">
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