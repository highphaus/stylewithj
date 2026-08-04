'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
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

interface RowProps {
  item: typeof transformationData[0];
  idx: number;
  scrollYProgress: MotionValue<number>;
  totalItems: number;
  hideButton?: boolean;
}

function ScrollingCaseStudyRow({ item, idx, scrollYProgress, totalItems }: RowProps) {
  const { openLightbox } = useLightbox();
  const segment = 1 / totalItems;
  const isFirst = idx === 0;

  const pStart = idx * segment;
  const pMid = pStart + segment * 0.2;

  const inputRange = isFirst
    ? [0.0, 0.8, 1.0]
    : [pStart, pMid, 1.0];

  const opacityRange = isFirst
    ? [1.0, 1.0, 1.0]
    : [0.0, 1.0, 1.0];

  const beforeRange = isFirst
    ? ["0vw", "0vw", "0vw"]
    : ["-100vw", "0vw", "0vw"];

  const afterRange = isFirst
    ? ["0vw", "0vw", "0vw"]
    : ["100vw", "0vw", "0vw"];

  const scaleRange = isFirst
    ? [1.0, 1.0, 1.0]
    : [1.03, 1.0, 1.0];

  const opacity = useTransform(scrollYProgress, inputRange, opacityRange);
  const beforeX = useTransform(scrollYProgress, inputRange, beforeRange);
  const afterX = useTransform(scrollYProgress, inputRange, afterRange);
  const scale = useTransform(scrollYProgress, inputRange, scaleRange);

  const handleOpenDetails = (imgSrc: string, mode: 'BEFORE' | 'AFTER') => {
    openLightbox(imgSrc, `${item.client} (${mode})`, {
      num: item.id,
      category: item.demographic,
      concept: item.concept,
      story: `${item.concept} — Key Specifications: ${item.specs.join(' • ')}`,
      fabric: item.specs.join(' • '),
      tag: mode
    });
  };

  return (
    <motion.div 
      style={{ opacity, zIndex: (idx + 1) * 10 }}
      className="absolute inset-0 w-full h-full flex flex-col lg:flex-row items-center justify-center pointer-events-none"
    >
      <div className="relative w-full h-full flex flex-col lg:grid lg:grid-cols-12 items-stretch overflow-hidden pointer-events-auto">
        
        {/* Clean 100% Screen Cover Dual Image Frame (No Overlapping Text Box) */}
        <div className="w-full h-full col-span-12 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden bg-[#EAE8E3]">
          
          {/* Left Column: Before Image */}
          <div 
            onClick={() => handleOpenDetails(item.beforeImg, 'BEFORE')}
            className="col-span-6 h-full overflow-hidden relative border-r border-black/10 cursor-pointer group"
            title="Click photo to view story and details"
          >
            <motion.div style={{ x: beforeX }} className="w-full h-full relative">
              <motion.img 
                style={{ scale }}
                src={item.beforeImg} 
                alt="Initial Silhouette" 
                className="w-full h-full object-cover object-top grayscale-[15%] group-hover:scale-[1.02] transition-transform duration-700" 
                draggable="false" 
              />
              <div className="absolute top-6 left-6 bg-[#FAF9F6]/95 border border-black/10 px-3.5 py-2 text-[9px] tracking-[0.25em] font-sans text-black uppercase font-bold shadow-sm z-10 rounded-xs">
                BEFORE
              </div>
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md text-white/90 px-3.5 py-2 text-[8px] tracking-[0.3em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ✦ CLICK TO VIEW STORY & DETAILS
              </div>
            </motion.div>
          </div>

          {/* Right Column: After Image */}
          <div 
            onClick={() => handleOpenDetails(item.afterImg, 'AFTER')}
            className="col-span-6 h-full overflow-hidden relative cursor-pointer group"
            title="Click photo to view story and details"
          >
            <motion.div style={{ x: afterX }} className="w-full h-full relative">
              <motion.img 
                style={{ scale }}
                src={item.afterImg} 
                alt="Realized Design Target" 
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700" 
                draggable="false" 
              />
              <div className="absolute top-6 right-6 bg-black text-white px-3.5 py-2 text-[9px] tracking-[0.25em] font-sans uppercase font-bold shadow-sm z-10 rounded-xs">
                AFTER
              </div>
              <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md text-white/90 px-3.5 py-2 text-[8px] tracking-[0.3em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ✦ CLICK TO VIEW STORY & DETAILS
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}

// Clean Full-Bleed Edge-to-Edge Mobile & Subpage Case Study Card (Zero Text Box, Click for Story)
function CaseStudyCard({ item, fullBleedMobile = false }: { item: typeof transformationData[0]; fullBleedMobile?: boolean }) {
  const [activeMode, setActiveMode] = useState<'both' | 'before' | 'after'>('both');
  const { openLightbox } = useLightbox();

  const handleOpenDetails = (imgSrc: string, mode: 'BEFORE' | 'AFTER' | 'BOTH') => {
    openLightbox(imgSrc, `${item.client} (${mode})`, {
      num: item.id,
      category: item.demographic,
      concept: item.concept,
      story: `${item.concept} — Specifications: ${item.specs.join(' • ')}`,
      fabric: item.specs.join(' • '),
      tag: mode
    });
  };

  return (
    <div className={`flex flex-col bg-[#FAF9F6] ${fullBleedMobile ? 'w-full' : 'border border-black/10 p-0 sm:p-2 rounded-xs shadow-xs'}`}>
      
      {/* 100% CLEAN FULL-BLEED MOBILE PHOTO FRAME (ZERO OVERLAY BOX) */}
      <div className={`relative ${fullBleedMobile ? 'w-full h-[85vh] min-h-[480px] bg-[#0D0D0D]' : 'aspect-[3/4] sm:aspect-[4/5] w-full bg-[#EAE8E3] rounded-xs border border-black/5'} overflow-hidden cursor-pointer`}>
        {activeMode === 'both' ? (
          <div className="grid grid-cols-2 w-full h-full divide-x divide-black/10">
            <div 
              onClick={() => handleOpenDetails(item.beforeImg, 'BEFORE')}
              className="relative h-full overflow-hidden group"
              title="Click photo to view story and details"
            >
              <img
                src={item.beforeImg}
                alt="Before"
                className="w-full h-full object-cover object-top grayscale-[15%] group-hover:scale-[1.02] transition-transform duration-700"
                draggable="false"
              />
              <div className="absolute top-4 left-4 bg-[#FAF9F6]/95 border border-black/10 px-2.5 py-1 text-[8px] tracking-[0.25em] font-sans text-black uppercase font-bold shadow-xs">
                BEFORE
              </div>
            </div>
            <div 
              onClick={() => handleOpenDetails(item.afterImg, 'AFTER')}
              className="relative h-full overflow-hidden group"
              title="Click photo to view story and details"
            >
              <img
                src={item.afterImg}
                alt="After"
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                draggable="false"
              />
              <div className="absolute top-4 right-4 bg-black text-white px-2.5 py-1 text-[8px] tracking-[0.25em] font-sans uppercase font-bold shadow-xs">
                AFTER
              </div>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeMode} 
              onClick={() => handleOpenDetails(activeMode === 'before' ? item.beforeImg : item.afterImg, activeMode === 'before' ? 'BEFORE' : 'AFTER')}
              className="relative w-full h-full cursor-pointer group"
              title="Click photo to view story and details"
            >
              <motion.img
                src={activeMode === 'before' ? item.beforeImg : item.afterImg}
                alt={activeMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ${
                  activeMode === 'before' ? 'grayscale-[20%]' : ''
                }`}
                draggable="false"
              />
              <div className="absolute top-4 left-4 bg-[#FAF9F6]/95 border border-black/10 px-3 py-1 text-[8px] tracking-[0.25em] font-sans text-black uppercase font-bold shadow-xs">
                {activeMode === 'before' ? 'BEFORE' : 'AFTER'}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* View Mode Switcher Pill Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-1 flex gap-1 shadow-lg z-20">
          <button
            onClick={(e) => { e.stopPropagation(); setActiveMode('both'); }}
            className={`px-3 py-1 text-[8px] tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-300 ${
              activeMode === 'both'
                ? 'bg-white text-black'
                : 'bg-transparent text-white/60 hover:text-white'
            }`}
          >
            Both
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setActiveMode('before'); }}
            className={`px-3 py-1 text-[8px] tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-300 ${
              activeMode === 'before'
                ? 'bg-white text-black'
                : 'bg-transparent text-white/60 hover:text-white'
            }`}
          >
            Before
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setActiveMode('after'); }}
            className={`px-3 py-1 text-[8px] tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-300 ${
              activeMode === 'after'
                ? 'bg-white text-black'
                : 'bg-transparent text-white/60 hover:text-white'
            }`}
          >
            After
          </button>
        </div>
      </div>

    </div>
  );
}

interface TransformationsProps {
  hideButton?: boolean;
  isStatic?: boolean;
}

export default function Transformations({ hideButton = false, isStatic = false }: TransformationsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001
  });

  return (
    <div className="relative w-full bg-[#FAF9F6] overflow-clip">
      
      {/* ── MOBILE EXCLUSIVE VIEW (100% FULL-BLEED HERO SCREEN COVER IMAGES WITH NO SIDE MARGINS/DEAD SPACE) ── */}
      {!isStatic && (
        <div className="block lg:hidden w-full bg-[#FAF9F6]">
          {/* Header */}
          <div className="px-6 pt-16 pb-8 border-b border-black/10 bg-[#FAF9F6]">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-black/45 block mb-2 font-semibold">
              ✦ TRANSFORMATIONS
            </span>
            <h2 className="font-serif text-3xl font-light text-black tracking-tight">
              Visual Structural Evolutions
            </h2>
          </div>

          {/* Stack of 100% Full Bleed Mobile Cards */}
          <div className="flex flex-col divide-y divide-black/10 bg-[#FAF9F6]">
            {transformationData.map((item) => (
              <CaseStudyCard key={item.id} item={item} fullBleedMobile={true} />
            ))}
          </div>
        </div>
      )}

      {/* ── DESKTOP EXCLUSIVE VIEW: Extended Smooth Flight Scroll ── */}
      {!isStatic ? (
        <div ref={sectionRef} className="hidden lg:block relative w-full h-[380vh] bg-[#FAF9F6] overflow-x-clip">
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#FAF9F6]">
            {transformationData.map((item, idx) => (
              <ScrollingCaseStudyRow
                key={item.id}
                item={item}
                idx={idx}
                scrollYProgress={smoothProgress}
                totalItems={transformationData.length}
                hideButton={hideButton}
              />
            ))}
          </div>
        </div>
      ) : (
        /* ── STATIC SUBPAGE VIEW (2-COLUMN GRID) ── */
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-12 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 sm:gap-y-16">
            {transformationData.map((item) => (
              <CaseStudyCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Ledger Footer Call to Action */}
      {!hideButton && (
        <div className="w-full pt-10 pb-16 border-t border-black/10 flex flex-col items-center text-center px-6">
          <h4 className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A] mb-6 leading-tight max-w-xs">
            Unlock the entire visual identity ledger.
          </h4>
          <Link
            href="/transformations"
            className="tracking-[0.4em] text-[9px] uppercase font-mono font-semibold text-white bg-black hover:bg-black/85 transition-all duration-300 py-4 px-9 shadow-md rounded-xs cursor-pointer inline-block"
          >
            Access Full Ledger →
          </Link>
        </div>
      )}

    </div>
  );
}