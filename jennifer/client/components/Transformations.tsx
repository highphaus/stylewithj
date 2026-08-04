'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
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
}

function ScrollingCaseStudyRow({ item, idx, scrollYProgress, totalItems }: RowProps) {
  const { openLightbox } = useLightbox();

  const segment = 1 / totalItems;
  const isFirst = idx === 0;

  const pStart = idx * segment;
  const pMid = pStart + segment * 0.2;

  const inputRange = isFirst ? [0.0, 0.8, 1.0] : [pStart, pMid, 1.0];
  const opacityRange = isFirst ? [1.0, 1.0, 1.0] : [0.0, 1.0, 1.0];
  const beforeRange = isFirst ? ["0vw", "0vw", "0vw"] : ["-100vw", "0vw", "0vw"];
  const afterRange = isFirst ? ["0vw", "0vw", "0vw"] : ["100vw", "0vw", "0vw"];
  const scaleRange = isFirst ? [1.0, 1.0, 1.0] : [1.02, 1.0, 1.0];

  const opacity = useTransform(scrollYProgress, inputRange, opacityRange);
  const beforeX = useTransform(scrollYProgress, inputRange, beforeRange);
  const afterX = useTransform(scrollYProgress, inputRange, afterRange);
  const scale = useTransform(scrollYProgress, inputRange, scaleRange);

  const handleOpenDetails = (imgSrc: string, mode: 'BEFORE' | 'AFTER') => {
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
    <motion.div 
      style={{ opacity, zIndex: (idx + 1) * 10 }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="relative w-full h-full flex flex-col justify-between p-6 lg:p-12 pointer-events-auto overflow-hidden bg-[#FAF9F6]">
        
        {/* Header Title Above Frame */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-black/10 pb-4">
          <div>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/45 block mb-1 font-bold">
              ✦ {item.id} // {item.demographic}
            </span>
            <h3 className="font-serif text-2xl lg:text-4xl font-light text-[#1A1A1A] tracking-tight uppercase">
              {item.client}
            </h3>
          </div>
          <p className="font-serif text-xs sm:text-sm italic text-black/75 font-light max-w-md leading-relaxed">
            "{item.concept}"
          </p>
        </div>

        {/* Clean Side-by-Side Dual Photo Projection (0 Box Overlays) */}
        <div className="flex-1 w-full grid grid-cols-2 gap-4 lg:gap-8 my-4 overflow-hidden">
          
          {/* Left Frame: BEFORE */}
          <div 
            onClick={() => handleOpenDetails(item.beforeImg, 'BEFORE')}
            className="relative h-full w-full bg-[#EAE8E3] overflow-hidden border border-black/10 cursor-pointer group rounded-xs"
            title="Click to view full image & details"
          >
            <motion.div style={{ x: beforeX }} className="w-full h-full relative">
              <motion.img 
                style={{ scale }}
                src={item.beforeImg} 
                alt="Before" 
                className="w-full h-full object-cover object-top grayscale-[15%] group-hover:scale-[1.02] transition-transform duration-700" 
                draggable="false" 
              />
              <div className="absolute top-4 left-4 bg-[#FAF9F6]/95 border border-black/10 px-3 py-1.5 text-[8px] sm:text-[9px] tracking-[0.25em] font-sans text-black uppercase font-bold shadow-xs">
                BEFORE
              </div>
            </motion.div>
          </div>

          {/* Right Frame: AFTER */}
          <div 
            onClick={() => handleOpenDetails(item.afterImg, 'AFTER')}
            className="relative h-full w-full bg-[#EAE8E3] overflow-hidden border border-black/10 cursor-pointer group rounded-xs"
            title="Click to view full image & details"
          >
            <motion.div style={{ x: afterX }} className="w-full h-full relative">
              <motion.img 
                style={{ scale }}
                src={item.afterImg} 
                alt="After" 
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700" 
                draggable="false" 
              />
              <div className="absolute top-4 right-4 bg-black text-white px-3 py-1.5 text-[8px] sm:text-[9px] tracking-[0.25em] font-sans uppercase font-bold shadow-xs">
                AFTER
              </div>
            </motion.div>
          </div>

        </div>

        {/* Footer Subtext */}
        <div className="flex items-center justify-between border-t border-black/10 pt-3">
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-black/50 uppercase">
            Specifications: {item.specs.join(' • ')}
          </span>
          <button
            onClick={() => handleOpenDetails(item.afterImg, 'AFTER')}
            className="font-mono text-[9px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-0.5 transition-all font-semibold"
          >
            Explore Details →
          </button>
        </div>

      </div>
    </motion.div>
  );
}

// Clean Mobile Card Component
function CaseStudyCard({ item, fullBleedMobile = false }: { item: typeof transformationData[0]; fullBleedMobile?: boolean }) {
  const { openLightbox } = useLightbox();

  const handleOpenDetails = (imgSrc: string, mode: 'BEFORE' | 'AFTER') => {
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
    <div className={`flex flex-col bg-[#FAF9F6] ${fullBleedMobile ? 'w-full pb-8' : 'border border-black/10 p-4 rounded-xs shadow-xs'}`}>
      
      {/* Header Info */}
      <div className="px-6 pt-6 pb-4">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/45 font-bold block mb-1">
          ✦ {item.id} // {item.demographic}
        </span>
        <h3 className="font-serif text-2xl font-light text-[#1A1A1A] uppercase tracking-wide">
          {item.client}
        </h3>
      </div>

      {/* Dual Side-by-Side Images */}
      <div className="grid grid-cols-2 gap-2 px-6">
        <div 
          onClick={() => handleOpenDetails(item.beforeImg, 'BEFORE')}
          className="relative h-[65vh] min-h-[380px] bg-[#0D0D0D] overflow-hidden cursor-pointer group rounded-xs border border-black/10"
          title="Click to view image"
        >
          <img
            src={item.beforeImg}
            alt="Before"
            className="w-full h-full object-cover object-top grayscale-[15%] group-hover:scale-[1.02] transition-transform duration-500"
            draggable="false"
          />
          <div className="absolute top-3 left-3 bg-[#FAF9F6]/95 border border-black/10 px-2.5 py-1 text-[8px] tracking-[0.2em] font-sans text-black uppercase font-bold shadow-xs">
            BEFORE
          </div>
        </div>

        <div 
          onClick={() => handleOpenDetails(item.afterImg, 'AFTER')}
          className="relative h-[65vh] min-h-[380px] bg-[#0D0D0D] overflow-hidden cursor-pointer group rounded-xs border border-black/10"
          title="Click to view image"
        >
          <img
            src={item.afterImg}
            alt="After"
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
            draggable="false"
          />
          <div className="absolute top-3 right-3 bg-black text-white px-2.5 py-1 text-[8px] tracking-[0.2em] font-sans uppercase font-bold shadow-xs">
            AFTER
          </div>
        </div>
      </div>

      {/* Narrative & Button Underneath */}
      <div className="px-6 pt-4 flex flex-col gap-2">
        <p className="font-serif text-xs sm:text-sm italic text-black/75 font-light leading-relaxed">
          "{item.concept}"
        </p>
        <div className="pt-1">
          <button
            onClick={() => handleOpenDetails(item.afterImg, 'AFTER')}
            className="font-mono text-[9px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-0.5 transition-all font-semibold"
          >
            Explore Details →
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
      
      {/* ── MOBILE EXCLUSIVE VIEW ── */}
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

          {/* Stack of Clean Side-by-Side Mobile Cards */}
          <div className="flex flex-col divide-y divide-black/10 bg-[#FAF9F6]">
            {transformationData.map((item) => (
              <CaseStudyCard key={item.id} item={item} fullBleedMobile={true} />
            ))}
          </div>
        </div>
      )}

      {/* ── DESKTOP EXCLUSIVE VIEW: Smooth Flight Scroll ── */}
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