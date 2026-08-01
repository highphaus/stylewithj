'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const looks = [
  {
    num: '01',
    title: 'The Staircase Polka Dot Silk Slip',
    category: 'CONTEMPORARY WESTERN',
    concept: 'Monochrome Fluidity',
    fabric: 'Bias-Cut Polka Dot Silk Crepe',
    desc: 'A striking polka dot slip dress tailored with fluid drape, paired with lace-up heels and sleek shoulder bag.',
    image: '/images/includes/B4A2A5F7-FFA5-4B7A-9B0F-5EA8653D623E.JPG.jpeg',
  },
  {
    num: '02',
    title: 'Poolside Peplum Evening Column',
    category: 'EDITORIAL EVENING',
    concept: 'Architectural Waistlines',
    fabric: 'Structured Felted Peplum Gown',
    desc: 'Strapless corset peplum gown offering razor-sharp posture for luxury evening affairs and red carpet moments.',
    image: '/images/includes/IMG_8709.JPG.jpeg',
  },
  {
    num: '03',
    title: 'Sunlit Meadow Halter Curation',
    category: 'ELEVATED CASUAL',
    concept: 'Natural Proportions',
    fabric: 'Sand-Washed Linen Halter & Leather',
    desc: 'Clean white halter dress accessorized with an artisanal brown leather disc waist belt in open golden fields.',
    image: '/images/includes/IMG_9051.JPG.jpeg',
  },
  {
    num: '04',
    title: 'Coastal Backless Halter Gown',
    category: 'RESORT LUXURY',
    concept: 'Ocean Breeze Movement',
    fabric: 'Liquid Black Charmeuse Silk',
    desc: 'Deep backless halter maxi silhouette capturing effortless movement against open sea horizons.',
    image: '/images/includes/IMG_3112.JPG.jpeg',
  },
  {
    num: '05',
    title: 'Boho Lakeshore Floral Dress',
    category: 'DESTINATION STYLE',
    concept: 'Romantic Textures',
    fabric: 'Spun Cotton Floral & Leather',
    desc: 'Soft white floral midi dress paired with rustic leather boots and relaxed lakeside styling.',
    image: '/images/includes/IMG_9135.JPG.jpeg',
  },
  {
    num: '06',
    title: 'Midnight Off-Shoulder Evening Drape',
    category: 'HIGH FASHION',
    concept: 'Sculpted Glamour',
    fabric: 'Gathered Ruched Jersey & Gold Accents',
    desc: 'Sleek off-shoulder dark navy column dress featuring ruched waist detailing, statement gold cuffs, and dark sunglasses.',
    image: '/images/includes/IMG_8826.JPG.jpeg',
  },
];

export default function LookbookGrid() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First look open by default

  const toggleItem = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="bg-[#FAF9F6] text-[#1A1A1A] py-12 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto">
      
      {/* ── HEADER ── */}
      <div className="mb-12 pb-6 border-b border-black/15">
        <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight">
          Curated Collections
        </h2>
      </div>

      {/* ── INTERACTIVE ACCORDION LIST (IMAGE & DETAILS TOGGLE INSIDE EACH NAME) ── */}
      <div className="flex flex-col border border-black/10 divide-y divide-black/10 bg-[#FAF9F6] shadow-[0_12px_40px_rgba(0,0,0,0.03)] rounded-sm overflow-hidden">
        {looks.map((look, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div 
              key={look.num}
              className={`transition-all duration-300 w-full ${
                isOpen ? 'bg-black text-white' : 'bg-transparent text-black/80 hover:bg-black/[0.015]'
              }`}
            >
              {/* TOGGLE HEADER BUTTON */}
              <button
                onClick={() => toggleItem(idx)}
                className="w-full p-5 sm:p-7 text-left flex justify-between items-center outline-none focus:outline-none cursor-pointer select-none group"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className={`font-mono text-xs sm:text-sm transition-colors ${isOpen ? 'text-white/50 font-bold' : 'text-black/35 group-hover:text-black font-medium'}`}>
                    /{look.num}
                  </span>
                  <h3 className={`font-serif text-lg sm:text-2xl transition-all leading-tight ${isOpen ? 'text-white font-medium italic' : 'text-black/80 group-hover:text-black'}`}>
                    {look.title}
                  </h3>
                </div>

                {/* Plus / Minus Indicator */}
                <div className="flex-shrink-0 ml-4">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? 'bg-white text-black border-white scale-105' 
                      : 'bg-transparent text-black/40 border-black/15 group-hover:border-black/40 group-hover:text-black'
                  }`}>
                    <span className="text-sm sm:text-base leading-none font-light">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </div>
              </button>

              {/* EXPANDABLE CONTENT (IMAGE & DETAILS INSIDE EACH ITEM CARD) */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-8 pb-7 sm:pb-9 pt-2 flex flex-col gap-6 border-t border-white/10">
                      
                      {/* Photo Frame Inside the Item Card */}
                      <div className="relative aspect-[3/4] sm:aspect-[16/10] w-full max-h-[520px] overflow-hidden bg-[#1A1A1A] border border-white/10 rounded-sm shadow-md">
                        <Image
                          src={look.image}
                          alt={look.title}
                          fill
                          className="object-cover object-center"
                          unoptimized
                        />
                      </div>

                      {/* Description & Metadata */}
                      <div className="flex flex-col gap-3">
                        <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed font-light max-w-2xl border-l-2 border-white/20 pl-4 py-0.5">
                          {look.desc}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 border-t border-white/10 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium text-white/60">
                          <div className="flex items-center gap-2">
                            <span className="text-white/40">Concept:</span>
                            <span className="text-white/90">{look.concept}</span>
                          </div>
                          <span className="text-white/20">•</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white/40">Fabric:</span>
                            <span className="text-white/90">{look.fabric}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </section>
  );
}