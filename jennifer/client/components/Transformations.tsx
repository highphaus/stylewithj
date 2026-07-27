'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

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

function ScrollingCaseStudyRow({ item, idx, scrollYProgress, totalItems, hideButton }: RowProps) {
  const segment = 1 / totalItems;
  const isFirst = idx === 0;
  const isLast = idx === totalItems - 1;

  const pStart = idx * segment;
  const pMid = pStart + segment * 0.2;

  // Dedicated scroll hold window so cards stay pinned for reading
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

  const textYRange = isFirst
    ? [0, 0, 0]
    : [25, 0, 0];

  const scaleRange = isFirst
    ? [1.0, 1.0, 1.0]
    : [1.03, 1.0, 1.0];

  // Map scroll progress cleanly using transform values
  const opacity = useTransform(scrollYProgress, inputRange, opacityRange);
  const beforeX = useTransform(scrollYProgress, inputRange, beforeRange);
  const afterX = useTransform(scrollYProgress, inputRange, afterRange);
  const textY = useTransform(scrollYProgress, inputRange, textYRange);
  const textOpacity = useTransform(scrollYProgress, inputRange, opacityRange);
  const scale = useTransform(scrollYProgress, inputRange, scaleRange);

  return (
    <motion.div 
      style={{ opacity, zIndex: (idx + 1) * 10 }}
      className="absolute inset-0 w-full h-full flex flex-col lg:flex-row items-center justify-center pointer-events-none"
    >
      <div className="relative w-full h-full flex flex-col lg:grid lg:grid-cols-12 items-stretch overflow-hidden pointer-events-auto">
        
        {/* Images Dual Frame */}
        <div className="w-full h-full col-span-12 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden bg-[#EAE8E3]">
          
          {/* Left Column: Before Image */}
          <div className="col-span-6 h-full overflow-hidden relative border-r border-black/10">
            <motion.div style={{ x: beforeX }} className="w-full h-full relative">
              <motion.img 
                style={{ scale }}
                src={item.beforeImg} 
                alt="Initial Silhouette" 
                className="w-full h-full object-cover object-top grayscale-[15%]" 
                draggable="false" 
              />
              <div className="absolute top-6 left-6 bg-[#FAF9F6]/95 border border-black/10 px-3 py-1.5 text-[8px] tracking-[0.25em] font-sans text-black uppercase font-bold shadow-sm z-10">
                {"BEFORE"}
              </div>
            </motion.div>
          </div>

          {/* Right Column: After Image */}
          <div className="col-span-6 h-full overflow-hidden relative">
            <motion.div style={{ x: afterX }} className="w-full h-full relative">
              <motion.img 
                style={{ scale }}
                src={item.afterImg} 
                alt="Realized Design Target" 
                className="w-full h-full object-cover object-top" 
                draggable="false" 
              />
              <div className="absolute top-6 right-6 bg-black text-white px-3 py-1.5 text-[8px] tracking-[0.25em] font-sans uppercase font-bold shadow-sm z-10">
                {"AFTER"}
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Spacious Clean Details Card */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 w-[90vw] max-w-md p-6 lg:p-9 bg-white/95 backdrop-blur-md border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[2px] text-center pointer-events-auto"
      >
        <h3 className="font-serif text-xl lg:text-2xl font-light tracking-wide text-black mb-3 uppercase leading-snug">
          {item.client}
        </h3>

        <p className="font-serif text-sm lg:text-base italic text-black/75 leading-relaxed font-light mb-6 border-t border-b border-black/10 py-4 px-2 w-full">
          {`"${item.concept}"`}
        </p>

        {!hideButton && (
          <div className="pt-2 flex justify-between items-center w-full">
            <button
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-black text-white text-[9px] tracking-[0.2em] uppercase font-semibold rounded-full shadow-sm hover:bg-black/80 transition-all"
            >
              Skip Section ↓
            </button>
            <Link
              href="/transformations"
              className="font-sans text-[9px] tracking-[0.3em] uppercase text-black/60 hover:text-black transition-colors font-semibold border-b border-black/20 pb-0.5"
            >
              Full Archive →
            </Link>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// Clean Case Study Card for mobile and subpages
function CaseStudyCard({ item }: { item: typeof transformationData[0] }) {
  const [activeMode, setActiveMode] = useState<'both' | 'before' | 'after'>('both');

  return (
    <div className="flex flex-col bg-[#FAF8F3] border border-black/10 p-5 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.02)] rounded-sm">
      {/* Photo Frame */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-[#EAE8E3] border border-black/5 shadow-sm rounded-[1px]">
        {activeMode === 'both' ? (
          <div className="grid grid-cols-2 w-full h-full divide-x divide-black/10">
            <div className="relative h-full overflow-hidden">
              <img
                src={item.beforeImg}
                alt="Before"
                className="w-full h-full object-cover object-top grayscale-[15%]"
                draggable="false"
              />
              <div className="absolute top-2.5 left-2.5 bg-[#FAF9F6]/95 px-2 py-1 text-[7px] tracking-[0.2em] font-sans text-black uppercase font-bold shadow-xs">
                BEFORE
              </div>
            </div>
            <div className="relative h-full overflow-hidden">
              <img
                src={item.afterImg}
                alt="After"
                className="w-full h-full object-cover object-top"
                draggable="false"
              />
              <div className="absolute top-2.5 right-2.5 bg-black text-white px-2 py-1 text-[7px] tracking-[0.2em] font-sans uppercase font-bold shadow-xs">
                AFTER
              </div>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={activeMode} className="relative w-full h-full">
              <motion.img
                src={activeMode === 'before' ? item.beforeImg : item.afterImg}
                alt={activeMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`w-full h-full object-cover object-top ${
                  activeMode === 'before' ? 'grayscale-[20%]' : ''
                }`}
                draggable="false"
              />
              <div className="absolute top-3 left-3 bg-[#FAF9F6]/95 px-2.5 py-1 text-[8px] tracking-[0.25em] font-sans text-black uppercase font-bold shadow-xs">
                {activeMode === 'before' ? 'BEFORE' : 'AFTER'}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* View Mode Switcher Pill */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-black/10 rounded-full p-0.5 sm:p-1 flex gap-0.5 sm:gap-1 shadow-md z-20">
          <button
            onClick={() => setActiveMode('both')}
            className={`px-2.5 sm:px-3 py-0.5 sm:py-1 text-[7px] sm:text-[8px] tracking-[0.18em] uppercase font-bold rounded-full transition-all duration-300 ${
              activeMode === 'both'
                ? 'bg-black text-white'
                : 'bg-transparent text-black/50 hover:text-black'
            }`}
          >
            Both
          </button>
          <button
            onClick={() => setActiveMode('before')}
            className={`px-2.5 sm:px-3 py-0.5 sm:py-1 text-[7px] sm:text-[8px] tracking-[0.18em] uppercase font-bold rounded-full transition-all duration-300 ${
              activeMode === 'before'
                ? 'bg-black text-white'
                : 'bg-transparent text-black/50 hover:text-black'
            }`}
          >
            Before
          </button>
          <button
            onClick={() => setActiveMode('after')}
            className={`px-2.5 sm:px-3 py-0.5 sm:py-1 text-[7px] sm:text-[8px] tracking-[0.18em] uppercase font-bold rounded-full transition-all duration-300 ${
              activeMode === 'after'
                ? 'bg-black text-white'
                : 'bg-transparent text-black/50 hover:text-black'
            }`}
          >
            After
          </button>
        </div>
      </div>

      {/* Spacious Clean Details Section */}
      <div className="flex flex-col text-left mt-5 px-1">
        <h3 className="font-serif text-lg sm:text-xl tracking-wide font-normal text-[#1A1A1A] uppercase mb-2 leading-snug">
          {item.client}
        </h3>
        <p className="font-serif text-sm italic text-black/75 leading-relaxed font-light border-l-2 border-black/15 pl-4 py-0.5">
          {`"${item.concept}"`}
        </p>
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

  // Smooth, fluid scroll progress without sluggish spring delay
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
      
      {/* ── MOBILE EXCLUSIVE VIEW (block lg:hidden): Clean Editorial Flow ── */}
      {!isStatic && (
        <div className="block lg:hidden w-full py-10 px-4 sm:px-8 bg-[#FAF9F6]">
          {/* Stack of Clean Integrated Mobile Cards */}
          <div className="flex flex-col gap-10 max-w-md mx-auto">
            {transformationData.map((item) => (
              <CaseStudyCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* ── DESKTOP EXCLUSIVE VIEW (hidden lg:block): Extended Smooth Flight Scroll ── */}
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
            className="tracking-[0.4em] text-[9px] uppercase font-light text-black/60 hover:text-black transition-all duration-500 py-3.5 px-8 border border-black/20 hover:border-black rounded-none bg-transparent hover:bg-black hover:text-white"
          >
            Access Full Ledger
          </Link>
        </div>
      )}

    </div>
  );
}