'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';
import { useSiteData } from '@/lib/use-site-data';
import { TransformationItem, seedTransformations } from '@/lib/site-data';

export default function TransformationsFeed() {
  const { openLightbox } = useLightbox();
  const { transformations } = useSiteData();
  const data: TransformationItem[] = (transformations && transformations.length > 0) ? transformations : seedTransformations;

  const handleOpenLightbox = (imgSrc: string, clientName: string, label: string, item: TransformationItem) => {
    openLightbox(imgSrc, `${clientName} — ${label}`, {
      id: `trans-${item.id}-${label.toLowerCase()}`,
      num: item.id,
      category: item.demographic,
      concept: item.concept,
      story: label === 'BEFORE' ? item.beforeStory : item.afterStory,
      tag: label
    });
  };

  return (
    <div className="w-full bg-[#FAF9F6] py-12 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col gap-16 sm:gap-24 lg:gap-32">
        {data.map((item, index) => {
          // Alternating pattern: Even index = Images Left, Story Right. Odd index = Story Left, Images Right.
          const isEven = index % 2 === 0;
          const itemNum = String(index + 1).padStart(2, '0');

          return (
            <motion.article
              key={item.id || index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative border-b border-black/10 pb-16 sm:pb-24 lg:pb-32 last:border-b-0 last:pb-0"
            >
              {/* ═══════════════════════════════════════════════════════════════════
                  DESKTOP (lg+) 12-COLUMN ALTERNATING DOWN-BY-DOWN GRID
                  Even index: Images on Left (cols 1-7), Content on Right (cols 8-12)
                  Odd index:  Content on Left (cols 1-5), Images on Right (cols 6-12)
                  ═══════════════════════════════════════════════════════════════════ */}
              <div className="hidden lg:grid grid-cols-12 gap-12 xl:gap-16 items-center">
                
                {/* ── IMAGE CANVAS BLOCK ── */}
                <div className={`col-span-7 ${isEven ? 'order-1' : 'order-2'}`}>
                  <div className="grid grid-cols-2 gap-3.5 w-full h-[520px] xl:h-[580px]">
                    
                    {/* Before Image */}
                    <div
                      onClick={() => handleOpenLightbox(item.beforeImg, item.client, 'BEFORE', item)}
                      className="group relative w-full h-full bg-[#0D0D0D] overflow-hidden rounded-xs border border-black/15 shadow-xs cursor-pointer select-none"
                      title="Click to view BEFORE photo in lightbox"
                    >
                      <img
                        src={item.beforeImg}
                        alt={`${item.client} Before`}
                        className="w-full h-full object-cover object-top subpage-image-filter grayscale-[15%] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        draggable={false}
                      />
                      <div className="subpage-image-overlay" />
                      
                      {/* Top Left Tag */}
                      <div className="absolute top-4 left-4 z-10 bg-[#FAF9F6]/95 border border-black/10 px-3 py-1 text-[8.5px] tracking-[0.25em] font-mono text-black uppercase font-bold shadow-xs">
                        BEFORE
                      </div>

                      {/* Hover Lightbox Cue */}
                      <div className="absolute inset-0 z-10 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="font-mono text-[9px] tracking-[0.2em] text-white uppercase bg-black/75 backdrop-blur-sm px-3 py-1.5 border border-white/20 rounded-xs shadow-md">
                          Expand ↗
                        </span>
                      </div>
                    </div>

                    {/* After Image */}
                    <div
                      onClick={() => handleOpenLightbox(item.afterImg, item.client, 'AFTER', item)}
                      className="group relative w-full h-full bg-[#0D0D0D] overflow-hidden rounded-xs border border-black/15 shadow-xs cursor-pointer select-none"
                      title="Click to view AFTER photo in lightbox"
                    >
                      <img
                        src={item.afterImg}
                        alt={`${item.client} After`}
                        className="w-full h-full object-cover object-top subpage-image-filter group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        draggable={false}
                      />
                      <div className="subpage-image-overlay" />

                      {/* Top Right Tag */}
                      <div className="absolute top-4 right-4 z-10 bg-black text-white px-3 py-1 text-[8.5px] tracking-[0.25em] font-mono uppercase font-bold shadow-xs border border-white/10">
                        AFTER
                      </div>

                      {/* Hover Lightbox Cue */}
                      <div className="absolute inset-0 z-10 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="font-mono text-[9px] tracking-[0.2em] text-white uppercase bg-black/75 backdrop-blur-sm px-3 py-1.5 border border-white/20 rounded-xs shadow-md">
                          Expand ↗
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ── STORYTELLING & REVIEW CARD BLOCK ── */}
                <div className={`col-span-5 flex flex-col justify-center space-y-6 ${isEven ? 'order-2 pl-2' : 'order-1 pr-2'}`}>
                  
                  {/* Category & Index Header */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] tracking-[0.25em] text-black/50 font-bold">
                      {itemNum} / 0{data.length}
                    </span>
                    <span className="text-black/20">•</span>
                    <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-black/60 font-semibold bg-[#EFECE6] px-2.5 py-0.5 rounded-xs">
                      {item.demographic}
                    </span>
                  </div>

                  {/* Title & Concept */}
                  <div>
                    <h2 className="font-serif text-3xl xl:text-4xl font-light text-[#1A1A1A] tracking-tight leading-tight">
                      {item.client}
                    </h2>
                    <p className="font-serif text-sm xl:text-base italic text-black/60 font-light mt-1.5">
                      {item.concept}
                    </p>
                  </div>

                  {/* Narrative Dual Breakdown */}
                  <div className="grid grid-cols-1 gap-3.5 pt-1">
                    <div className="p-4 bg-[#F2EFE9] border border-black/5 rounded-xs">
                      <span className="font-mono text-[8px] tracking-[0.28em] uppercase text-black/45 font-bold block mb-1">
                        THE SILHOUETTE CHALLENGE
                      </span>
                      <p className="font-sans text-xs sm:text-[13px] text-black/80 font-light leading-relaxed">
                        {item.beforeStory}
                      </p>
                    </div>

                    <div className="p-4 bg-white border border-black/10 rounded-xs shadow-xs">
                      <span className="font-mono text-[8px] tracking-[0.28em] uppercase text-black/60 font-bold block mb-1">
                        THE TAILORED ARCHITECTURE
                      </span>
                      <p className="font-sans text-xs sm:text-[13px] text-black/90 font-normal leading-relaxed">
                        {item.afterStory}
                      </p>
                    </div>
                  </div>

                  {/* Verified Client Review Card */}
                  {item.review && (
                    <div className="p-5 bg-black text-white rounded-xs shadow-md border border-white/10 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[#D4AF37] text-xs">
                          {'★'.repeat(item.review.rating || 5)}
                        </div>
                        <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/50">
                          VERIFIED CLIENT REVIEW
                        </span>
                      </div>
                      
                      <p className="font-serif text-xs sm:text-sm italic font-light text-white/95 leading-relaxed">
                        "{item.review.quote}"
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-white/10 font-mono text-[8.5px] tracking-[0.2em] text-white/70">
                        <span>{item.review.author}</span>
                        <span>{item.review.location}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Link */}
                  <div className="pt-2">
                    <Link
                      href="/connect"
                      className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#1A1A1A] hover:bg-black text-white font-mono text-[9.5px] tracking-[0.25em] uppercase font-semibold rounded-xs shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Book Consultation</span>
                      <span className="text-xs">→</span>
                    </Link>
                  </div>

                </div>

              </div>

              {/* ═══════════════════════════════════════════════════════════════════
                  MOBILE & TABLET (< lg) RESPONSIVE STACK
                  ═══════════════════════════════════════════════════════════════════ */}
              <div className="lg:hidden flex flex-col gap-6">
                
                {/* Header Info */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-black/50 font-bold">
                      {itemNum} / 0{data.length}
                    </span>
                    <span className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/60 bg-[#EFECE6] px-2.5 py-0.5 rounded-xs">
                      {item.demographic}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] tracking-tight leading-tight">
                    {item.client}
                  </h2>
                  <p className="font-serif text-xs sm:text-sm italic text-black/60 font-light">
                    {item.concept}
                  </p>
                </div>

                {/* Dual Images Side-by-Side (Mobile) */}
                <div className="grid grid-cols-2 gap-2.5 w-full aspect-[4/3] sm:h-[450px]">
                  
                  {/* Before */}
                  <div
                    onClick={() => handleOpenLightbox(item.beforeImg, item.client, 'BEFORE', item)}
                    className="relative w-full h-full bg-[#0D0D0D] overflow-hidden rounded-xs border border-black/15 cursor-pointer select-none"
                    title="Tap to view BEFORE in lightbox"
                  >
                    <img
                      src={item.beforeImg}
                      alt={`${item.client} Before`}
                      className="w-full h-full object-cover object-top subpage-image-filter grayscale-[15%]"
                      draggable={false}
                    />
                    <div className="subpage-image-overlay" />
                    <div className="absolute top-2.5 left-2.5 z-10 bg-[#FAF9F6]/95 border border-black/10 px-2 py-0.5 text-[7.5px] tracking-[0.2em] font-mono text-black uppercase font-bold shadow-xs">
                      BEFORE
                    </div>
                  </div>

                  {/* After */}
                  <div
                    onClick={() => handleOpenLightbox(item.afterImg, item.client, 'AFTER', item)}
                    className="relative w-full h-full bg-[#0D0D0D] overflow-hidden rounded-xs border border-black/15 cursor-pointer select-none"
                    title="Tap to view AFTER in lightbox"
                  >
                    <img
                      src={item.afterImg}
                      alt={`${item.client} After`}
                      className="w-full h-full object-cover object-top subpage-image-filter"
                      draggable={false}
                    />
                    <div className="subpage-image-overlay" />
                    <div className="absolute top-2.5 right-2.5 z-10 bg-black text-white px-2 py-0.5 text-[7.5px] tracking-[0.2em] font-mono uppercase font-bold shadow-xs border border-white/10">
                      AFTER
                    </div>
                  </div>

                </div>

                {/* Story Breakdown */}
                <div className="flex flex-col gap-3">
                  <div className="p-3.5 bg-[#F2EFE9] border border-black/5 rounded-xs">
                    <span className="font-mono text-[7.5px] tracking-[0.25em] uppercase text-black/45 font-bold block mb-1">
                      CHALLENGE
                    </span>
                    <p className="font-sans text-xs text-black/80 font-light leading-relaxed">
                      {item.beforeStory}
                    </p>
                  </div>

                  <div className="p-3.5 bg-white border border-black/10 rounded-xs shadow-xs">
                    <span className="font-mono text-[7.5px] tracking-[0.25em] uppercase text-black/60 font-bold block mb-1">
                      TRANSFORMATION
                    </span>
                    <p className="font-sans text-xs text-black/90 font-normal leading-relaxed">
                      {item.afterStory}
                    </p>
                  </div>
                </div>

                {/* Client Review Card */}
                {item.review && (
                  <div className="p-4 bg-black text-white rounded-xs shadow-md border border-white/10 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#D4AF37] text-xs">
                        {'★'.repeat(item.review.rating || 5)}
                      </div>
                      <span className="font-mono text-[7.5px] tracking-[0.2em] uppercase text-white/50">
                        VERIFIED CLIENT
                      </span>
                    </div>
                    
                    <p className="font-serif text-xs italic font-light text-white/95 leading-relaxed">
                      "{item.review.quote}"
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-white/10 font-mono text-[8px] tracking-[0.2em] text-white/70">
                      <span>{item.review.author}</span>
                      <span>{item.review.location}</span>
                    </div>
                  </div>
                )}

                {/* Mobile CTA */}
                <div className="pt-1">
                  <Link
                    href="/connect"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#1A1A1A] text-white font-mono text-[9px] tracking-[0.25em] uppercase font-semibold rounded-xs shadow-xs"
                  >
                    <span>Book Transformation Consultation</span>
                    <span>→</span>
                  </Link>
                </div>

              </div>

            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

