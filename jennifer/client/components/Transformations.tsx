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
  const { openLightbox } = useLightbox();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);

  // ── AUTOMATIC SEAMLESS CROSSFADE CYCLE (NO VISIBLE HORIZONTAL SLIDE) ──
  useEffect(() => {
    if (isHovering) {
      setProgress(0);
      return;
    }

    const intervalTime = 50; 
    const totalDuration = 6000; // 6 seconds per case
    const increment = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((curr) => (curr + 1) % transformationData.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isHovering, activeIndex]);

  const handleSelectCase = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const handleOpenLightbox = (imgSrc: string, clientName: string, label: string, currentItem: typeof transformationData[0]) => {
    openLightbox(imgSrc, `${clientName} (${label})`, {
      num: currentItem.id,
      category: currentItem.demographic,
      concept: currentItem.concept,
      story: `${currentItem.concept} — Specifications: ${currentItem.specs.join(' • ')}`,
      fabric: currentItem.specs.join(' • '),
      tag: label
    });
  };

  const currentItem = transformationData[activeIndex];

  return (
    <section 
      id="transformations" 
      className="relative w-full bg-[#FAF9F6] border-b border-black/10 py-12 sm:py-20 overflow-hidden"
    >
      <div 
        className="w-full flex flex-col gap-10"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        
        {/* Section Header with Interactive Case Selector Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-6 max-w-7xl mx-auto w-full px-4 sm:px-10 lg:px-16">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-tight">
              Transformations
            </h2>
          </div>

          {/* Case Navigation Tabs */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1 sm:pb-0">
            {transformationData.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectCase(idx)}
                  className={`px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase font-mono transition-all rounded-xs border cursor-pointer ${
                    isActive 
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold shadow-xs' 
                      : 'bg-transparent text-black/50 border-black/10 hover:border-black/30 hover:text-black/80 font-semibold'
                  }`}
                >
                  CASE 0{idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* AUTOMATIC SEAMLESS CROSSFADE DISPLAY FIELD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="flex flex-col gap-6 w-full"
          >
            {/* Case Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-7xl mx-auto w-full px-4 sm:px-10 lg:px-16">
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/45 font-bold block mb-1">
                  ✦ CASE STUDY {currentItem.id} // {currentItem.demographic}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1A1A] tracking-tight uppercase">
                  {currentItem.client}
                </h3>
              </div>

              {/* Seamless Auto Progress Line */}
              <div className="w-32 sm:w-48 flex flex-col gap-1">
                <div className="flex justify-between items-center text-[8px] font-mono text-black/40 uppercase">
                  <span>TRANSITION</span>
                  <span>0{activeIndex + 1} / 0{transformationData.length}</span>
                </div>
                <div className="w-full h-[2px] bg-black/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#1A1A1A]"
                    style={{ width: `${isHovering ? 0 : progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              </div>
            </div>

            {/* FULL-BLEED 100% WIDTH CANVAS (0 GAP TOUCHING LEFT AND RIGHT SIDES) */}
            <div className="w-full overflow-hidden">
              <div className="grid grid-cols-2 gap-0 w-full h-[75vh] min-h-[480px] sm:min-h-[600px] border-y border-black/15 overflow-hidden">
                
                {/* BEFORE FRAME (TOUCHES LEFT EDGE) */}
                <div 
                  onClick={() => handleOpenLightbox(currentItem.beforeImg, currentItem.client, 'BEFORE', currentItem)}
                  className="group relative w-full h-full bg-[#0D0D0D] overflow-hidden border-r border-black/15 cursor-pointer"
                  title="Click to view full high-res image & details"
                >
                  <img
                    src={currentItem.beforeImg}
                    alt={`${currentItem.client} Before`}
                    className="w-full h-full object-cover object-top grayscale-[15%] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-6 bg-[#FAF9F6]/95 border border-black/10 px-3.5 py-1 text-[8px] sm:text-[9px] tracking-[0.25em] font-mono text-black uppercase font-bold shadow-xs">
                    BEFORE
                  </div>
                  <div className="absolute bottom-4 left-6 bg-black/80 backdrop-blur-md text-white/90 px-3.5 py-1 text-[8px] tracking-[0.2em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    ✦ CLICK TO EXPAND
                  </div>
                </div>

                {/* AFTER FRAME (TOUCHES RIGHT EDGE) */}
                <div 
                  onClick={() => handleOpenLightbox(currentItem.afterImg, currentItem.client, 'AFTER', currentItem)}
                  className="group relative w-full h-full bg-[#0D0D0D] overflow-hidden cursor-pointer"
                  title="Click to view full high-res image & details"
                >
                  <img
                    src={currentItem.afterImg}
                    alt={`${currentItem.client} After`}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 right-6 bg-black text-white px-3.5 py-1 text-[8px] sm:text-[9px] tracking-[0.25em] font-mono uppercase font-bold shadow-xs border border-white/10">
                    AFTER
                  </div>
                  <div className="absolute bottom-4 right-6 bg-black/80 backdrop-blur-md text-white/90 px-3.5 py-1 text-[8px] tracking-[0.2em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    ✦ CLICK TO EXPAND
                  </div>
                </div>

              </div>
            </div>

            {/* Subtext Bar: Narrative & Specs Underneath */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#EFECE6] p-6 border border-black/10 rounded-xs shadow-xs max-w-7xl mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-5rem)]">
              <div className="flex flex-col gap-1 max-w-2xl">
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

      </div>

      {/* Ledger Footer Call to Action */}
      {!hideButton && (
        <div className="w-full pt-12 pb-4 border-t border-black/10 flex flex-col items-center text-center px-6 mt-16 max-w-7xl mx-auto">
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