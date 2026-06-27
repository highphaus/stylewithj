// src/components/sections/LookbookGrid.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Look {
  id: string;
  num: string;
  title: string;
  concept: string;
  fabric: string;
  description: string;
  primarySrc: string;
  detailSrc: string;
}

const collectionData: Look[] = [
  {
    id: 'look-1',
    num: '01',
    title: 'The Structured Silk Organza Gown',
    concept: 'Architectural Layering',
    fabric: '100% Hand-woven Silk Organza',
    description: 'An exploration of rigid geometry meeting fluid motion, constructed over an asymmetrical inner canvas bodice.',
    primarySrc: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200',
    detailSrc: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200'
  },
  {
    id: 'look-2',
    num: '02',
    title: 'Asymmetric Pleated Tailoring Suit',
    concept: 'Linear Silhouette',
    fabric: 'Raw Charcoal Flax Linen',
    description: 'A striking study in sharp horizontal canvas pleats and extended shoulder pads, mapping out structural dominance.',
    primarySrc: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200',
    detailSrc: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200'
  }
];

export default function LookbookGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="collections" className="px-6 md:px-16 py-36 max-w-7xl mx-auto bg-[#FAF9F6]">
      
      {/* 1. Classical Exhibition Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 border-b border-neutral-200 pb-12">
        <div>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-neutral-400 block mb-3">
            Active Portfolios
          </span>
          <h3 className="font-serif text-5xl md:text-7xl font-light tracking-wide">
            The Exhibition
          </h3>
        </div>
        <p className="font-sans text-[11px] tracking-[0.2em] text-neutral-400 uppercase mt-4 md:mt-0 font-light max-w-[240px] leading-relaxed text-left md:text-right">
          Click an editorial fragment to unfold the technical blueprint.
        </p>
      </div>

      {/* 2. Full-Width Structural Accordion Matrix */}
      <div className="flex flex-col gap-6">
        {collectionData.map((look) => {
          const isExpanded = expandedId === look.id;

          return (
            <motion.div
              key={look.id}
              layout="position"
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full border-b border-neutral-200 pb-6 overflow-hidden"
            >
              {/* Trigger Bar: Interactive Heading Strip */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : look.id)}
                className="flex justify-between items-center py-6 cursor-pointer group select-none"
              >
                <div className="flex items-center gap-8 md:gap-16">
                  <span className="font-mono text-xs tracking-widest text-neutral-400">{look.num}</span>
                  <h4 className="font-serif text-2xl md:text-4xl font-light tracking-wide text-[#1A1A1A] group-hover:translate-x-2 transition-transform duration-500">
                    {look.title}
                  </h4>
                </div>
                <motion.span 
                  animate={{ rotate: isExpanded ? 45 : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-light text-2xl md:text-4xl text-neutral-300 group-hover:text-black transition-colors"
                >
                  +
                </motion.span>
              </div>

              {/* 3. Smooth Expanding Exhibition Window */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6 pb-8 items-start">
                      
                      {/* Left Side: Asymmetric Dynamic Media Frame */}
                      <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                          <Image
                            src={look.primarySrc}
                            alt="Front Silhouette View"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 50vw, 35vw"
                          />
                        </div>
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 mt-8">
                          <Image
                            src={look.detailSrc}
                            alt="Textile Blueprint Zoom"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 50vw, 35vw"
                          />
                        </div>
                      </div>

                      {/* Right Side: Editorial Blueprint Data */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:col-span-5 flex flex-col justify-center pt-8 lg:pt-20 lg:pl-12 text-[#1A1A1A]"
                      >
                        <div className="flex flex-col gap-1 border-b border-neutral-200 pb-6 mb-6 font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400">
                          <span>Concept // {look.concept}</span>
                          <span>Textile // {look.fabric}</span>
                        </div>
                        <p className="font-serif text-lg leading-relaxed text-neutral-600 font-light mb-4">
                          {look.description}
                        </p>
                      </motion.div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}