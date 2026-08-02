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
    <section ref={sectionRef} className="w-full bg-[#FAF9F6] overflow-clip">
      <div className="flex flex-col-reverse md:flex-row w-full min-h-screen">
        
        {/* LEFT CANVAS: 100% Screen Viewport Fitting Per Image (Click to Pick / Open Lightbox) */}
        <div className="w-full md:w-1/2 flex flex-col snap-y snap-mandatory scroll-smooth">
          {horizonCategoryItems.map((look) => (
            <div 
              key={look.id} 
              onClick={() => openLightbox(look.src, look.title)}
              className="w-full h-[100dvh] h-screen relative overflow-hidden bg-[#EAE8E3] group snap-start snap-always flex-shrink-0 cursor-pointer"
              title="Click to view image"
            >
              <Image
                src={look.src}
                alt={look.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02] ease-out"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* RIGHT CANVAS: Stationary / Sticky (Shows ONLY active image writing in white space) */}
        <div className="w-full md:w-1/2 h-[100dvh] md:h-screen md:sticky md:top-0 bg-[#FAF9F6] flex flex-col justify-between p-6 sm:p-10 md:p-16 border-b md:border-b-0 md:border-l border-black/5 relative overflow-y-auto">
          <div>
            <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-black/50 block mb-2 font-semibold">
              STYLING CATEGORIES
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-[#1A1A1A] mb-3">
              Curated Category <br /> Silhouettes.
            </h3>
            <p className="font-sans text-xs tracking-widest text-neutral-500 uppercase font-light max-w-xs leading-relaxed mb-6 sm:mb-8">
              A study in continuous motion, personal proportion, and structural form across every occasion.
            </p>

            {/* DYNAMIC WRITING FOR THE ACTIVE VISIBLE IMAGE ONLY (05 // CATEGORY REMOVED) */}
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="pt-6 border-t border-black/10 flex flex-col gap-2 sm:gap-3"
            >
              <h4 className="font-sans text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase font-bold text-[#1A1A1A]">
                {activeItem.title}
              </h4>

              <p className="font-sans text-xs sm:text-sm text-black/75 font-light leading-relaxed max-w-md">
                {activeItem.caption}
              </p>
            </motion.div>
          </div>

          <div className="pt-6 flex items-center justify-between">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-[#1A1A1A] hover:text-black uppercase border-b border-black pb-0.5 transition-all font-medium"
            >
              Explore All Categories →
            </Link>

            {/* Unified Floating Skip Button (Hidden on smaller devices) */}
            <div className="hidden lg:block">
              <button
                onClick={() => {
                  document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-black/90 hover:bg-black text-white text-[9px] tracking-[0.2em] uppercase font-light rounded-full border border-white/10 shadow-lg transition-all duration-300 hover:scale-105"
              >
                Skip ↓
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}