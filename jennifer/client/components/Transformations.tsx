'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';

const transformationData = [
  {
    id: "01",
    client: "THE MODERN PATRIARCH",
    demographic: "MALE SILHOUETTE SYSTEM",
    concept: "Restructuring upper-torso proportions using monolithic wool structures and raw minimalist layering.",
    beforeImg: "/images/includes/IMG_8820.JPG.jpeg",
    afterImg: "/images/includes/IMG_8863.JPG.jpeg",
    specs: ["Canvas Alteration · Drop Line", "Heavy Matte Crepe Fabrics", "Palette · Pale Bone Tone"]
  },
  {
    id: "02",
    client: "CULTURAL AVANT-GARDE LENS",
    demographic: "MALE SILHOUETTE SYSTEM",
    concept: "A dramatic shift to curated minimalism, blending structured structural drops with historic tailored lines.",
    beforeImg: "/images/includes/IMG_8777.JPG.jpeg",
    afterImg: "/images/includes/IMG_8771.JPG.jpeg",
    specs: ["Asymmetric Hem Disruption", "Technical Linen Matrix", "Palette · Slate Graphite"]
  }
];

interface TransformationsProps {
  hideButton?: boolean;
  isStatic?: boolean;
  hideHeading?: boolean;
}

export default function Transformations({ hideButton = false, hideHeading = false }: TransformationsProps) {
  const { openLightbox } = useLightbox();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // ── AUTOMATIC SEAMLESS CROSSFADE CYCLE (ROTATES EVERY 7 SECONDS, PAUSES ON HOVER) ──
  useEffect(() => {
    if (isHovering) return;

    const timer = setInterval(() => {
      setActiveIndex((curr) => (curr + 1) % transformationData.length);
    }, 7000); // 7s generous duration for Before/After viewing

    return () => clearInterval(timer);
  }, [isHovering]);

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
      className="relative w-full bg-[#FAF9F6] border-b border-black/10 pt-4 pb-12 sm:pb-20 overflow-hidden"
    >
      <div 
        className="w-full flex flex-col gap-8"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        
        {/* Section Header with Main Title and Client Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 sm:pt-10 pb-2 max-w-7xl mx-auto w-full px-4 sm:px-10 lg:px-16">
          <div>
            {!hideHeading && (
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-tight mb-1">
                Transformations
              </h2>
            )}
            <div className="flex items-center gap-2.5 overflow-hidden max-w-full pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-black/40 flex-shrink-0" />
              <h3 className="font-mono text-[10px] sm:text-xs lg:text-sm tracking-[0.22em] text-black/65 uppercase font-medium whitespace-nowrap truncate">
                {currentItem.client}
              </h3>
            </div>
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
            {/* FULL-BLEED 100% WIDTH CANVAS (0 GAP TOUCHING LEFT AND RIGHT SIDES) */}
            <div className="w-full overflow-hidden">
              <div className="grid grid-cols-2 gap-0 w-full h-[65vh] min-h-[380px] sm:min-h-[580px] border-y border-black/15 overflow-hidden">
                
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#EFECE6] p-5 sm:p-6 border border-black/10 rounded-xs shadow-xs max-w-7xl mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-5rem)]">
              <div className="flex flex-col gap-1 max-w-2xl">
                <p className="font-serif text-xs sm:text-base italic font-light text-black/85 leading-relaxed">
                  "{currentItem.concept}"
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.2em] uppercase text-black/40 font-bold mr-1">
                    SPECS:
                  </span>
                  {currentItem.specs.map((spec, i) => (
                    <span 
                      key={i} 
                      className="font-mono text-[8.5px] sm:text-[9px] tracking-wide text-black/75 bg-white/70 px-2.5 py-0.5 rounded-xs border border-black/5"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                <Link
                  href={hideButton ? "/connect" : "/transformations"}
                  className="tracking-[0.2em] sm:tracking-[0.25em] text-[8.5px] sm:text-[9px] uppercase font-mono font-semibold text-white bg-[#1A1A1A] hover:bg-black transition-all py-2.5 px-5 sm:py-3 sm:px-6 shadow-xs rounded-xs cursor-pointer"
                >
                  {hideButton ? "Book Session →" : "Explore Details →"}
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