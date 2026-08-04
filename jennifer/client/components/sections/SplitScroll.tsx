// src/components/sections/SplitScroll.tsx
'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';

interface CategoryLookItem {
  id: string;
  src: string;
  title: string;
  caption: string;
}

const horizonCategoryItems: CategoryLookItem[] = [
  { 
    id: '1', 
    src: '/images/includes/B4A2A5F7-FFA5-4B7A-9B0F-5EA8653D623E.JPG.jpeg', 
    title: 'EVERYDAY STYLE', 
    caption: 'Effortless outfits for workwear, corporate & daily confidence.' 
  },
  { 
    id: '2', 
    src: '/images/CIT09345.jpg', 
    title: 'CELEBRATIONS & BRIDAL', 
    caption: 'Statement occasion silhouettes & traditional heritage drapes.' 
  },
  { 
    id: '3', 
    src: '/images/includes/IMG_3112.JPG.jpeg', 
    title: 'LIFE & TRAVEL', 
    caption: 'Resort wardrobes, vacation edits & romantic date night looks.' 
  },
  { 
    id: '4', 
    src: '/images/includes/IMG_9051.JPG.jpeg', 
    title: 'YOUR PERSONAL FIT', 
    caption: 'Bespoke consultations tailored around your unique silhouette.' 
  },
  { 
    id: '5', 
    src: '/images/includes/IMG_8771.JPG.jpeg', 
    title: 'LUXURY EVENING & GALAS', 
    caption: 'High-octane evening gowns, red carpet elegance & gala attire.' 
  },
  { 
    id: '6', 
    src: '/images/includes/IMG_0270.JPG.jpeg', 
    title: 'CAPSULE & REFRESH', 
    caption: 'Intentional seasonal capsule builds & complete closet curation.' 
  }
];

export default function SplitScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { openLightbox } = useLightbox();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      horizonCategoryItems.length - 1,
      Math.max(0, Math.floor(latest * horizonCategoryItems.length))
    );
    setActiveIndex(idx);
  });

  const activeItem = horizonCategoryItems[activeIndex] || horizonCategoryItems[0];

  return (
    <section ref={sectionRef} id="horizon" className="w-full bg-[#FAF9F6] overflow-clip border-t border-black/15">
      
      {/* ── MOBILE / SMALL DEVICE LAYOUT (PHOTO FIRST -> WRITING & BUTTONS DIRECTLY UNDER THE PHOTO) ── */}
      <div className="block md:hidden w-full bg-[#FAF9F6]">
        
        {/* Top Section Header */}
        <div className="px-6 pt-12 pb-8 border-b border-black/10 bg-[#FAF9F6]">
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-black/50 block mb-2 font-semibold">
            STYLING CATEGORIES
          </span>
          <h3 className="font-serif text-3xl font-light tracking-tight text-[#1A1A1A] mb-3">
            Curated Category Silhouettes.
          </h3>
          <p className="font-sans text-xs tracking-wider text-neutral-600 font-light leading-relaxed">
            A study in continuous motion, personal proportion, and structural form across every occasion.
          </p>
        </div>

        {/* Categories Stack: Photo FIRST -> Writing & Buttons DIRECTLY UNDER Photo */}
        <div className="flex flex-col bg-[#FAF9F6] divide-y divide-black/10">
          {horizonCategoryItems.map((look, idx) => (
            <div key={look.id} className="flex flex-col bg-[#FAF9F6]">
              
              {/* 1. PHOTO FIRST */}
              <div 
                onClick={() => openLightbox(look.src, look.title)}
                className="relative w-full h-[85vh] min-h-[480px] bg-[#0D0D0D] overflow-hidden cursor-pointer group flex-shrink-0"
                title={`Click to view ${look.title}`}
              >
                <Image
                  src={look.src}
                  alt={look.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-top scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 text-[8px] tracking-[0.25em] font-mono uppercase font-semibold border border-white/10">
                  ✦ 0{idx + 1} // {look.title}
                </div>
              </div>

              {/* 2. WRITING DIRECTLY UNDER THE PHOTO */}
              <div className="px-6 pt-6 pb-8 flex flex-col gap-2 bg-[#FAF9F6]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-black/40 font-bold">/0{idx + 1}</span>
                  <h4 className="font-sans text-base tracking-[0.18em] uppercase font-bold text-[#1A1A1A]">
                    {look.title}
                  </h4>
                </div>

                <p className="font-sans text-xs text-black/75 font-light leading-relaxed mb-3">
                  {look.caption}
                </p>

                <div className="flex items-center gap-4">
                  <Link
                    href="/categories"
                    className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-0.5 transition-all font-semibold"
                  >
                    Explore All Categories →
                  </Link>

                  <Link
                    href="/connect"
                    className="px-3.5 py-1.5 bg-[#1A1A1A] text-white text-[8px] tracking-[0.2em] font-mono uppercase font-semibold rounded-xs shadow-xs"
                  >
                    Book Session
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ── DESKTOP STICKY PINNED LOOKBOOK LAYOUT ── */}
      <div className="hidden md:block relative w-full h-[600vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-24 pb-8 px-8 sm:px-12 lg:px-16 overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex items-end justify-between border-b border-black/15 pb-6">
            <div>
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-black/50 block mb-1 font-semibold">
                STYLING CATEGORIES
              </span>
              <h3 className="font-serif text-3xl lg:text-5xl font-light tracking-tight text-[#1A1A1A]">
                Curated Category Silhouettes.
              </h3>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs tracking-widest text-black/60 font-semibold">
              <span>0{activeIndex + 1}</span>
              <span className="text-black/20">/</span>
              <span>0{horizonCategoryItems.length}</span>
            </div>
          </div>

          {/* Center Stage Spread */}
          <div className="grid grid-cols-12 gap-8 items-center flex-1 my-6 min-h-0">
            
            {/* Left Column: Full-Bleed Image Frame */}
            <div className="col-span-7 h-full flex items-center justify-center min-h-0">
              <div 
                onClick={() => openLightbox(activeItem.src, activeItem.title)}
                className="relative w-full h-full max-h-[70vh] aspect-[3/4] bg-[#0D0D0D] border border-black/15 overflow-hidden shadow-lg group cursor-pointer rounded-xs"
                title="Click to view image"
              >
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  sizes="50vw"
                  className="object-cover object-top scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white/90 px-3 py-1.5 text-[8px] tracking-[0.3em] font-mono uppercase rounded-xs border border-white/10">
                  ✦ 0{activeIndex + 1} // {activeItem.title}
                </div>
              </div>
            </div>

            {/* Right Column: High-Fashion Narrative Info */}
            <div className="col-span-5 flex flex-col justify-center gap-6 pl-4 border-l border-black/10">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/50 font-semibold">
                LOOK NO. 0{activeIndex + 1}
              </span>

              <h4 className="font-sans text-2xl lg:text-3xl tracking-[0.15em] uppercase font-bold text-[#1A1A1A] leading-snug">
                {activeItem.title}
              </h4>

              <p className="font-serif text-lg lg:text-xl italic font-light text-black/80 leading-relaxed">
                "{activeItem.caption}"
              </p>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#1A1A1A] text-white text-[9px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-all rounded-xs shadow-md"
                >
                  Explore Category →
                </Link>

                <Link
                  href="/connect"
                  className="px-6 py-3 border border-black/20 text-[#1A1A1A] text-[9px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black hover:text-white transition-all rounded-xs"
                >
                  Book Session
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom Progress Bar */}
          <div className="flex items-center gap-2 w-full pt-4 border-t border-black/10">
            {horizonCategoryItems.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 flex-1 transition-all duration-300 rounded-full ${
                  idx === activeIndex ? 'bg-[#1A1A1A]' : 'bg-black/15'
                }`}
              />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}