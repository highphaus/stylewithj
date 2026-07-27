'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const looks = [
  {
    num: '01',
    title: 'The Structured Trench Curation',
    category: 'SARTORIAL',
    concept: 'Transitional Layering',
    fabric: 'Bonded Cotton Gabardine',
    desc: 'An understated outerwear piece structured for modern urban environments, designed to layer effortlessly over fine silks.',
    image: '/images/img11.jpeg',
  },
  {
    num: '02',
    title: 'Asymmetric Tailored Pleat Suit',
    category: 'SARTORIAL',
    concept: 'Linear Silhouettes',
    fabric: 'Raw Flax Linen & Wool Blend',
    desc: 'A study in relaxed drape tailoring, offering sharp modern posture with comfortable fabrics.',
    image: '/images/img12.jpeg',
  },
  {
    num: '03',
    title: 'Silk Slip & Oversized Cashmere Knit',
    category: 'MINIMALIST CASUAL',
    concept: 'Texture Play',
    fabric: 'Mulberry Silk & Cashmere',
    desc: 'A delicate fluid silk slip balanced with an oversized textured knit for elevated casual luxury.',
    image: '/images/img13.jpeg',
  },
  {
    num: '04',
    title: 'Modern Monochromatic Executive Set',
    category: 'SARTORIAL',
    concept: 'Sartorial Authority',
    fabric: 'Fine Tropical Wool',
    desc: 'Sharp tonal dressing designed for senior corporate leadership roles, commanding attention with ease.',
    image: '/images/img14.jpeg',
  },
  {
    num: '05',
    title: 'The Occasion Resort Suit',
    category: 'RESORT & LIFE',
    concept: 'Relaxed Sartorialism',
    fabric: 'Organic Crumpled Cotton Linen',
    desc: 'An effortless resort-inspired silhouette suited for summer destination weddings or high-end travels.',
    image: '/images/img15.jpeg',
  },
  {
    num: '06',
    title: 'Understated Silk Lounge Set',
    category: 'MINIMALIST CASUAL',
    concept: 'Intentional Comfort',
    fabric: 'Sand-washed Silk Charmeuse',
    desc: 'Fluid, flowing tailoring constructed to transition seamlessly from day comfort to evening celebrations.',
    image: '/images/img16.jpeg',
  },
];

export default function LookbookGrid() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="bg-[#FAF9F6] text-[#1A1A1A] py-12 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-8 border-b border-black/15">
        <div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight">
            Curated Collections
          </h2>
        </div>
        <p className="font-sans text-xs tracking-wider text-black/55 uppercase mt-3 md:mt-0 font-light max-w-[280px] leading-relaxed">
          A showcase of curated silhouettes, styling lines, and textile selections built for intentional living.
        </p>
      </div>

      {/* ── INTERACTIVE 2-COLUMN VIEWPORT (PICTURE LEFT, ACCORDION BUTTONS RIGHT) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: Large Active Image Display */}
        <div className="col-span-12 lg:col-span-7 relative aspect-[4/5] sm:aspect-[3/4] lg:h-[70vh] lg:aspect-auto w-full bg-[#EAE8E3] border border-black/5 shadow-md overflow-hidden select-none rounded-sm">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={looks[activeIdx].image}
              alt={looks[activeIdx].title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              draggable="false"
            />
          </AnimatePresence>

          {/* Top Tag */}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[8px] tracking-[0.3em] uppercase text-white font-sans z-10 rounded-xs">
            LOOK 0{activeIdx + 1}
          </div>

          {/* Fabric Tag Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 border border-black/5 z-10 max-w-xs shadow-sm rounded-xs">
            <span className="text-[6px] tracking-[0.25em] uppercase block text-black/50 font-sans font-semibold">FABRIC DETAIL</span>
            <span className="font-serif text-[11px] text-black italic leading-none">{looks[activeIdx].fabric}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Highly Visible Interactive Selector Buttons List */}
        <div className="col-span-12 lg:col-span-5 flex flex-col border border-black/10 divide-y divide-black/10 bg-[#FAF9F6] shadow-[0_12px_40px_rgba(0,0,0,0.03)] rounded-sm">
          {looks.map((look, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={look.num}
                onClick={() => setActiveIdx(idx)}
                className={`text-left p-5 sm:p-6 transition-all duration-300 flex flex-col w-full outline-none focus:outline-none relative group rounded-sm ${
                  isActive 
                    ? 'bg-black text-white border-l-4 border-l-white pl-7 sm:pl-8 shadow-lg' 
                    : 'hover:bg-black/[0.01] text-black/65'
                }`}
              >
                {/* Horizontal Header of the Button */}
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-baseline gap-3.5">
                    <span className={`font-mono text-xs font-medium transition-colors ${isActive ? 'text-white/50 font-bold' : 'text-black/35 group-hover:text-black'}`}>
                      /{look.num}
                    </span>
                    <h3 className={`font-serif text-base sm:text-lg transition-all leading-tight ${isActive ? 'text-white font-medium italic' : 'text-black/60 group-hover:text-black'}`}>
                      {look.title}
                    </h3>
                  </div>

                  {/* Visual Accordion State Indicator (Plus/Minus Icon) */}
                  <div className="flex-shrink-0 ml-3">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-white text-black border-white scale-110' 
                        : 'bg-transparent text-black/40 border-black/10 group-hover:border-black/30 group-hover:text-black'
                    }`}>
                      <span className="text-xs leading-none font-light">
                        {isActive ? '−' : '+'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Smooth Expandable Description Block */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-xs leading-relaxed font-sans font-light mt-4 overflow-hidden w-full text-white/80"
                  >
                    <p className="mb-4 text-white/80 border-l border-white/15 pl-3">
                      {look.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-3 border-t border-white/10 text-[8px] tracking-[0.2em] uppercase font-medium text-white/50">
                      <div className="flex items-center gap-1.5">
                        <span className="text-white/30">concept:</span>
                        <span className="text-white/90">{look.concept}</span>
                      </div>
                      <span className="text-white/20">•</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white/30">fabric:</span>
                        <span className="text-white/90">{look.fabric}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

      </div>

    </section>
  );
}