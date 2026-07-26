'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, useSpring } from 'framer-motion';

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

// Single Case Study Row that handles horizontal entry sliding, scales, and opacity fades based on parent spring progress
function ScrollingCaseStudyRow({ 
  item, 
  idx, 
  scrollYProgress, 
  totalItems,
  hideButton
}: { 
  item: typeof transformationData[0]; 
  idx: number; 
  scrollYProgress: any; 
  totalItems: number;
  hideButton: boolean;
}) {
  const segment = 1 / totalItems;
  const isFirst = idx === 0;
  const isLast = idx === totalItems - 1;

  // Compute boundaries for middle items
  const p0 = idx * segment;
  const p1 = p0 + segment * 0.25;
  const p2 = p0 + segment * 0.75;
  const p3 = (idx + 1) * segment;

  // Strictly non-decreasing ranges in [0, 1] to prevent Web Animations API errors
  const inputRange = isFirst
    ? [0.0, p2, p3]
    : isLast
    ? [p0, p1, 1.0]
    : [p0, p1, p2, p3];

  const opacityRange = isFirst
    ? [1, 1, 0]
    : isLast
    ? [0, 1, 1]
    : [0, 1, 1, 0];

  const beforeRange = isFirst
    ? ["0vw", "0vw", "-60vw"]
    : isLast
    ? ["-60vw", "0vw", "0vw"]
    : ["-60vw", "0vw", "0vw", "-60vw"];

  const afterRange = isFirst
    ? ["0vw", "0vw", "60vw"]
    : isLast
    ? ["60vw", "0vw", "0vw"]
    : ["60vw", "0vw", "0vw", "60vw"];

  const textYRange = isFirst
    ? [0, 0, -30]
    : isLast
    ? [30, 0, 0]
    : [30, 0, 0, -30];

  const scaleRange = isFirst
    ? [1.0, 1.0, 1.05]
    : isLast
    ? [1.05, 1.0, 1.0]
    : [1.05, 1.0, 1.0, 1.05];

  // Map scroll progress cleanly using spring values passed down from parent
  const opacity = useTransform(scrollYProgress, inputRange, opacityRange);
  const beforeX = useTransform(scrollYProgress, inputRange, beforeRange);
  const afterX = useTransform(scrollYProgress, inputRange, afterRange);
  const textY = useTransform(scrollYProgress, inputRange, textYRange);
  const textOpacity = useTransform(scrollYProgress, inputRange, opacityRange);
  const scale = useTransform(scrollYProgress, inputRange, scaleRange);

  return (
    <motion.div 
      style={{ opacity }}
      className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10"
    >
      <div className="relative w-full h-full grid grid-cols-12 items-stretch overflow-hidden">
        
        {/* Left Column: Before Image (Translating from Left) */}
        <div className="col-span-6 h-full overflow-hidden relative bg-[#EAE8E3] border-r border-black/5">
          <motion.div style={{ x: beforeX }} className="w-full h-full relative">
            <motion.img 
              style={{ scale }}
              src={item.beforeImg} 
              alt="Initial Silhouette" 
              className="w-full h-full object-cover object-top grayscale-[20%]" 
              draggable="false" 
            />
            <div className="absolute top-8 left-8 bg-[#FAF9F6]/95 border border-black/5 px-3 py-1.5 text-[8px] tracking-[0.25em] font-sans text-black uppercase font-bold shadow-sm">
              {"ANTE // INITIAL SHAPE"}
            </div>
          </motion.div>
        </div>

        {/* Right Column: After Image (Translating from Right) */}
        <div className="col-span-6 h-full overflow-hidden relative bg-[#EAE8E3]">
          <motion.div style={{ x: afterX }} className="w-full h-full relative">
            <motion.img 
              style={{ scale }}
              src={item.afterImg} 
              alt="Realized Design Target" 
              className="w-full h-full object-cover object-top" 
              draggable="false" 
            />
            <div className="absolute top-8 right-8 bg-black text-white px-3 py-1.5 text-[8px] tracking-[0.25em] font-sans uppercase font-bold shadow-sm">
              {"POST // REALIZED SILHOUETTE"}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Floating Center Seam Card (Interactive details) */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-sm sm:max-w-md p-8 bg-white/95 border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-[2px] text-center pointer-events-auto"
      >
        <span className="font-mono text-[8px] text-black/35 block mb-2 tracking-[0.2em] font-semibold">
          {`REF_0${item.id} // CASE STUDY`}
        </span>
        
        <span className="font-sans text-[8px] tracking-[0.25em] uppercase font-bold text-black/55 mb-2">
          {item.demographic}
        </span>

        <h3 className="font-serif text-xl sm:text-2xl font-light tracking-wide text-black mb-3 uppercase">
          {item.client}
        </h3>

        <p className="font-serif text-xs sm:text-sm italic text-black/65 leading-relaxed font-light mb-5 border-t border-b border-black/10 py-3.5 w-full">
          {`"${item.concept}"`}
        </p>

        <div className="flex flex-col gap-1.5 items-center w-full">
          <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-black/35 block mb-1 font-semibold">
            STRUCTURAL LEDGER:
          </span>
          {item.specs.map((spec, sIdx) => (
            <div key={sIdx} className="flex items-center gap-2">
              <div className="w-1.5 h-[1px] bg-black/30" />
              <span className="font-sans text-[8px] tracking-wider text-black/60 uppercase font-light">
                {spec}
              </span>
            </div>
          ))}
        </div>

        {/* Floating skip actions */}
        {!hideButton && (
          <div className="mt-6 pt-4 border-t border-black/5 flex justify-between items-center w-full">
            <button
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-[8px] tracking-[0.2em] uppercase font-semibold rounded-full shadow-sm hover:bg-black/80 transition-all"
            >
              Skip Section ↓
            </button>
            <Link
              href="/transformations"
              className="font-sans text-[8px] tracking-[0.3em] uppercase text-black/50 hover:text-black transition-colors font-semibold border-b border-black/10 pb-0.5"
            >
              Full Archive →
            </Link>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// High-fashion Case Study Card with individual click-to-fade before/after toggle pills
function CaseStudyCard({ item }: { item: typeof transformationData[0] }) {
  const [activeState, setActiveState] = useState<'before' | 'after'>('after');

  return (
    <div className="flex flex-col gap-6 bg-[#FAF8F3] border border-black/5 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] rounded-sm">
      
      {/* Visual Canvas Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAE8E3] border border-black/5 shadow-sm rounded-[1px] group">
        
        {/* Smooth Fading Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeState}
            src={activeState === 'before' ? item.beforeImg : item.afterImg}
            alt={activeState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`w-full h-full object-cover object-top transition-all duration-700 ${
              activeState === 'before' ? 'grayscale-[30%]' : ''
            }`}
            draggable="false"
          />
        </AnimatePresence>

        {/* Minimal Floating Info Indicators */}
        <div className="absolute top-3 left-3 bg-[#FAF9F6]/95 px-2.5 py-1 text-[7px] tracking-[0.25em] font-sans text-black uppercase font-bold pointer-events-none z-20 shadow-[0_1px_5px_rgba(0,0,0,0.02)]">
          {activeState === 'before' ? 'ANTE // INITIAL' : 'POST // REALIZED'}
        </div>

        {/* Dynamic State Overlay Indicator */}
        <div className="absolute top-3 right-3 bg-black text-white px-2.5 py-1 text-[7px] tracking-[0.25em] font-sans uppercase font-bold pointer-events-none z-20">
          {activeState.toUpperCase()}
        </div>

        {/* Minimalistic Toggle Pills */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-black/5 rounded-full p-0.5 flex gap-0.5 shadow-md z-20">
          <button
            onClick={() => setActiveState('before')}
            className={`px-3.5 py-1.5 text-[7px] tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-300 ${
              activeState === 'before'
                ? 'bg-black text-white'
                : 'bg-transparent text-black/50 hover:text-black'
            }`}
          >
            Before
          </button>
          <button
            onClick={() => setActiveState('after')}
            className={`px-3.5 py-1.5 text-[7px] tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-300 ${
              activeState === 'after'
                ? 'bg-black text-white'
                : 'bg-transparent text-black/50 hover:text-black'
            }`}
          >
            After
          </button>
        </div>

      </div>

      {/* Case Study Details */}
      <div className="flex flex-col text-left mt-2">
        <div className="flex justify-between items-baseline mb-3">
          <span className="font-sans text-[10px] tracking-[0.25em] font-semibold text-black/40">
            {`0${item.id} // ${item.demographic}`}
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
  const [activeIdx, setActiveIdx] = useState(0);

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

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const idx = Math.min(transformationData.length - 1, Math.floor(latest * transformationData.length));
    setActiveIdx(idx);
  });

  return (
    <div className="relative w-full bg-[#FAF9F6]">
      
      {/* ── DESKTOP ONLY: HORIZONTAL FLIGHT SCROLL PORTFOLIO (1024px+) ── */}
      {!isStatic && (
        <div ref={sectionRef} className="hidden lg:block relative w-full h-[400vh] bg-[#FAF9F6]">
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
      )}

      {/* ── STATIC SUBPAGE VIEW (2-COLUMN FADING TOGGLE GRID) ── */}
      {isStatic ? (
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {transformationData.map((item) => (
              <CaseStudyCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        /* ── MOBILE FALLBACK FOR HOME PAGE (UNDER 1024px) ── */
        <div className="lg:hidden w-full py-20 px-6 sm:px-12 bg-[#FAF9F6]">
          {/* Mobile Editorial Header */}
          <div className="mb-16 border-b border-black/10 pb-8 text-left">
            <span className="font-sans text-[8px] tracking-[0.5em] text-black/40 block mb-2 uppercase font-light">
              EXHIBITION ARCHIVE // VOL. V
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-[#1A1A1A] mb-3">
              Sartorial <span className="italic text-black/30 font-normal">Evolutions</span>
            </h2>
            <p className="font-sans text-xs text-black/50 leading-relaxed font-light">
              A study in outline alterations and proportional balancing. View the baseline initial shapes alongside the finalized, tailored profiles.
            </p>
          </div>

          <div className="flex flex-col gap-20 w-full">
            {transformationData.map((item) => (
              <CaseStudyCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Ledger Footer Call to Action */}
      {!hideButton && (
        <div className="w-full pt-16 mt-16 border-t border-black/10 flex flex-col items-center text-center">
          <span className="font-sans text-[8px] tracking-[0.4em] text-black/30 block mb-2 uppercase">
            ARCHIVE CONCLUSION CONTINUUM
          </span>
          <h4 className="font-serif text-xl font-light text-[#1A1A1A] mb-6 leading-tight max-w-xs">
            Unlock the entire visual identity ledger.
          </h4>
          <Link
            href="/transformations"
            className="tracking-[0.4em] text-[8px] uppercase font-light text-black/60 hover:text-black transition-all duration-500 py-3.5 px-8 border border-black/20 hover:border-black rounded-none bg-transparent hover:bg-black hover:text-white"
          >
            Access Full Ledger
          </Link>
        </div>
      )}

    </div>
  );
}