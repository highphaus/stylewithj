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

  // Strictly non-decreasing ranges in [0, 1] to prevent Web Animations API errors
  const inputRange = isFirst
    ? [0.0, 1.0]
    : [pStart, pStart + segment * 0.25, 1.0];

  const opacityRange = isFirst
    ? [1.0, 1.0]
    : [0.0, 1.0, 1.0];

  const beforeRange = isFirst
    ? ["0vw", "0vw"]
    : ["-100vw", "0vw", "0vw"];

  const afterRange = isFirst
    ? ["0vw", "0vw"]
    : ["100vw", "0vw", "0vw"];

  const textYRange = isFirst
    ? [0, 0]
    : [30, 0, 0];

  const scaleRange = isFirst
    ? [1.0, 1.0]
    : [1.05, 1.0, 1.0];

  // Map scroll progress cleanly using spring values passed down from parent
  const opacity = useTransform(scrollYProgress, inputRange, opacityRange);
  const beforeX = useTransform(scrollYProgress, inputRange, beforeRange);
  const afterX = useTransform(scrollYProgress, inputRange, afterRange);
  const textY = useTransform(scrollYProgress, inputRange, textYRange);
  const textOpacity = useTransform(scrollYProgress, inputRange, opacityRange);
  const scale = useTransform(scrollYProgress, inputRange, scaleRange);

  return (
    <motion.div 
      style={{ opacity, zIndex: (idx + 1) * 10, touchAction: 'pan-y' }}
      className="absolute inset-0 w-full h-full flex flex-col lg:flex-row items-center justify-center pointer-events-none"
    >
      {/* Mobile-only Section Heading */}
      <div className="block lg:hidden absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center">
        <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-bold text-black bg-[#FAF9F6]/95 backdrop-blur-md px-4 py-1 border border-black/10 shadow-sm rounded-full">
          ✦ Transformations
        </span>
      </div>

      <div className="relative w-full h-full flex flex-col lg:grid lg:grid-cols-12 items-stretch overflow-hidden pointer-events-auto" style={{ touchAction: 'pan-y' }}>
        
        {/* Images Dual Frame: Side-by-side on mobile (grid-cols-2) and desktop (lg:grid-cols-12) */}
        <div className="w-full h-[48vh] sm:h-[54vh] lg:h-full col-span-12 lg:col-span-12 grid grid-cols-2 lg:grid-cols-12 relative overflow-hidden bg-[#EAE8E3] mt-9 lg:mt-0">
          
          {/* Left Column: Before Image */}
          <div className="col-span-1 lg:col-span-6 h-full overflow-hidden relative border-r border-black/10">
            <motion.div style={{ x: beforeX }} className="w-full h-full relative">
              <motion.img 
                style={{ scale }}
                src={item.beforeImg} 
                alt="Initial Silhouette" 
                className="w-full h-full object-cover object-top grayscale-[15%]" 
                draggable="false" 
              />
              <div className="absolute top-2.5 left-2.5 sm:top-6 sm:left-6 bg-[#FAF9F6]/95 border border-black/10 px-2 py-1 sm:px-3 sm:py-1.5 text-[6px] sm:text-[8px] tracking-[0.18em] sm:tracking-[0.25em] font-sans text-black uppercase font-bold shadow-sm z-10">
                {"ANTE // INITIAL"}
              </div>
            </motion.div>
          </div>

          {/* Right Column: After Image */}
          <div className="col-span-1 lg:col-span-6 h-full overflow-hidden relative">
            <motion.div style={{ x: afterX }} className="w-full h-full relative">
              <motion.img 
                style={{ scale }}
                src={item.afterImg} 
                alt="Realized Design Target" 
                className="w-full h-full object-cover object-top" 
                draggable="false" 
              />
              <div className="absolute top-2.5 right-2.5 sm:top-6 sm:right-6 bg-black text-white px-2 py-1 sm:px-3 sm:py-1.5 text-[6px] sm:text-[8px] tracking-[0.18em] sm:tracking-[0.25em] font-sans uppercase font-bold shadow-sm z-10">
                {"POST // REALIZED"}
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Floating Seam Card: Positioned directly near photos on mobile (top-[calc(48vh+44px)]) to eliminate blank gap */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="absolute left-1/2 -translate-x-1/2 top-[calc(48vh+44px)] sm:top-[calc(54vh+24px)] lg:top-1/2 lg:-translate-y-1/2 z-20 w-[93vw] max-w-[93vw] sm:w-[90vw] lg:max-w-md p-3 sm:p-5 lg:p-8 bg-white/95 backdrop-blur-md border border-black/10 shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[2px] text-center pointer-events-auto"
      >
        <span className="font-mono text-[7px] sm:text-[8px] text-black/35 block mb-0.5 sm:mb-2 tracking-[0.2em] font-semibold">
          {`REF_0${item.id} // CASE STUDY`}
        </span>
        
        <span className="font-sans text-[7px] sm:text-[8px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-bold text-black/55 mb-0.5 sm:mb-2 block">
          {item.demographic}
        </span>

        <h3 className="font-serif text-sm sm:text-2xl font-light tracking-wide text-black mb-1 sm:mb-3 uppercase">
          {item.client}
        </h3>

        <p className="font-serif text-[9px] sm:text-sm italic text-black/65 leading-relaxed font-light mb-2 sm:mb-5 border-t border-b border-black/10 py-1 sm:py-3.5 w-full line-clamp-2 sm:line-clamp-none">
          {`"${item.concept}"`}
        </p>

        <div className="flex flex-col gap-0.5 sm:gap-1.5 items-center w-full">
          <span className="font-sans text-[6.5px] sm:text-[8px] tracking-[0.3em] uppercase text-black/35 block mb-0.5 font-semibold">
            STRUCTURAL LEDGER:
          </span>
          {item.specs.map((spec, sIdx) => (
            <div key={sIdx} className="flex items-center gap-1.5">
              <div className="w-1 sm:w-1.5 h-[1px] bg-black/30" />
              <span className="font-sans text-[6.5px] sm:text-[8px] tracking-wider text-black/60 uppercase font-light">
                {spec}
              </span>
            </div>
          ))}
        </div>

        {/* Floating skip actions */}
        {!hideButton && (
          <div className="mt-2.5 sm:mt-6 pt-2 sm:pt-4 border-t border-black/5 flex justify-between items-center w-full">
            <button
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-black text-white text-[6.5px] sm:text-[8px] tracking-[0.2em] uppercase font-semibold rounded-full shadow-sm hover:bg-black/80 transition-all"
            >
              Skip Section ↓
            </button>
            <Link
              href="/transformations"
              className="font-sans text-[6.5px] sm:text-[8px] tracking-[0.3em] uppercase text-black/50 hover:text-black transition-colors font-semibold border-b border-black/10 pb-0.5"
            >
              Full Archive →
            </Link>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// High-fashion Case Study Card with dual side-by-side comparison and focus pills
function CaseStudyCard({ item }: { item: typeof transformationData[0] }) {
  const [activeMode, setActiveMode] = useState<'both' | 'before' | 'after'>('both');

  return (
    <div className="flex flex-col gap-5 bg-[#FAF8F3] border border-black/5 p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] rounded-sm">
      <div className="relative aspect-[4/3] sm:aspect-[3/4] w-full overflow-hidden bg-[#EAE8E3] border border-black/5 shadow-sm rounded-[1px]">
        {activeMode === 'both' ? (
          <div className="grid grid-cols-2 w-full h-full divide-x divide-black/10">
            <div className="relative h-full overflow-hidden">
              <img
                src={item.beforeImg}
                alt="Initial Silhouette"
                className="w-full h-full object-cover object-top grayscale-[15%]"
                draggable="false"
              />
              <div className="absolute top-2 left-2 bg-[#FAF9F6]/95 px-2 py-0.5 text-[6px] sm:text-[7px] tracking-[0.2em] font-sans text-black uppercase font-bold">
                ANTE
              </div>
            </div>
            <div className="relative h-full overflow-hidden">
              <img
                src={item.afterImg}
                alt="Realized Design Target"
                className="w-full h-full object-cover object-top"
                draggable="false"
              />
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-0.5 text-[6px] sm:text-[7px] tracking-[0.2em] font-sans uppercase font-bold">
                POST
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
              <div className="absolute top-3 left-3 bg-[#FAF9F6]/95 px-2.5 py-1 text-[7px] tracking-[0.25em] font-sans text-black uppercase font-bold">
                {activeMode === 'before' ? 'ANTE // INITIAL' : 'POST // REALIZED'}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Floating View Mode Switcher Pill */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-black/10 rounded-full p-0.5 flex gap-0.5 shadow-md z-20">
          <button
            onClick={() => setActiveMode('both')}
            className={`px-2.5 py-1 text-[6.5px] sm:text-[7px] tracking-[0.18em] uppercase font-bold rounded-full transition-all duration-300 ${
              activeMode === 'both'
                ? 'bg-black text-white'
                : 'bg-transparent text-black/50 hover:text-black'
            }`}
          >
            Both
          </button>
          <button
            onClick={() => setActiveMode('before')}
            className={`px-2.5 py-1 text-[6.5px] sm:text-[7px] tracking-[0.18em] uppercase font-bold rounded-full transition-all duration-300 ${
              activeMode === 'before'
                ? 'bg-black text-white'
                : 'bg-transparent text-black/50 hover:text-black'
            }`}
          >
            Before
          </button>
          <button
            onClick={() => setActiveMode('after')}
            className={`px-2.5 py-1 text-[6.5px] sm:text-[7px] tracking-[0.18em] uppercase font-bold rounded-full transition-all duration-300 ${
              activeMode === 'after'
                ? 'bg-black text-white'
                : 'bg-transparent text-black/50 hover:text-black'
            }`}
          >
            After
          </button>
        </div>
      </div>

      <div className="flex flex-col text-left mt-2">
        <div className="flex justify-between items-baseline mb-3">
          <span className="font-sans text-[10px] tracking-[0.25em] font-semibold text-black/40">
            {`REF_${item.id} // ${item.demographic}`}
          </span>
        </div>
        <h3 className="font-sans text-xs tracking-[0.25em] font-medium text-[#1A1A1A] uppercase mb-2">
          {item.client}
        </h3>
        <p className="font-serif text-sm italic text-black/65 leading-relaxed font-light mb-4 border-l-2 border-black/10 pl-3">
          {`"${item.concept}"`}
        </p>
        <div className="flex flex-col gap-1.5 pt-3 border-t border-black/10">
          {item.specs.map((spec, sIdx) => (
            <div key={sIdx} className="flex items-center gap-2">
              <div className="w-1.5 h-[1px] bg-black/25" />
              <span className="font-sans text-[9px] tracking-wider text-black/50 uppercase font-light">
                {spec}
              </span>
            </div>
          ))}
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

  // Track scroll progress of the desktop sticky container track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Smooth scrollbar ticks/jitters using spring physics (expensive high-fashion glide)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 24,
    mass: 0.35
  });

  return (
    <div className="relative w-full bg-[#FAF9F6] overflow-clip">
      
      {/* ── MOBILE EXCLUSIVE VIEW (block lg:hidden): Clean Editorial Layout with Zero-Gap Cards ── */}
      {!isStatic && (
        <div className="block lg:hidden w-full py-12 px-4 sm:px-8 bg-[#FAF9F6]">
          {/* Mobile Section Header */}
          <div className="text-center max-w-md mx-auto mb-10">
            <span className="font-sans text-[10px] tracking-[0.4em] text-black/45 block mb-2 uppercase font-semibold">
              ✦ 04 // CASE STUDIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-[#1A1A1A] leading-tight mb-3">
              Transformations
            </h2>
            <p className="font-serif text-xs sm:text-sm text-black/60 font-light italic leading-relaxed max-w-xs mx-auto">
              A visual ledger of shape balancing, outline corrections, and tailored posture alterations.
            </p>
          </div>

          {/* Stack of Luxury Integrated Mobile Cards */}
          <div className="flex flex-col gap-10 max-w-md mx-auto">
            {transformationData.map((item) => (
              <CaseStudyCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* ── DESKTOP EXCLUSIVE VIEW (hidden lg:block): Sticky Flight Scroll Portfolio ── */}
      {!isStatic ? (
        <div ref={sectionRef} className="hidden lg:block relative w-full h-[300vh] bg-[#FAF9F6] overflow-x-clip">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 sm:gap-y-20">
            {transformationData.map((item) => (
              <CaseStudyCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Ledger Footer Call to Action */}
      {!hideButton && (
        <div className="w-full pt-10 pb-16 border-t border-black/10 flex flex-col items-center text-center px-6">
          <span className="font-sans text-[8px] tracking-[0.4em] text-black/35 block mb-2 uppercase font-semibold">
            ARCHIVE CONCLUSION CONTINUUM
          </span>
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