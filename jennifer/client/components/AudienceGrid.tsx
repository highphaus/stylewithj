'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';
import { useSiteData } from '@/lib/use-site-data';

const defaultAudiences = [
  {
    num: "01",
    title: "The Executive & Corporate Leader",
    desc: "For leaders who want an executive presence that feels authentic, commanding, comfortable, and effortless.",
    image: "/images/includes/B4A2A5F7-FFA5-4B7A-9B0F-5EA8653D623E.JPG.jpeg",
    slug: "executive",
  },
  {
    num: "02",
    title: "The Modern Entrepreneur",
    desc: "For founders and creatives building an authentic personal brand that matches their vision and dynamic lifestyle.",
    image: "/images/includes/IMG_0271.JPG.jpeg",
    slug: "entrepreneur",
  },
  {
    num: "03",
    title: "The Bride & Festive Host",
    desc: "For brides, grooms, and hosts seeking exquisite, memorable occasion styling for weddings and celebrations.",
    image: "/images/CIT09345.jpg",
    slug: "bride-festive",
  },
  {
    num: "04",
    title: "The Closet Overhauler",
    desc: "For those with a closet full of clothes but nothing to wear, ready to declutter and build a versatile capsule.",
    image: "/images/includes/IMG_1406.JPG.jpeg",
    slug: "closet-overhauler",
  },
  {
    num: "05",
    title: "The Lifestyle & Travel Curator",
    desc: "For jetsetters and resort enthusiasts seeking curated vacation edits and effortless resort wardrobes.",
    image: "/images/includes/IMG_3112.JPG.jpeg",
    slug: "travel-curator",
  },
];

export default function AudienceGrid() {
  const { audiences } = useSiteData();
  const { openLightbox } = useLightbox();
  
  const audiencesList = (audiences && audiences.length > 0)
    ? audiences
    : defaultAudiences;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);

  // ── AUTOMATIC CYCLE ON DESKTOP ──
  useEffect(() => {
    if (isHovering) {
      setProgress(0);
      return;
    }

    const intervalTime = 50; 
    const totalDuration = 6000;
    const increment = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((curr) => (curr + 1) % audiencesList.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isHovering, activeIndex, audiencesList.length]);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    setIsHovering(true);
    setProgress(0);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section id="clientele" className="w-full bg-[#FAF9F6] border-b border-black/10 overflow-hidden">
      
      {/* ─────────────────────────────────────────────────────────────────
          1. DESKTOP LAYOUT (hidden lg:flex)
          ───────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex w-full min-h-screen relative overflow-hidden bg-[#FAF9F6]">
        
        {/* Left Column: Full-Bleed Pinned Image Box */}
        <div 
          onClick={() => openLightbox(audiencesList[activeIndex]?.image || '', audiencesList[activeIndex]?.title || '')}
          className="w-7/12 h-screen sticky top-0 border-r border-black/10 overflow-hidden bg-[#EFECE6] cursor-pointer group"
          title="Click to view image"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={audiencesList[activeIndex]?.image || ''} 
                alt={audiencesList[activeIndex]?.title || ''} 
                fill
                className="object-cover object-top opacity-100 group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md text-white/90 px-4 py-2 text-[9px] tracking-[0.3em] font-mono uppercase rounded-xs border border-white/10">
                ✦ 0{activeIndex + 1} // {audiencesList[activeIndex]?.title}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Index Stack & Active Item Writing */}
        <div 
          className="w-5/12 flex flex-col justify-between p-10 lg:p-14 xl:p-16 z-10 bg-[#FAF9F6]"
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#1A1A1A]">
              Who We Accompany
            </h2>
          </div>

          {/* Links stack with writing text under active item */}
          <div className="flex flex-col gap-2 my-auto w-full">
            {audiencesList.map((item, i) => {
              const isActive = activeIndex === i;

              return (
                <Link
                  key={i}
                  href={`/services?for=${item.slug}`}
                  onMouseEnter={() => handleMouseEnter(i)}
                  className="w-full text-left flex flex-col group py-4 relative outline-none border-b border-black/[0.08] last:border-b-0"
                >
                  <div className="flex items-center justify-between w-full">
                    <h3 className={`text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 truncate ${
                      isActive ? 'text-[#1A1A1A] translate-x-1 font-bold' : 'text-black/50 group-hover:text-black/85 font-light'
                    }`}>
                      {item.title}
                    </h3>

                    <div className={`w-[6px] h-[6px] rounded-full transition-all duration-300 border flex-shrink-0 ${
                      isActive ? 'bg-[#1A1A1A] scale-125 border-[#1A1A1A]' : 'bg-transparent border-black/20 group-hover:border-black/40'
                    }`} />
                  </div>

                  {/* ACTIVE ITEM WRITING TEXT (INSIDE RIGHT TEXT SECTION) */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="mt-2.5 flex flex-col gap-2"
                    >
                      <p className="font-sans text-xs sm:text-sm text-black/80 font-light italic leading-relaxed max-w-md">
                        “{item.desc}”
                      </p>

                      <div className="w-full h-[1px] bg-black/10 mt-1 overflow-hidden">
                        <motion.div
                          className="h-full bg-[#1A1A1A]"
                          style={{ width: `${isHovering ? 0 : progress}%` }}
                          transition={{ ease: 'linear' }}
                        />
                      </div>
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          2. MOBILE & SMALLER DEVICE LAYOUT (lg:hidden) — FULL BLEED IMAGE TOUCHING THE BOTTOM DIVIDING LINE
          ───────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:hidden w-full bg-[#FAF9F6]">
        
        {/* Section Header */}
        <div className="px-6 pt-8 pb-6 border-b border-black/10 bg-[#FAF9F6]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Who We Accompany
          </h2>
        </div>

        {/* Stacked Clientele Cards (Writing FIRST -> Image DIRECTLY TOUCHING the bottom dividing line edge-to-edge) */}
        <div className="flex flex-col divide-y divide-black/10 bg-[#FAF9F6]">
          {audiencesList.map((item, i) => (
            <div key={i} className="flex flex-col bg-[#FAF9F6]">
              
              {/* 1. All Writings & Details */}
              <div className="px-6 pt-8 pb-6 flex flex-col gap-3 bg-[#FAF9F6]">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/45 font-bold">
                  CLIENTELE PROFILE 0{i + 1}
                </span>

                <h3 className="font-sans text-xl sm:text-2xl tracking-[0.12em] uppercase font-bold text-[#1A1A1A]">
                  {item.title}
                </h3>

                <p className="font-serif text-base sm:text-lg italic font-light text-black/85 leading-relaxed pl-3 border-l-2 border-black/20">
                  “{item.desc}”
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href={`/services?for=${item.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white text-[9px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-all rounded-xs shadow-xs"
                  >
                    View Tailored Services →
                  </Link>

                  <Link
                    href="/connect"
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-black/20 text-[#1A1A1A] text-[9px] tracking-[0.2em] uppercase font-mono font-semibold hover:bg-black hover:text-white transition-all rounded-xs"
                  >
                    Book Session
                  </Link>
                </div>
              </div>

              {/* 2. Full-Bleed Cover Image DIRECTLY TOUCHING THE BOTTOM DIVIDING LINE WITH 0 GAP */}
              <div 
                onClick={() => openLightbox(item.image, item.title)}
                className="relative w-full h-[80vh] min-h-[460px] bg-[#0D0D0D] overflow-hidden cursor-pointer group flex-shrink-0"
                title={`Click to view ${item.title}`}
              >
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  sizes="100vw"
                  className="object-cover object-top scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 text-[8px] tracking-[0.25em] font-mono uppercase font-semibold border border-white/10">
                  ✦ 0{i + 1} // {item.title}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}