'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';
import { useSiteData } from '@/lib/use-site-data';
import { TransformationItem, seedTransformations } from '@/lib/site-data';

interface TransformationsProps {
  hideButton?: boolean;
  isStatic?: boolean;
  hideHeading?: boolean;
  hasFilter?: boolean;
}

export default function Transformations({ hideButton = false, hideHeading = false, hasFilter = false }: TransformationsProps) {
  const { openLightbox } = useLightbox();
  const { transformations, responsive } = useSiteData();
  const data: TransformationItem[] = (transformations && transformations.length > 0) ? transformations : seedTransformations;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const safeIndex = activeIndex % (data.length || 1);
  const currentItem = data[safeIndex] || data[0] || seedTransformations[0];

  // ── AUTOMATIC CYCLE (ROTATES BASED ON RESPONSIVE SETTINGS, PAUSES ON HOVER) ──
  const cycleSpeedSeconds = responsive?.transformationsCycleSpeed !== undefined ? responsive.transformationsCycleSpeed : 9;

  useEffect(() => {
    if (isHovering || data.length <= 1 || cycleSpeedSeconds <= 0) return;

    const timer = setInterval(() => {
      setActiveIndex((curr) => (curr + 1) % data.length);
    }, cycleSpeedSeconds * 1000);

    return () => clearInterval(timer);
  }, [isHovering, data.length, cycleSpeedSeconds]);

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

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <section 
      id="transformations" 
      className="relative w-full bg-[#FAF9F6] border-b border-black/10 pt-4 pb-12 sm:pb-20 overflow-hidden"
    >
      {/* =========================================================================
          1. BIGGER DEVICES (DESKTOP & LARGE SCREENS: lg and up >= 1024px)
          Dual Canvas on LEFT Side, Storytelling & Text Review Card on RIGHT Side
          ========================================================================= */}
      <div 
        className="hidden lg:block max-w-[1440px] mx-auto px-8 xl:px-14 pt-8"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Top Header: Clean Title & Prev/Next Arrows */}
        <div className="flex items-center justify-between pb-6 border-b border-black/10">
          <div>
            {!hideHeading && (
              <h2 className="font-serif text-4xl xl:text-5xl font-light text-[#1A1A1A] tracking-tight">
                Transformations
              </h2>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/45 mr-2">
              0{safeIndex + 1} / 0{data.length}
            </span>
            <button
              onClick={handlePrev}
              title="Previous"
              aria-label="Previous transformation"
              className="w-8 h-8 rounded-full border border-black/15 bg-white/70 hover:bg-black hover:text-white transition-all flex items-center justify-center text-xs font-mono cursor-pointer"
            >
              &larr;
            </button>
            <button
              onClick={handleNext}
              title="Next"
              aria-label="Next transformation"
              className="w-8 h-8 rounded-full border border-black/15 bg-white/70 hover:bg-black hover:text-white transition-all flex items-center justify-center text-xs font-mono cursor-pointer"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* 12-Column Split: DUAL IMAGE CANVAS ON LEFT (7 Cols), STORYTELLING ON RIGHT (5 Cols) */}
        <div className="grid grid-cols-12 gap-10 xl:gap-14 pt-8 items-start">
          
          {/* LEFT SIDE (7 Cols): DUAL SIDE-BY-SIDE SHOWCASE CANVAS (SLIDER REMOVED) */}
          <div className="col-span-7 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={safeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid grid-cols-2 gap-3 w-full transition-all duration-300" style={{ height: responsive?.transformationsDesktopHeight || '640px' }}>
                  {/* Before Frame (Static Display Only on Desktop) */}
                  <div className="relative w-full h-full bg-[#0D0D0D] overflow-hidden rounded-xs border border-black/15 shadow-xs select-none">
                    <img
                      src={currentItem.beforeImg}
                      alt={`${currentItem.client} Before`}
                      className={`w-full h-full object-cover object-top grayscale-[15%] ${hasFilter ? 'subpage-image-filter' : ''}`}
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    {hasFilter && <div className="subpage-image-overlay" />}
                    <div className="absolute top-4 left-5 bg-[#FAF9F6]/95 border border-black/10 px-3.5 py-1 text-[8.5px] tracking-[0.25em] font-mono text-black uppercase font-bold shadow-xs">
                      BEFORE
                    </div>
                  </div>

                  {/* After Frame (Static Display Only on Desktop) */}
                  <div className="relative w-full h-full bg-[#0D0D0D] overflow-hidden rounded-xs border border-black/15 shadow-xs select-none">
                    <img
                      src={currentItem.afterImg}
                      alt={`${currentItem.client} After`}
                      className={`w-full h-full object-cover object-top ${hasFilter ? 'subpage-image-filter' : ''}`}
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    {hasFilter && <div className="subpage-image-overlay" />}
                    <div className="absolute top-4 right-5 bg-black text-white px-3.5 py-1 text-[8.5px] tracking-[0.25em] font-mono uppercase font-bold shadow-xs border border-white/10">
                      AFTER
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE (5 Cols): WRITINGS, STORYTELLING, REVIEW CARD & EXPLORE MORE BUTTON */}
          <div className="col-span-5 flex flex-col space-y-6 pl-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={safeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* Header: Dossier Tag & Client Title */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/50 font-medium">
                      DOSSIER 0{currentItem.id} // {currentItem.demographic}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl xl:text-3xl font-light text-[#1A1A1A] tracking-tight leading-snug">
                    {currentItem.client}
                  </h3>
                </div>

                {/* ── BEFORE & AFTER STORYTELLING SPACE ── */}
                <div className="space-y-3 pt-1">
                  <span className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/45 font-bold block">
                    TRANSFORMATION STORY
                  </span>

                  {/* Story Card: Before */}
                  <div className="bg-[#FAF8F3] border border-black/10 p-3.5 rounded-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[7.5px] uppercase tracking-[0.2em] px-2 py-0.5 bg-black/10 text-black font-semibold rounded-xs">
                        BEFORE &middot; THE CHALLENGE
                      </span>
                    </div>
                    <p className="font-serif text-xs xl:text-[13px] italic font-light text-black/75 leading-relaxed">
                      &ldquo;{currentItem.beforeStory}&rdquo;
                    </p>
                  </div>

                  {/* Story Card: After */}
                  <div className="bg-[#FAF8F3] border border-black/10 p-3.5 rounded-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[7.5px] uppercase tracking-[0.2em] px-2 py-0.5 bg-black text-white font-semibold rounded-xs">
                        AFTER &middot; THE ARCHITECTURE
                      </span>
                    </div>
                    <p className="font-serif text-xs xl:text-[13px] italic font-light text-black/85 leading-relaxed">
                      &ldquo;{currentItem.afterStory}&rdquo;
                    </p>
                  </div>
                </div>

                {/* ── CLIENT REVIEW CARD (TEXT-ONLY, NO PHOTO) ── */}
                <div className="bg-[#EFECE6] border border-black/12 p-4 rounded-xs shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-black/80 text-xs">
                      {Array.from({ length: currentItem.review?.rating || 5 }).map((_, idx) => (
                        <span key={idx}>&#9733;</span>
                      ))}
                    </div>
                    <span className="font-mono text-[7.5px] uppercase tracking-[0.22em] text-black/50 font-bold">
                      VERIFIED CLIENT REVIEW
                    </span>
                  </div>

                  <p className="font-serif text-xs xl:text-sm font-normal text-black/90 leading-relaxed italic">
                    &ldquo;{currentItem.review?.quote}&rdquo;
                  </p>

                  <div className="pt-1 border-t border-black/8 flex items-center justify-between font-mono text-[8.5px] text-black/60">
                    <span className="font-semibold text-black/80">{currentItem.review?.author}</span>
                    <span className="uppercase tracking-wider">{currentItem.review?.location}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail Cards Strip */}
            <div className="space-y-2 pt-2 border-t border-black/10">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-black/45 block">
                Select Case Study
              </span>
              <div className="grid grid-cols-3 gap-2">
                {data.map((item, index) => {
                  const isActive = safeIndex === index;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveIndex(index)}
                      className={[
                        'group text-left p-1 rounded-xs border transition-all duration-300 relative overflow-hidden flex flex-col gap-1 cursor-pointer',
                        isActive 
                          ? 'bg-[#1A1A1A] text-white border-black shadow-sm scale-[1.02]' 
                          : 'bg-[#EFECE6]/80 text-black/70 hover:text-black hover:bg-[#EFECE6] border-black/10'
                      ].join(' ')}
                    >
                      <div className="relative w-full h-14 rounded-xs overflow-hidden grid grid-cols-2 gap-0.5 bg-black/20">
                        <img 
                          src={item.beforeImg} 
                          alt=""
                          className="w-full h-full object-cover object-top grayscale-[30%] opacity-80"
                        />
                        <img 
                          src={item.afterImg} 
                          alt=""
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <span className={[
                        'font-mono text-[7.5px] uppercase tracking-[0.1em] font-semibold px-0.5 truncate',
                        isActive ? 'text-white' : 'text-black/80'
                      ].join(' ')}>
                        0{item.id} &middot; {item.client.split(' ')[1] || item.client.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTION BUTTONS: EXPLORE MORE & BOOK CONSULTATION */}
            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/transformations"
                className="group inline-flex items-center gap-3 tracking-[0.22em] text-[10px] uppercase font-mono font-medium text-white bg-[#1A1A1A] hover:bg-black transition-all py-3.5 px-7 shadow-sm hover:shadow-md rounded-xs cursor-pointer active:scale-98"
              >
                <span>Explore More</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform text-xs">&rarr;</span>
              </Link>

              <Link
                href="/connect"
                className="inline-flex items-center gap-1.5 tracking-[0.2em] text-[10px] uppercase font-mono text-black/60 hover:text-black transition-colors py-3.5 px-3"
              >
                <span>Book Session</span>
                <span className="text-xs">&#8599;</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          2. SMALLER & MOBILE DEVICES (< lg / under 1024px)
          Includes Storytelling, Text Review Card, and Explore More Button
          ========================================================================= */}
      <div 
        className="block lg:hidden w-full flex flex-col gap-5"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Top Header: Heading & Arrow Navigation (No 1, 2, 3 buttons) */}
        <div className="flex flex-col gap-2 pt-6 pb-2 px-4 sm:px-8">
          {!hideHeading && (
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A] tracking-tight">
                Transformations
              </h2>

              {/* Arrow navigation buttons only (no 1, 2, 3 numbers) */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/50">
                  0{safeIndex + 1} / 0{data.length}
                </span>
                <button
                  onClick={handlePrev}
                  title="Previous"
                  aria-label="Previous transformation"
                  className="w-8 h-8 rounded-full border border-black/20 bg-white hover:bg-black hover:text-white transition-all flex items-center justify-center text-xs font-mono shadow-xs active:scale-95 cursor-pointer"
                >
                  &larr;
                </button>
                <button
                  onClick={handleNext}
                  title="Next"
                  aria-label="Next transformation"
                  className="w-8 h-8 rounded-full border border-black/20 bg-white hover:bg-black hover:text-white transition-all flex items-center justify-center text-xs font-mono shadow-xs active:scale-95 cursor-pointer"
                >
                  &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Fully visible client dossier info and writings under heading (no truncation) */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-black/50 font-semibold">
                DOSSIER 0{currentItem.id} // {currentItem.demographic}
              </span>
              {hideHeading && (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/50">
                    0{safeIndex + 1} / 0{data.length}
                  </span>
                  <button
                    onClick={handlePrev}
                    title="Previous"
                    className="w-7 h-7 rounded-full border border-black/20 bg-white hover:bg-black hover:text-white flex items-center justify-center text-xs font-mono cursor-pointer"
                  >
                    &larr;
                  </button>
                  <button
                    onClick={handleNext}
                    title="Next"
                    className="w-7 h-7 rounded-full border border-black/20 bg-white hover:bg-black hover:text-white flex items-center justify-center text-xs font-mono cursor-pointer"
                  >
                    &rarr;
                  </button>
                </div>
              )}
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A] tracking-tight leading-snug">
              {currentItem.client}
            </h3>
            {currentItem.concept && (
              <p className="font-serif text-xs sm:text-sm italic text-black/60 font-light leading-relaxed">
                {currentItem.concept}
              </p>
            )}
          </div>
        </div>

        {/* Mobile Dual Canvas with gap on left, right, and center */}
        <AnimatePresence mode="wait">
          <motion.div
            key={safeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4 w-full"
          >
            {/* Gap in center (gap-2.5 sm:gap-4) and on left & right sides (px-4 sm:px-8) */}
            <div className="w-full px-4 sm:px-8">
              <div 
                className="grid grid-cols-2 gap-2.5 sm:gap-4 w-full min-h-[360px] sm:min-h-[480px] transition-all duration-300" 
                style={{ height: responsive?.transformationsMobileHeight || '55vh' }}
              >
                {/* Before Card */}
                <div 
                  onClick={() => handleOpenLightbox(currentItem.beforeImg, currentItem.client, 'BEFORE', currentItem)}
                  className="relative w-full h-full bg-[#0D0D0D] overflow-hidden rounded-xs border border-black/15 shadow-xs cursor-pointer select-none"
                >
                  <img
                    src={currentItem.beforeImg}
                    alt="Before"
                    className={`w-full h-full object-cover object-top grayscale-[15%] ${hasFilter ? 'subpage-image-filter' : ''}`}
                    draggable={false}
                  />
                  {hasFilter && <div className="subpage-image-overlay" />}
                  <div className="absolute top-3 left-3 bg-[#FAF9F6]/95 border border-black/10 px-2.5 py-0.5 text-[7.5px] sm:text-[8.5px] tracking-[0.2em] font-mono text-black uppercase font-bold shadow-xs">
                    BEFORE
                  </div>
                </div>

                {/* After Card */}
                <div 
                  onClick={() => handleOpenLightbox(currentItem.afterImg, currentItem.client, 'AFTER', currentItem)}
                  className="relative w-full h-full bg-[#0D0D0D] overflow-hidden rounded-xs border border-black/15 shadow-xs cursor-pointer select-none"
                >
                  <img
                    src={currentItem.afterImg}
                    alt="After"
                    className={`w-full h-full object-cover object-top ${hasFilter ? 'subpage-image-filter' : ''}`}
                    draggable={false}
                  />
                  {hasFilter && <div className="subpage-image-overlay" />}
                  <div className="absolute top-3 right-3 bg-black text-white px-2.5 py-0.5 text-[7.5px] sm:text-[8.5px] tracking-[0.2em] font-mono uppercase font-bold shadow-xs border border-white/10">
                    AFTER
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Storytelling, Review Card & Explore Action */}
            <div className="px-4 sm:px-8 space-y-3">
              {/* Transformation Story writings fully viewable */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="bg-[#FAF8F3] border border-black/10 p-3 rounded-xs space-y-1">
                  <span className="font-mono text-[7px] uppercase tracking-[0.2em] px-1.5 py-0.5 bg-black/10 text-black font-semibold rounded-xs">
                    BEFORE &middot; THE CHALLENGE
                  </span>
                  <p className="font-serif text-xs italic text-black/75 leading-relaxed">
                    &ldquo;{currentItem.beforeStory}&rdquo;
                  </p>
                </div>
                <div className="bg-[#FAF8F3] border border-black/10 p-3 rounded-xs space-y-1">
                  <span className="font-mono text-[7px] uppercase tracking-[0.2em] px-1.5 py-0.5 bg-black text-white font-semibold rounded-xs">
                    AFTER &middot; THE ARCHITECTURE
                  </span>
                  <p className="font-serif text-xs italic text-black/85 leading-relaxed">
                    &ldquo;{currentItem.afterStory}&rdquo;
                  </p>
                </div>
              </div>

              {/* Text Review Card */}
              <div className="bg-[#EFECE6] border border-black/10 p-3.5 rounded-xs space-y-1.5">
                <div className="flex items-center justify-between text-xs text-black/75">
                  <span className="text-[#D4AF37]">
                    {'★'.repeat(currentItem.review?.rating || 5)}
                  </span>
                  <span className="font-mono text-[7px] tracking-wider uppercase text-black/45">VERIFIED REVIEW</span>
                </div>
                <p className="font-serif text-xs italic text-black/85 leading-relaxed">
                  &ldquo;{currentItem.review?.quote}&rdquo;
                </p>
                <span className="font-mono text-[8px] text-black/60 block pt-1 border-t border-black/8">
                  &mdash; {currentItem.review?.author} ({currentItem.review?.location})
                </span>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <Link
                  href="/transformations"
                  className="tracking-[0.18em] text-[8.5px] uppercase font-mono font-semibold text-white bg-[#1A1A1A] hover:bg-black transition-all py-2.5 px-4 rounded-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore More</span>
                  <span>&rarr;</span>
                </Link>

                <Link
                  href="/connect"
                  className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-black/70 hover:text-black py-2.5 px-2"
                >
                  Book Session &#8599;
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {!hideButton && (
        <div className="w-full pt-12 pb-4 border-t border-black/10 flex flex-col items-center text-center px-6 mt-16 max-w-7xl mx-auto">
          <h4 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] mb-5">
            Ready for your personal style transformation?
          </h4>
          <Link
            href="/transformations"
            className="tracking-[0.25em] text-[9px] uppercase font-mono font-semibold text-[#1A1A1A] bg-[#EFECE6] hover:bg-[#EAE8E3] border border-black/10 py-3.5 px-7 rounded-xs"
          >
            Access Full Archive &rarr;
          </Link>
        </div>
      )}
    </section>
  );
}
