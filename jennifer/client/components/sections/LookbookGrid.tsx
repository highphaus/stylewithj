'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLooks } from '@/lib/use-looks';
import { Look } from '@/lib/looks-data';

const filterCategories = [
  { label: 'ALL EDITS', tag: 'ALL' },
  { label: 'WESTERN', tag: 'WESTERN' },
  { label: 'EVENING', tag: 'EVENING' },
  { label: 'RESORT', tag: 'RESORT' },
  { label: 'BESPOKE', tag: 'BESPOKE' },
];

export default function LookbookGrid() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'spotlight'>('grid');
  const [activeSpotlightIdx, setActiveSpotlightIdx] = useState(0);
  const [expandedLookIdx, setExpandedLookIdx] = useState<number | null>(null);
  const { looks, isLoaded } = useLooks();
  const router = useRouter();

  const handleOpenLookStory = (look: Look) => {
    router.push(`/lookbook/${look.id}`);
  };

  const filteredLooks = activeFilter === 'ALL' 
    ? looks 
    : looks.filter(look => look.tag === activeFilter);

  const spotlightLook = filteredLooks[activeSpotlightIdx] || filteredLooks[0] || looks[0];

  return (
    <section className="w-full bg-[#FAF9F6] text-[#1A1A1A] py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-black/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        
        {/* ── HEADER & CONTROLS ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-8 border-b border-black/15">
          <div className="max-w-2xl">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-2 font-semibold">
              ✦ ARCHIVAL EDITS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#1A1A1A]">
              Curated Collections
            </h2>
            <p className="font-sans text-xs sm:text-sm font-light text-black/70 leading-relaxed mt-3 max-w-lg">
              An interactive visual exhibition cataloging continuous motion, personal proportion, and structural form across every occasion.
            </p>
          </div>

          {/* View Mode Toggle Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 p-1 bg-[#EFECE6] border border-black/10 rounded-xs self-start lg:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-mono transition-all rounded-xs cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-black text-white shadow-xs font-semibold' 
                  : 'text-black/60 hover:text-black font-medium'
              }`}
            >
              Grid Gallery
            </button>
            <button
              onClick={() => setViewMode('spotlight')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-mono transition-all rounded-xs cursor-pointer ${
                viewMode === 'spotlight' 
                  ? 'bg-black text-white shadow-xs font-semibold' 
                  : 'text-black/60 hover:text-black font-medium'
              }`}
            >
              Spotlight Reel
            </button>
          </div>
        </div>

        {/* ── DEVICE RESPONSIVE FILTER TABS ── */}
        <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar scrollbar-none pb-2 border-b border-black/10">
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat.tag;
            return (
              <button
                key={cat.tag}
                onClick={() => {
                  setActiveFilter(cat.tag);
                  setActiveSpotlightIdx(0);
                }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-mono border transition-all duration-300 rounded-xs flex-shrink-0 whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm font-semibold' 
                    : 'bg-[#EFECE6]/50 text-black/65 border-black/10 hover:border-black/30 hover:text-black'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── FEATURE DISPLAY MODE 1: EDITORIAL GALLERY GRID ── */}
        {viewMode === 'grid' && (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredLooks.map((look, idx) => {
                const isExpanded = expandedLookIdx === idx;

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
                    {/* Look Image Frame with Lightbox Action */}
                    <div 
                      onClick={() => handleOpenLookStory(look)}
                      className="relative aspect-[3/4] w-full overflow-hidden bg-black/5 cursor-pointer"
                      title={`Click to view ${look.title}`}
                    >
                      <Image
                        src={look.image}
                        alt={look.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                      />
                      
                      {/* Top Floating Badge */}
                      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 text-[8px] tracking-[0.3em] font-mono uppercase font-semibold border border-white/10 rounded-xs">
                        {look.category}
                      </div>

                      {/* Hover Overlay Button */}
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-black/90 text-white px-4 py-2 rounded-xs text-[9px] tracking-[0.25em] uppercase font-mono font-semibold border border-white/20 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          🔍 View Image & Story
                        </span>
                      </div>
                    </div>

                    {/* Look Metadata & Drawer Toggle */}
                    <div className="p-6 flex flex-col gap-4 bg-[#FAF9F6]">
                      <div className="flex items-center justify-end">
                        <span className="font-mono text-[9px] tracking-[0.2em] text-black/50 uppercase font-semibold">
                          {look.concept}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A] leading-snug">
                        {look.title}
                      </h3>

                      <p className="font-sans text-xs text-black/75 leading-relaxed font-light line-clamp-2">
                        {look.story}
                      </p>

                      {/* Expandable Details Button */}
                      <button
                        onClick={() => setExpandedLookIdx(isExpanded ? null : idx)}
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
          </motion.div>
        )}

        {/* ── FEATURE DISPLAY MODE 2: SPOTLIGHT REEL ── */}
        {viewMode === 'spotlight' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#EFECE6] p-6 sm:p-10 rounded-xs border border-black/10"
          >
            {/* Main Featured Display Frame */}
            <div 
              onClick={() => handleOpenLookStory(spotlightLook)}
              className="lg:col-span-6 relative aspect-[3/4] w-full overflow-hidden bg-black/10 rounded-xs border border-black/10 shadow-xl cursor-pointer group"
              title="Click to view Image & Story in Lightbox"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={spotlightLook.image}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={spotlightLook.image}
                    alt={spotlightLook.title}
                    fill
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="bg-black/90 text-white px-5 py-2.5 text-[9px] tracking-[0.25em] uppercase font-mono font-semibold border border-white/20 shadow-xl rounded-xs">
                      Tap to View
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Featured Look Info & Navigation Stack */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-black text-white font-mono text-[8px] tracking-[0.25em] uppercase font-semibold rounded-xs">
                    {spotlightLook.category}
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A] leading-tight">
                  {spotlightLook.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-black/80 font-light leading-relaxed border-l-2 border-black/20 pl-4 py-1">
                  {spotlightLook.story}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/10">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/40 font-bold">CONCEPT</span>
                    <span className="font-sans text-xs text-black/85 font-medium">{spotlightLook.concept}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/40 font-bold">FABRIC</span>
                    <span className="font-sans text-xs text-black/85 font-medium">{spotlightLook.fabric}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Selection Reel */}
              <div className="flex flex-col gap-3 pt-6 border-t border-black/10">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/50 font-bold">
                  SELECT LOOK ({filteredLooks.length})
                </span>
                
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {filteredLooks.map((look, i) => {
                    const isSelected = i === activeSpotlightIdx;
                    return (
                      <button
                        key={look.num + look.title}
                        onClick={() => setActiveSpotlightIdx(i)}
                        className={`relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-xs border-2 transition-all ${
                          isSelected 
                            ? 'border-black scale-105 shadow-md' 
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={look.image}
                          alt={look.title}
                          fill
                          className="object-cover object-top"
                          unoptimized
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}