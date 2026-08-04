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

// ── LUXURY HIGH-FASHION EDITORIAL TRANSFORMATION CARD ──
function EditorialTransformationCard({ item }: { item: typeof transformationData[0] }) {
  const [viewMode, setViewMode] = useState<'both' | 'before' | 'after'>('both');
  const { openLightbox } = useLightbox();

  const handleOpenLightbox = (imgSrc: string, label: string) => {
    openLightbox(imgSrc, `${item.client} (${label})`, {
      num: item.id,
      category: item.demographic,
      concept: item.concept,
      story: `${item.concept} — Specifications: ${item.specs.join(' • ')}`,
      fabric: item.specs.join(' • '),
      tag: label
    });
  };

  return (
    <div className="w-full bg-[#FAF9F6] border-b border-black/10 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col gap-6">
        
        {/* Card Top Header & Category Specs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-black/50 font-bold">
                TRANSFORMATION {item.id} // {item.demographic}
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A] tracking-tight uppercase">
              {item.client}
            </h3>
          </div>

          {/* Interactive View Mode Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-[#EFECE6] p-1 rounded-full border border-black/10 self-start md:self-auto">
            <button
              onClick={() => setViewMode('both')}
              className={`px-4 py-1.5 text-[9px] tracking-[0.2em] uppercase font-mono font-bold rounded-full transition-all duration-300 cursor-pointer ${
                viewMode === 'both' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-black/60 hover:text-black'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setViewMode('before')}
              className={`px-4 py-1.5 text-[9px] tracking-[0.2em] uppercase font-mono font-bold rounded-full transition-all duration-300 cursor-pointer ${
                viewMode === 'before' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-black/60 hover:text-black'
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setViewMode('after')}
              className={`px-4 py-1.5 text-[9px] tracking-[0.2em] uppercase font-mono font-bold rounded-full transition-all duration-300 cursor-pointer ${
                viewMode === 'after' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-black/60 hover:text-black'
              }`}
            >
              After
            </button>
          </div>
        </div>

        {/* Narrative Quote */}
        <p className="font-serif text-sm sm:text-base italic font-light text-black/75 max-w-2xl leading-relaxed">
          "{item.concept}"
        </p>

        {/* Photo Canvas Frame Grid */}
        <div className="w-full mt-2">
          {viewMode === 'both' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* BEFORE FRAME */}
              <div 
                onClick={() => handleOpenLightbox(item.beforeImg, 'BEFORE')}
                className="group relative w-full aspect-[3/4] bg-[#0D0D0D] overflow-hidden border border-black/10 cursor-pointer rounded-xs shadow-md"
                title="Click to view full image & details"
              >
                <img
                  src={item.beforeImg}
                  alt={`${item.client} Before`}
                  className="w-full h-full object-cover object-top grayscale-[15%] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 bg-[#FAF9F6]/95 border border-black/10 px-3.5 py-1.5 text-[9px] tracking-[0.25em] font-mono text-black uppercase font-bold shadow-xs">
                  BEFORE // INITIAL FIT
                </div>
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white/90 px-3.5 py-1.5 text-[8px] tracking-[0.25em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ✦ CLICK TO VIEW HIGH-RES
                </div>
              </div>

              {/* AFTER FRAME */}
              <div 
                onClick={() => handleOpenLightbox(item.afterImg, 'AFTER')}
                className="group relative w-full aspect-[3/4] bg-[#0D0D0D] overflow-hidden border border-black/10 cursor-pointer rounded-xs shadow-md"
                title="Click to view full image & details"
              >
                <img
                  src={item.afterImg}
                  alt={`${item.client} After`}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 bg-black text-white px-3.5 py-1.5 text-[9px] tracking-[0.25em] font-mono uppercase font-bold shadow-xs border border-white/10">
                  AFTER // REFINED SILHOUETTE
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white/90 px-3.5 py-1.5 text-[8px] tracking-[0.25em] font-mono uppercase rounded-xs border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ✦ CLICK TO VIEW HIGH-RES
                </div>
              </div>

            </div>
          ) : (
            /* ISOLATED SINGLE FRAME (BEFORE OR AFTER) */
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleOpenLightbox(viewMode === 'before' ? item.beforeImg : item.afterImg, viewMode.toUpperCase())}
                className="group relative w-full h-[75vh] min-h-[480px] bg-[#0D0D0D] overflow-hidden border border-black/10 cursor-pointer rounded-xs shadow-lg max-w-4xl mx-auto"
                title="Click to view full image & details"
              >
                <img
                  src={viewMode === 'before' ? item.beforeImg : item.afterImg}
                  alt={viewMode}
                  className={`w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ${
                    viewMode === 'before' ? 'grayscale-[20%]' : ''
                  }`}
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 text-[9px] tracking-[0.3em] font-mono uppercase font-bold shadow-xs border border-white/10">
                  {viewMode === 'before' ? 'BEFORE // INITIAL FIT' : 'AFTER // REFINED SILHOUETTE'}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white/90 px-4 py-2 text-[8px] tracking-[0.25em] font-mono uppercase rounded-xs border border-white/10">
                  ✦ CLICK TO VIEW HIGH-RES
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Specs Highlights Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/40 font-bold mr-2">
              SPECS:
            </span>
            {item.specs.map((spec, i) => (
              <span 
                key={i} 
                className="font-mono text-[9px] tracking-wide text-black/70 bg-[#EFECE6] px-3 py-1 rounded-xs border border-black/5"
              >
                {spec}
              </span>
            ))}
          </div>

          <button
            onClick={() => handleOpenLightbox(item.afterImg, 'AFTER')}
            className="font-mono text-[9px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-0.5 transition-all font-semibold cursor-pointer"
          >
            Read Full Case Study Details →
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

export default function Transformations({ hideButton = false }: TransformationsProps) {
  return (
    <div id="transformations" className="relative w-full bg-[#FAF9F6]">
      
      {/* Redesigned Section Header */}
      <div className="border-b border-black/10 bg-[#FAF9F6] pt-20 pb-12 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
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
          <p className="font-serif text-sm sm:text-base italic text-black/60 font-light max-w-md leading-relaxed border-l-2 border-black/20 pl-4">
            Curated before-and-after silhouette evolutions, structural proportion alterations, and tailored posture balancing.
          </p>
        </div>
      </div>

      {/* Redesigned List of Transformation Cards */}
      <div className="flex flex-col divide-y divide-black/10 bg-[#FAF9F6]">
        {transformationData.map((item) => (
          <EditorialTransformationCard key={item.id} item={item} />
        ))}
      </div>

      {/* Footer Call to Action */}
      {!hideButton && (
        <div className="w-full py-16 border-t border-black/10 flex flex-col items-center text-center px-6 bg-[#FAF9F6]">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-black/45 block mb-2 font-semibold">
            EXPLORE THE COMPLETE COLLECTION
          </span>
          <h4 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1A1A] mb-8 leading-tight max-w-md">
            Ready for your personal style transformation?
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/connect"
              className="tracking-[0.3em] text-[9px] uppercase font-mono font-semibold text-white bg-[#1A1A1A] hover:bg-black transition-all duration-300 py-4 px-8 shadow-md rounded-xs cursor-pointer inline-block"
            >
              Book Transformation Consultation →
            </Link>
            <Link
              href="/transformations"
              className="tracking-[0.3em] text-[9px] uppercase font-mono font-semibold text-[#1A1A1A] bg-[#EFECE6] hover:bg-[#EAE8E3] border border-black/10 transition-all duration-300 py-4 px-8 rounded-xs cursor-pointer inline-block"
            >
              Access Full Archive
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}