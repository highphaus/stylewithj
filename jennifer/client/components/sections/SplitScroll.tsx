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
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
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
      
      {/* ── MOBILE / SMALL DEVICE LAYOUT (SECTION HEADING + CLEAN PICTURES WITHOUT CAPTIONS ON TOP) ── */}
      <div className="block md:hidden w-full bg-[#FAF9F6] border-b border-black/10 overflow-hidden">
        {/* Section Heading */}
        <div className="px-6 pt-12 pb-6 border-b border-black/10 bg-[#FAF9F6]">
          <h2 className="font-serif text-2xl lg:text-3xl font-light tracking-tight text-[#1A1A1A]">
            Category Silhouettes
          </h2>
        </div>

        {/* 100% Zero-Space Stacked Clean Cover Images */}
        <div className="flex flex-col bg-[#FAF9F6] divide-y divide-black/10">
          {horizonCategoryItems.map((look, idx) => (
            <div 
              key={look.id}
              onClick={() => openLightbox(look.src, look.title, {
                num: `0${idx + 1}`,
                category: 'Category Silhouette',
                concept: look.title,
                story: look.caption
              })}
              className="relative w-full h-[100dvh] min-h-[500px] bg-[#0D0D0D] overflow-hidden cursor-pointer group flex-shrink-0"
              title="Click to view writing & details"
            >
              <Image
                src={look.src}
                alt={look.title}
                fill
                sizes="100vw"
                className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP / TABLET SPLIT STICKY SCROLL LAYOUT (md:flex) ── */}
      <div className="hidden md:flex flex-row w-full min-h-screen">
        
        {/* RIGHT CANVAS: Sticky text header on desktop */}
        <div className="w-1/2 h-screen sticky top-0 bg-[#FAF9F6] flex flex-col justify-between p-8 md:p-16 border-l border-black/10 relative z-20 order-2">
          <div>
            <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1A1A1A] mb-6">
              Category Silhouettes
            </h3>

            {/* DYNAMIC WRITING FOR THE ACTIVE VISIBLE IMAGE ONLY */}
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pt-6 border-t border-black/10 flex flex-col gap-3"
            >
              <h4 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-[#1A1A1A]">
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

            <button
              onClick={() => {
                document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-black/90 hover:bg-black text-white text-[9px] tracking-[0.2em] uppercase font-light rounded-full border border-white/10 shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Skip ↓
            </button>
          </div>
        </div>

        {/* LEFT CANVAS: 100% Screen Viewport Fitting Per Image */}
        <div className="w-1/2 flex flex-col snap-y snap-mandatory scroll-smooth order-1">
          {horizonCategoryItems.map((look) => (
            <div 
              key={look.id} 
              onClick={() => openLightbox(look.src, look.title)}
              className="w-full h-screen relative overflow-hidden bg-[#EAE8E3] group snap-start snap-always flex-shrink-0 cursor-pointer"
              title="Click to view image"
            >
              <Image
                src={look.src}
                alt={look.title}
                fill
                sizes="50vw"
                className="object-cover object-top sm:object-center transition-transform duration-1000 group-hover:scale-[1.02] ease-out"
                unoptimized
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}