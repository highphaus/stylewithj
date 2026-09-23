'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLooks } from '@/lib/use-looks';
import { useLightbox } from '@/components/ImageLightbox';
import { Look } from '@/lib/looks-data';

export default function GalleryGrid() {
  const [filter, setFilter] = useState<'all' | 'western' | 'evening' | 'resort' | 'bridal' | 'bespoke'>('all');
  const { looks, isLoaded } = useLooks();
  const { openLightbox } = useLightbox();
  const router = useRouter();

  // Mobile Auto-Scroll Carousel State (reliable continuous timer)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredItems = filter === 'all'
    ? looks
    : looks.filter(item => 
        item.tag.toLowerCase() === filter.toLowerCase() || 
        (filter === 'bridal' && (item.tag.toLowerCase() === 'bridal' || item.category.toLowerCase().includes('wedding')))
      );

  const total = filteredItems.length;
  const currentLook: Look | undefined = filteredItems[currentIndex] || filteredItems[0];

  // Continuous auto-scroll effect for Lookbook mobile carousel (every 4s)
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (total > 0 ? (prev + 1) % total : 0));
      }, 4000);
    }
  };

  useEffect(() => {
    if (total <= 1) return;

    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  const handleNext = () => {
    if (total === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
    resetTimer();
  };

  const handlePrev = () => {
    if (total === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    resetTimer();
  };

  const handleFilterChange = (cat: typeof filter) => {
    setFilter(cat);
    setCurrentIndex(0);
    setDirection(1);
    resetTimer();
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <div className="w-full bg-[#FAF9F6] text-[#1A1A1A] pb-20 sm:pb-32">
      
      {/* ── HEADER BUCKET ── */}
      <header className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/10 pb-8 sm:pb-10 pt-12 sm:pt-20 lg:pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-none text-[#1A1A1A]">
              Lookbook
            </h1>
          </div>
          <div className="max-w-xs text-left md:text-right">
            <p className="font-serif text-xs sm:text-sm italic text-black/60 leading-relaxed font-light">
              A visual archive cataloging Western wear, resort silhouettes, bridal trousseaus, and curated editorial looks styled by Jennifer.
            </p>
          </div>
        </div>

        {/* ── DEVICE RESPONSIVE FILTER TABS ── */}
        <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2.5 mt-6 pb-3 overflow-x-auto no-scrollbar scrollbar-none border-b border-black/10">
          {(['all', 'western', 'evening', 'resort', 'bridal', 'bespoke'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-mono transition-all duration-300 border rounded-xs flex-shrink-0 whitespace-nowrap cursor-pointer ${
                filter === cat 
                  ? 'bg-black text-white border-black font-semibold shadow-xs' 
                  : 'bg-white text-black/60 border-black/10 hover:border-black hover:text-black font-medium'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="max-w-7xl mx-auto">
        {!isLoaded ? (
          <div className="py-24 text-center font-mono text-[9px] tracking-[0.3em] uppercase text-black/40">
            Loading Lookbook Archive…
          </div>
        ) : total === 0 ? (
          <div className="py-24 text-center font-mono text-[10px] tracking-[0.25em] uppercase text-black/50">
            No looks found in this category.
          </div>
        ) : (
          <>
            {/* ═══════════════════════════════════════════════════════════════════
                1. SMALLER DEVICES (< lg): RELIABLE AUTO-SCROLL CAROUSEL
                   (No overlay; smooth auto movement + Read More button + Arrows)
               ═══════════════════════════════════════════════════════════════════ */}
            <div className="lg:hidden relative w-full bg-[#FAF9F6] py-8 sm:py-12 select-none">
              <div className="px-5 sm:px-8">
                
                {/* Lookbook Mobile Header Bar with Counter & Arrow Controls */}
                <div className="flex items-center justify-between pb-5 border-b border-black/10 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-black/40 flex-shrink-0" />
                    <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-black/60 font-semibold">
                      {currentLook?.category || 'Editorial Collection'}
                    </p>
                  </div>

                  {/* Counter + Prev / Next Arrows */}
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <div className="flex items-center font-mono text-[11px] text-black/50">
                      <span className="text-[#1A1A1A] font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
                      <span className="mx-1">/</span>
                      <span>{String(total).padStart(2, '0')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="w-8 h-8 rounded-full border border-black/20 bg-white/90 hover:bg-black hover:text-white text-[#1A1A1A] flex items-center justify-center text-xs transition-all cursor-pointer shadow-xs active:scale-95"
                        aria-label="Previous Look"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-8 h-8 rounded-full border border-black/20 bg-white/90 hover:bg-black hover:text-white text-[#1A1A1A] flex items-center justify-center text-xs transition-all cursor-pointer shadow-xs active:scale-95"
                        aria-label="Next Look"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Animated Carousel Card */}
                {currentLook && (
                  <div className="pt-6">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentLook.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.15}
                        onDragEnd={(_, { offset }) => {
                          if (offset.x < -40) handleNext();
                          else if (offset.x > 40) handlePrev();
                        }}
                        className="flex flex-col gap-4 cursor-grab active:cursor-grabbing"
                      >
                        {/* Fashion Editorial Image Card (NO OVERLAY - 100% natural, crisp image) */}
                        <div
                          onClick={() => openLightbox(currentLook.image, currentLook.title, {
                            id: currentLook.id,
                            num: currentLook.num,
                            category: currentLook.category,
                            concept: currentLook.concept,
                            fabric: currentLook.fabric,
                            story: currentLook.story,
                            occasion: currentLook.occasion,
                            tag: currentLook.tag,
                          })}
                          className="relative w-full aspect-[4/5] sm:aspect-[4/3] bg-[#0D0D0D] overflow-hidden rounded-xs border border-black/10 cursor-pointer shadow-xs"
                          title="Click to view image in Lightbox"
                        >
                          <Image
                            src={currentLook.image}
                            alt={currentLook.title}
                            fill
                            priority
                            className="object-cover object-top"
                          />

                          {/* Floating Top Badge */}
                          <div className="absolute top-3.5 left-3.5 z-20 bg-black/80 backdrop-blur-md text-white px-2.5 py-1 text-[8px] font-mono tracking-[0.25em] uppercase rounded-xs border border-white/10">
                            LOOK {currentLook.num}
                          </div>
                        </div>

                        {/* Look Details & Prominent Read More Button */}
                        <div className="flex flex-col items-start text-left gap-2 w-full pt-1">
                          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/50 font-bold">
                            ✦ {currentLook.concept || currentLook.category}
                          </span>

                          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] leading-tight">
                            {currentLook.title}
                          </h3>

                          <p className="font-sans text-xs sm:text-sm text-black/75 font-light leading-relaxed line-clamp-3">
                            {currentLook.story}
                          </p>

                          <div className="pt-3 flex flex-wrap items-center gap-4">
                            {/* Read More Button */}
                            <Link
                              href={`/lookbook/${currentLook.id}`}
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-white font-mono text-[9px] tracking-[0.22em] uppercase font-semibold rounded-xs shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
                            >
                              <span>Read More</span>
                              <span className="text-xs">→</span>
                            </Link>

                            {/* View High-Res / Lightbox Action */}
                            <button
                              type="button"
                              onClick={() => openLightbox(currentLook.image, currentLook.title, {
                                id: currentLook.id,
                                num: currentLook.num,
                                category: currentLook.category,
                                concept: currentLook.concept,
                                fabric: currentLook.fabric,
                                story: currentLook.story,
                                occasion: currentLook.occasion,
                                tag: currentLook.tag,
                              })}
                              className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-[#1A1A1A] hover:text-black uppercase font-semibold border-b border-black pb-0.5 transition-all cursor-pointer"
                            >
                              <span>View Photo</span>
                              <span>↗</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                2. DESKTOP / LARGE SCREENS (lg+): PURE HIGH-FASHION EDITORIAL GRID
                   (Original clean grid - all new carousel/actions are for smaller devices only)
               ═══════════════════════════════════════════════════════════════════ */}
            <div className="hidden lg:block px-8 lg:px-20 py-16">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      onClick={() => openLightbox(item.image, item.title, {
                        id: item.id,
                        num: item.num,
                        category: item.category,
                        concept: item.concept,
                        fabric: item.fabric,
                        story: item.story,
                        occasion: item.occasion,
                        tag: item.tag,
                      })}
                      className="relative group overflow-hidden bg-[#0D0D0D] border border-black/10 rounded-xs aspect-[3/4] min-h-[460px] shadow-xs cursor-pointer flex-shrink-0"
                      title={`Click to view ${item.title}`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-out"
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        loading={index < 3 ? "eager" : "lazy"}
                      />

                      {/* Floating Top Look Badge */}
                      <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md text-white px-3 py-1 text-[8px] font-mono tracking-[0.3em] uppercase rounded-xs border border-white/10">
                        LOOK {item.num}
                      </div>

                      {/* Clean Hover Card at Bottom */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/85 backdrop-blur-md p-3.5 rounded-xs border border-white/15 text-white flex items-center justify-between">
                          <div>
                            <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-white/60 block">
                              ✦ {item.category}
                            </span>
                            <h3 className="font-serif text-base font-light text-white leading-tight mt-0.5">
                              {item.title}
                            </h3>
                          </div>
                          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/80 border-b border-white/40 pb-0.5 ml-3 flex-shrink-0">
                            View ↗
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
