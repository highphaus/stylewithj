'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLooks } from '@/lib/use-looks';

export default function GalleryGrid() {
  const [filter, setFilter] = useState<'all' | 'western' | 'evening' | 'resort' | 'bespoke'>('all');
  const { looks, isLoaded } = useLooks();
  const router = useRouter();

  const filteredItems = filter === 'all'
    ? looks
    : looks.filter(item => item.tag.toLowerCase() === filter.toLowerCase());

  return (
    <div className="w-full bg-[#FAF9F6] text-[#1A1A1A] pb-20 sm:pb-32">
      
      {/* ── HEADER BUCKET ── */}
      <header className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/5 pb-10 pt-16 sm:pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight leading-none text-[#1A1A1A]">
              Lookbook
            </h1>
          </div>
          <div className="max-w-xs text-left md:text-right flex flex-col items-start md:items-end gap-2">
            <p className="font-serif text-xs italic text-black/60 leading-relaxed font-light">
              A visual archive cataloging Western wear, resort silhouettes, and curated editorial looks styled by Jennifer.
            </p>
            <Link 
              href="/admin" 
              className="text-[9px] font-mono tracking-[0.25em] uppercase text-black/40 hover:text-black transition-colors"
            >
              ⚙ Admin Portal
            </Link>
          </div>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-8 text-[9px] tracking-[0.25em] uppercase font-light">
          {(['all', 'western', 'evening', 'resort', 'bespoke'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 border rounded-xs ${
                filter === cat 
                  ? 'bg-black text-white border-black font-medium shadow-sm' 
                  : 'bg-transparent text-black/60 border-black/10 hover:border-black hover:text-black font-light'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* ── RESPONSIVE GRID CONTAINER ── */}
      <main className="sm:px-8 lg:px-20 max-w-7xl mx-auto py-0 sm:py-16">
        {!isLoaded ? (
          <div className="py-24 text-center font-mono text-[9px] tracking-[0.3em] uppercase text-black/40">
            Loading Lookbook Archive…
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => router.push(`/lookbook/${item.id}`)}
                  className="relative group overflow-hidden bg-[#EAE8E3] border-b border-black/[0.06] sm:border sm:rounded-sm h-[100dvh] sm:h-auto sm:aspect-[3/4] shadow-xs cursor-pointer"
                  title={`Click to view ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top sm:object-center transition-transform duration-[2500ms] ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />

                  {/* EDITORIAL GLIDE-UP HOVER OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6 select-none text-white">
                    <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/60 mb-1">
                      LOOK /{item.num} • {item.category}
                    </span>
                    <h3 className="font-serif text-base sm:text-xl tracking-wide uppercase mb-1 font-light">
                      {item.title}
                    </h3>
                    <p className="text-[9px] sm:text-[11px] text-white/80 leading-relaxed font-light max-w-xs line-clamp-2">
                      {item.story}
                    </p>
                    <span className="mt-3 text-[9px] font-mono tracking-[0.25em] uppercase text-white/90 underline underline-offset-4">
                      Explore Full Page & Story →
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
