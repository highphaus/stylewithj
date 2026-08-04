'use client';

import React, { useState, useRef, useCallback } from 'react';
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

// ── WORLD-CLASS INTERACTIVE DRAG-TO-REVEAL CURTAIN SLIDER COMPONENT ──
function BeforeAfterSliderCard({ item, isMobile = false }: { item: typeof transformationData[0]; isMobile?: boolean }) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openLightbox } = useLightbox();

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handleOpenDetails = () => {
    openLightbox(item.afterImg, item.client, {
      num: item.id,
      category: item.demographic,
      concept: item.concept,
      story: `${item.concept} — Specifications: ${item.specs.join(' • ')}`,
      fabric: item.specs.join(' • '),
      tag: 'TRANSFORMATION'
    });
  };

  return (
    <div className="w-full flex flex-col bg-[#FAF9F6]">
      
      {/* Interactive Curtain Frame */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        className={`relative w-full ${isMobile ? 'h-[85vh] min-h-[480px]' : 'h-[90vh] min-h-[600px]'} bg-[#0D0D0D] overflow-hidden select-none cursor-ew-resize group`}
      >
        {/* 1. AFTER IMAGE (UNDERNEATH FULL WIDTH) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={item.afterImg}
            alt={`${item.client} After`}
            className="w-full h-full object-cover object-top"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          
          {/* After Floating Tag */}
          <div className="absolute top-6 right-6 bg-black text-white px-3.5 py-1.5 text-[8px] sm:text-[9px] tracking-[0.3em] font-mono uppercase font-bold shadow-md z-10 rounded-xs border border-white/10">
            AFTER // REFINED SILHOUETTE
          </div>
        </div>

        {/* 2. BEFORE IMAGE (CLIPPED ON TOP BY SLIDER POSITION) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw' }}>
            <img
              src={item.beforeImg}
              alt={`${item.client} Before`}
              className="w-full h-full object-cover object-top grayscale-[20%]"
              draggable="false"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Before Floating Tag */}
            <div className="absolute top-6 left-6 bg-[#FAF9F6]/95 backdrop-blur-md border border-black/10 px-3.5 py-1.5 text-[8px] sm:text-[9px] tracking-[0.3em] font-mono text-black uppercase font-bold shadow-md z-10 rounded-xs">
              BEFORE // INITIAL FIT
            </div>
          </div>
        </div>

        {/* 3. VERTICAL DIVIDER LINE & GRIP HANDLE */}
        <div 
          className="absolute inset-y-0 z-30 pointer-events-none flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-[2px] h-full bg-white shadow-[0_0_15px_rgba(0,0,0,0.8)]" />
          
          {/* Circular Luxury Grip Badge */}
          <div className="absolute w-10 h-10 rounded-full bg-black/90 text-white border border-white/40 shadow-2xl flex items-center justify-center text-xs font-mono tracking-tighter backdrop-blur-md cursor-ew-resize">
            <span>‹ ›</span>
          </div>
        </div>

        {/* Bottom Floating Info Badge & Click Details Button */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xs text-[8px] sm:text-[9px] tracking-[0.3em] font-mono uppercase font-bold border border-white/10">
            ✦ {item.id} // {item.client}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleOpenDetails(); }}
            className="pointer-events-auto px-4 py-2 bg-white text-black hover:bg-white/90 text-[8px] sm:text-[9px] tracking-[0.25em] font-mono uppercase font-bold rounded-xs shadow-lg transition-all"
          >
            View Details & Story →
          </button>
        </div>

      </div>

      {/* Narrative Section Below Card */}
      <div className="px-6 py-6 border-b border-black/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FAF9F6]">
        <div>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-black/45 block mb-1 font-bold">
            {item.demographic}
          </span>
          <p className="font-serif text-sm sm:text-base italic text-black/80 font-light max-w-xl leading-relaxed">
            "{item.concept}"
          </p>
        </div>

        <button
          onClick={handleOpenDetails}
          className="font-mono text-[9px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-0.5 transition-all font-semibold whitespace-nowrap cursor-pointer"
        >
          Read Full Case Study →
        </button>
      </div>

    </div>
  );
}

interface TransformationsProps {
  hideButton?: boolean;
  isStatic?: boolean;
}

export default function Transformations({ hideButton = false }: TransformationsProps) {
  return (
    <div className="relative w-full bg-[#FAF9F6] overflow-clip">
      
      {/* Section Header */}
      <div className="px-6 sm:px-12 lg:px-20 pt-16 pb-8 border-b border-black/10 bg-[#FAF9F6] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-black/45 block mb-2 font-semibold">
            ✦ BEFORE & AFTER SILHOUETTE STUDIES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-black tracking-tight">
            Visual Structural Transformations
          </h2>
        </div>
        <p className="font-serif text-xs italic text-black/60 max-w-xs leading-relaxed">
          Drag the center handle on any photo to reveal the before and after silhouette evolution.
        </p>
      </div>

      {/* Stack of Interactive Drag-to-Reveal Case Studies */}
      <div className="flex flex-col bg-[#FAF9F6]">
        {transformationData.map((item) => (
          <BeforeAfterSliderCard key={item.id} item={item} />
        ))}
      </div>

      {/* Ledger Footer Call to Action */}
      {!hideButton && (
        <div className="w-full pt-12 pb-16 border-t border-black/10 flex flex-col items-center text-center px-6">
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