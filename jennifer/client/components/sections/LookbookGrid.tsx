'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLooks } from '@/lib/use-looks';
import { Look, seedLooks } from '@/lib/looks-data';

interface AutoCarouselProps {
  images: string[];
  title: string;
  category: string;
  globalIdx: number;
  onOpenStory: () => void;
}

function CuratedLookCardCarousel({ images, title, category, globalIdx, onOpenStory }: AutoCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const list = images && images.length > 0 ? images : ['/images/includes/IMG_0271.JPG.jpeg'];

  useEffect(() => {
    if (isPaused || list.length <= 1) return;

    // Stagger slightly so cards don't all flip at the exact same millisecond
    const intervalTime = 3200 + (globalIdx % 3) * 400;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % list.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, list.length, globalIdx]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % list.length);
  };

  const handleSelectDot = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setCurrentIdx(idx);
  };

  return (
    <div
      onClick={onOpenStory}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative aspect-[3/4] w-full overflow-hidden bg-black/5 cursor-pointer select-none group"
      title={`Click to view ${title}`}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={list[currentIdx]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={list[currentIdx]}
            alt={`${title} - image ${currentIdx + 1}`}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading={globalIdx < 3 ? 'eager' : 'lazy'}
          />
        </motion.div>
      </AnimatePresence>

      {/* Top Floating Category Badge */}
      <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md text-white px-3 py-1 text-[8px] tracking-[0.3em] font-mono uppercase font-semibold border border-white/10 rounded-xs">
        {category}
      </div>

      {/* Top Right Counter Indicator (e.g. 01 / 03) */}
      <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-md text-white px-2 py-0.5 text-[8px] tracking-[0.15em] font-mono rounded-xs border border-white/10 font-medium">
        0{currentIdx + 1}/0{list.length}
      </div>

      {/* Left/Right Click Nav Arrows (visible on hover) */}
      {list.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-xs backdrop-blur-sm border border-white/20 hover:scale-110 shadow-md"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-xs backdrop-blur-sm border border-white/20 hover:scale-110 shadow-md"
          >
            ›
          </button>
        </>
      )}

      {/* Bottom Center 3-Dot / 3-Dash Pagination Indicator */}
      {list.length > 1 && (
        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/15">
          {list.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={(e) => handleSelectDot(e, dotIdx)}
              aria-label={`Go to image ${dotIdx + 1}`}
              className={`h-1 transition-all duration-300 rounded-full ${
                dotIdx === currentIdx
                  ? 'w-5 bg-white shadow-sm'
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Center Hover Action Cue */}
      <div className="absolute inset-0 z-10 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <span className="bg-black/90 text-white px-3.5 py-1.5 rounded-xs text-[8.5px] tracking-[0.25em] uppercase font-mono font-semibold border border-white/20 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          🔍 View Story & Details
        </span>
      </div>
    </div>
  );
}

interface RowHeadingInfo {
  num: string;
  kicker: string;
  title: string;
  subtitle: string;
}

const ROW_HEADINGS: RowHeadingInfo[] = [
  {
    num: '01',
    kicker: 'CONTEMPORARY & WORKWEAR',
    title: 'Modern Daywear & Tailored Posture',
    subtitle: 'Everyday elegance, bias-cut drapes, and effortless daily confidence.',
  },
  {
    num: '02',
    kicker: 'RESORT & TWILIGHT',
    title: 'Resort Escapes & Dramatic Eveningwear',
    subtitle: 'Fluid coastal gowns, destination capsules, and sculpted cocktail lines.',
  },
  {
    num: '03',
    kicker: 'BESPOKE & HERITAGE',
    title: 'Executive Architecture & Heritage Drapes',
    subtitle: 'Precision proportion balancing, heritage handlooms, and executive presence.',
  },
  {
    num: '04',
    kicker: 'GRAND OCCASIONS & BRIDAL',
    title: 'Celebration Grandeur & Haute Trousseau',
    subtitle: 'Intricate wedding ensembles, luxury party silhouettes, and milestone moments.',
  },
  {
    num: '05',
    kicker: 'COCKTAILS & STATEMENT EDITS',
    title: 'Architectural Glamour & Column Silhouettes',
    subtitle: 'Sharp eveningwear, gala showstoppers, and contemporary black-tie statements.',
  },
];

export default function LookbookGrid() {
  const [expandedLookIdx, setExpandedLookIdx] = useState<number | null>(null);
  const { looks, isLoaded } = useLooks();
  const router = useRouter();

  const handleOpenLookStory = (look: Look) => {
    router.push(`/lookbook/${look.id}`);
  };

  // Curated 5 rows (15 premier looks, removing Part 6 to 10)
  const displayedLooks = looks.slice(0, 15);

  // Group looks into rows of 3
  const rows: Look[][] = [];
  for (let i = 0; i < displayedLooks.length; i += 3) {
    rows.push(displayedLooks.slice(i, i + 3));
  }

  return (
    <section className="w-full bg-[#FAF9F6] text-[#1A1A1A] py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-black/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-8 border-b border-black/15">
          <div className="max-w-2xl">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-2 font-semibold">
              ✦ ATELIER ARCHIVE • SIGNATURE STYLE CATEGORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#1A1A1A]">
              Signature Silhouettes & Curated Categories
            </h2>
            <p className="font-sans text-xs sm:text-sm font-light text-black/70 leading-relaxed mt-3 max-w-xl">
              An editorial anthology of silhouette architecture, fluid draping, and bespoke styling categorized across everyday tailoring, destination escapes, and grand celebrations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/45 bg-[#EFECE6] px-3.5 py-2 rounded-xs border border-black/10 font-semibold">
              {displayedLooks.length} Signature Looks • 5 Categories
            </span>
          </div>
        </div>

        {/* ── EDITORIAL GALLERY GRID CHUNKED BY ROWS OF 3 ── */}
        <div className="space-y-16 sm:space-y-20">
            {rows.map((rowLooks, rowIdx) => {
              const rowInfo = ROW_HEADINGS[rowIdx] || ROW_HEADINGS[0];

              return (
                <section key={`row-${rowIdx}`} className="space-y-8 sm:space-y-10">
                  {/* Distinct Row Heading */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-5 sm:pb-6 border-b border-black/15">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="px-2.5 py-0.5 bg-[#1A1A1A] text-white font-mono text-[8px] tracking-[0.2em] uppercase font-bold rounded-xs">
                          ROW {rowInfo.num}
                        </span>
                        <span className="font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.35em] uppercase text-black/50 font-semibold">
                          ✦ {rowInfo.kicker}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#1A1A1A]">
                        {rowInfo.title}
                      </h3>
                    </div>
                    <p className="font-sans text-xs sm:text-sm font-light text-black/65 sm:text-right max-w-md leading-relaxed">
                      {rowInfo.subtitle}
                    </p>
                  </div>

                  {/* 3 Images Grid for This Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    <AnimatePresence mode="popLayout">
                      {rowLooks.map((look, chunkIdx) => {
                        const globalIdx = rowIdx * 3 + chunkIdx;
                        const isExpanded = expandedLookIdx === globalIdx;

                        return (
                          <motion.div
                            key={look.num + look.title}
                            layout
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="group bg-[#EFECE6] border border-black/10 rounded-xs overflow-hidden flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] transition-all duration-500"
                          >
                            {/* Auto-scrolling 3-image carousel card */}
                            <CuratedLookCardCarousel
                              images={look.images && look.images.length > 0 ? look.images : (seedLooks.find(s => s.id === look.id)?.images || [look.image])}
                              title={look.title}
                              category={look.category}
                              globalIdx={globalIdx}
                              onOpenStory={() => handleOpenLookStory(look)}
                            />

                            {/* Look Metadata & Drawer Toggle */}
                            <div className="p-6 flex flex-col gap-4 bg-[#FAF9F6]">
                              <div className="flex items-center justify-end">
                                <span className="font-mono text-[9px] tracking-[0.2em] text-black/50 uppercase font-semibold">
                                  {look.concept}
                                </span>
                              </div>

                              <h4 className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A] leading-snug">
                                {look.title}
                              </h4>

                              <p className="font-sans text-xs text-black/75 leading-relaxed font-light line-clamp-2">
                                {look.story}
                              </p>

                              {/* Expandable Details Button */}
                              <button
                                onClick={() => setExpandedLookIdx(isExpanded ? null : globalIdx)}
                                className="pt-3 border-t border-black/10 flex items-center justify-between text-[9px] tracking-[0.25em] font-mono uppercase text-black/70 hover:text-black font-semibold transition-colors"
                              >
                                <span>{isExpanded ? 'Hide Specs −' : 'View Fabric & Styling Specs +'}</span>
                                <span className="text-xs">{isExpanded ? '↑' : '↓'}</span>
                              </button>

                              {/* Expandable Specs Panel */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden pt-2 flex flex-col gap-2 border-t border-black/10 text-[10px] font-sans"
                                  >
                                    <div className="flex flex-col gap-1 bg-[#EFECE6] p-3 rounded-xs">
                                      <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/40 font-bold">FABRIC COMPOSITION</span>
                                      <span className="font-sans text-xs text-black/85 font-medium">{look.fabric}</span>
                                    </div>
                                    <button
                                      onClick={() => handleOpenLookStory(look)}
                                      className="mt-1 w-full text-center py-2 bg-black text-white text-[9px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black/85 transition-colors rounded-xs"
                                    >
                                      Open Image & Story Panel
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </section>
              );
            })}
          </div>

      </div>
    </section>
  );
}