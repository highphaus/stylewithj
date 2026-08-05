'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLooks } from '@/lib/use-looks';
import { useLightbox } from '@/components/ImageLightbox';

export default function GalleryGrid() {
  const [filter, setFilter] = useState<'all' | 'western' | 'evening' | 'resort' | 'bespoke'>('all');
  const { looks, isLoaded } = useLooks();
  const { openLightbox } = useLightbox();
  const router = useRouter();

  const filteredItems = filter === 'all'
    ? looks
    : looks.filter(item => item.tag.toLowerCase() === filter.toLowerCase());

  return (
    <div className="w-full bg-[#FAF9F6] text-[#1A1A1A] pb-20 sm:pb-32">
      
      {/* ── HEADER BUCKET ── */}
      <header className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/10 pb-10 pt-16 sm:pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight leading-none text-[#1A1A1A]">
              Lookbook
            </h1>
          </div>
          <div className="max-w-xs text-left md:text-right">
            <p className="font-serif text-xs italic text-black/60 leading-relaxed font-light">
              A visual archive cataloging Western wear, resort silhouettes, and curated editorial looks styled by Jennifer.
            </p>
          </div>
        </div>

        {/* ── SINGLE LINE RESPONSIVE FILTER TABS ── */}
        <div className="flex flex-nowrap items-center gap-2 mt-6 pb-3 overflow-x-auto no-scrollbar scrollbar-none border-b border-black/10">
          {(['all', 'western', 'evening', 'resort', 'bespoke'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-[9px] tracking-[0.25em] uppercase font-mono transition-all duration-300 border rounded-xs flex-shrink-0 whitespace-nowrap cursor-pointer ${
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

      {/* ── RESPONSIVE GRID CONTAINER (FULL-BLEED COVER ON MOBILE) ── */}
      <main className="px-0 sm:px-8 lg:px-20 max-w-7xl mx-auto py-0 sm:py-16">
        {!isLoaded ? (
          <div className="py-24 text-center font-mono text-[9px] tracking-[0.3em] uppercase text-black/40">
            Loading Lookbook Archive…
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 lg:gap-8 divide-y divide-black/10 sm:divide-y-0">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => openLightbox(item.image, item.title, {
                    num: item.num,
                    category: item.category,
                    concept: item.concept,
                    fabric: item.fabric,
                    story: item.story,
                    occasion: item.occasion,
                    tag: item.tag,
                  })}
                  className="relative group overflow-hidden bg-[#0D0D0D] border-b border-black/10 sm:border sm:rounded-xs h-[100dvh] sm:h-auto sm:aspect-[3/4] min-h-[500px] shadow-xs cursor-pointer flex-shrink-0"
                  title={`Click to view ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-[2500ms] ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
