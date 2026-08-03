'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';

const audiences = [
  { 
    title: "Creators & Influencers", 
    keyword: "Distinction",
    desc: "Develop a distinctive image that supports your personal brand and audience growth.",
    image: "/images/includes/IMG_8846.JPG.jpeg",
    slug: "creators"
  },
  { 
    title: "Founders & Entrepreneurs", 
    keyword: "Identity",
    desc: "Create a memorable personal brand that aligns with your vision and leadership.",
    image: "/images/includes/IMG_0283.JPG.jpeg",
    slug: "founders"
  },
  { 
    title: "Executives & Leaders", 
    keyword: "Influence",
    desc: "Command respect, authority, and influence through a refined personal image.",
    image: "/images/includes/IMG_8881.JPG.jpeg",
    slug: "executives"
  },
  { 
    title: "Working Professionals", 
    keyword: "Presence",
    desc: "Build confidence and executive presence in your everyday professional life.",
    image: "/images/includes/IMG_9140.JPG.jpeg",
    slug: "professionals"
  },
  { 
    title: "Individuals Seeking Transformation", 
    keyword: "Genesis",
    desc: "Reinvent your style, confidence, and self-image with expert guidance.",
    image: "/images/includes/IMG_0332.JPG.jpeg",
    slug: "individuals"
  },
  { 
    title: "Students & Job Seekers", 
    keyword: "Impression",
    desc: "Make stronger first impressions and stand out in competitive environments.",
    image: "/images/includes/IMG_5321.JPG.jpeg",
    slug: "students"
  },
];

const AUTO_DELAY = 4000;

export default function AudienceGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const { openLightbox } = useLightbox();

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    const intervalTime = 50;
    const totalTime = 6000;
    const step = (intervalTime / totalTime) * 100;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressRef.current!);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % audiences.length);
    }, totalTime);
  }, []);

  useEffect(() => {
    if (!isHovering) {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [activeIndex, isHovering, startTimer]);

  const handleMouseEnter = (i: number) => {
    setIsHovering(true);
    setActiveIndex(i);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    startTimer();
  };

  return (
    <section id="who-we-help" className="w-full bg-[#FAF9F6] text-[#1A1A1A] relative overflow-hidden select-none">
      
      {/* ─────────────────────────────────────────────────────────────────
          1. DESKTOP & LARGE SCREEN LAYOUT (lg:flex)
          ───────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:flex-row w-full h-screen relative">
        {/* Background Watermark Accent */}
        <div className="absolute right-12 bottom-12 text-[15vw] font-sans font-light italic text-black/[0.03] leading-none pointer-events-none z-0">
          {audiences[activeIndex].keyword}
        </div>

        {/* Left Column: 100% Clean Image Projection (Click to open Lightbox) */}
        <div 
          onClick={() => openLightbox(audiences[activeIndex].image, audiences[activeIndex].title)}
          className="w-7/12 h-screen relative flex-shrink-0 border-r border-black/10 z-10 bg-[#EFECE6] overflow-hidden cursor-pointer group"
          title="Click to view image"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={audiences[activeIndex].image} 
                alt={audiences[activeIndex].title} 
                fill
                className="object-cover object-top opacity-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                priority
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Index Stack & Active Item Writing */}
        <div 
          className="w-5/12 flex flex-col justify-between p-12 lg:p-16 xl:p-20 z-10 bg-[#FAF9F6]"
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          <div>
            <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-black/50 block mb-2 font-semibold">
              OUR CLIENTELE
            </span>
            <h2 className="font-sans text-3xl lg:text-4xl font-light tracking-tight text-[#1A1A1A]">
              Who We Accompany
            </h2>
          </div>

          {/* Links stack with writing text under active item */}
          <div className="flex flex-col gap-2 my-auto w-full">
            {audiences.map((item, i) => {
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
          2. MOBILE & TABLET LAYOUT (lg:hidden)
          ───────────────────────────────────────────────────────────────── */}
      <div 
        className="flex flex-col lg:hidden w-full bg-[#FAF9F6]"
        onMouseLeave={handleMouseLeave}
      >
        {/* Step A: Header block at the top */}
        <div className="p-6 sm:p-12 border-b border-black/10">
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-black/50 block mb-1 font-semibold">
            OUR CLIENTELE
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-light tracking-tight text-[#1A1A1A]">
            Who We Accompany
          </h2>
        </div>

        {/* Step B: 100% Clean Image projection block IN THE MIDDLE (Click to open Lightbox) */}
        <div 
          onClick={() => openLightbox(audiences[activeIndex].image, audiences[activeIndex].title)}
          className="w-full h-[40vh] sm:h-[45vh] relative border-b border-black/10 overflow-hidden bg-[#EFECE6] cursor-pointer"
          title="Click to view image"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={audiences[activeIndex].image} 
                alt={audiences[activeIndex].title} 
                fill
                className="object-cover object-top opacity-100"
                priority
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step C: Index stack links with writing text below the image */}
        <div className="p-6 sm:p-12 flex flex-col gap-1 w-full bg-[#FAF9F6]">
          {audiences.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <button
                key={i}
                onClick={() => handleMouseEnter(i)}
                className="w-full text-left flex flex-col py-3.5 outline-none border-b border-black/[0.06] last:border-b-0"
              >
                <div className="flex items-center justify-between w-full">
                  <h3 className={`text-xs tracking-[0.15em] uppercase transition-all duration-300 truncate ${
                    isActive ? 'text-[#1A1A1A] font-bold translate-x-1' : 'text-black/50'
                  }`}>
                    {item.title}
                  </h3>

                  <div className={`w-[5px] h-[5px] rounded-full transition-all duration-300 border flex-shrink-0 ${
                    isActive ? 'bg-[#1A1A1A] border-[#1A1A1A] scale-110' : 'bg-transparent border-black/20'
                  }`} />
                </div>

                {/* WRITING TEXT IN TEXT SECTION */}
                {isActive && (
                  <div className="mt-2 flex flex-col gap-1.5">
                    <p className="font-sans text-xs text-black/80 font-light italic leading-relaxed">
                      “{item.desc}”
                    </p>

                    <div className="w-full h-[1px] bg-black/10 mt-1 overflow-hidden">
                      <motion.div
                        className="h-full bg-[#1A1A1A]"
                        style={{ width: `${isHovering ? 0 : progress}%` }}
                        transition={{ ease: 'linear' }}
                      />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
}