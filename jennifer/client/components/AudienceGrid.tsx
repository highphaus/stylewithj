'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const audiences = [
  { 
    title: "Creators & Influencers", 
    keyword: "Distinction",
    desc: "Develop a distinctive image that supports your personal brand and audience growth.",
    image: "/images/img24.jpeg",
    slug: "creators"
  },
  { 
    title: "Founders & Entrepreneurs", 
    keyword: "Identity",
    desc: "Create a memorable personal brand that aligns with your vision and leadership.",
    image: "/images/img25.jpeg",
    slug: "founders"
  },
  { 
    title: "Executives & Leaders", 
    keyword: "Influence",
    desc: "Command respect, authority, and influence through a refined personal image.",
    image: "/images/img26.jpeg",
    slug: "executives"
  },
  { 
    title: "Working Professionals", 
    keyword: "Presence",
    desc: "Build confidence and executive presence in your everyday professional life.",
    image: "/images/img27.jpeg",
    slug: "professionals"
  },
  { 
    title: "Individuals Seeking Transformation", 
    keyword: "Genesis",
    desc: "Reinvent your style, confidence, and self-image with expert guidance.",
    image: "/images/img28.jpeg",
    slug: "individuals"
  },
  { 
    title: "Students & Job Seekers", 
    keyword: "Impression",
    desc: "Make stronger first impressions and stand out in competitive environments.",
    image: "/images/img29.jpeg",
    slug: "students"
  },
];

const AUTO_DELAY = 4000;

export default function AudienceGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [progress, setProgress] = useState(0);

  const goToNext = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % audiences.length);
    setProgress(0);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    const startTime = Date.now();

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / AUTO_DELAY) * 100, 100);
      setProgress(pct);
    }, 30);

    timerRef.current = setTimeout(() => {
      goToNext();
    }, AUTO_DELAY);
  }, [goToNext]);

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
    <section className="w-full min-h-screen bg-[#111111] text-white relative overflow-hidden select-none">
      
      {/* ─────────────────────────────────────────────────────────────────
          1. DESKTOP & LARGE SCREEN LAYOUT (lg:flex)
          ───────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:flex-row w-full min-h-screen relative">
        {/* Background Watermark Accent */}
        <div className="absolute right-12 bottom-12 text-[15vw] font-sans font-light italic text-white/[0.02] leading-none pointer-events-none z-0">
          {audiences[activeIndex].keyword}
        </div>

        {/* Left Column: Image Projection */}
        <div className="w-7/12 h-screen relative flex-shrink-0 border-r border-white/10 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={audiences[activeIndex].image} 
                alt={audiences[activeIndex].title} 
                fill
                className="object-cover object-center opacity-75 brightness-[0.8]"
                priority
                unoptimized
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating Quote Accent */}
          <div className="absolute inset-x-0 bottom-0 p-12 lg:p-16 bg-gradient-to-t from-[#111] via-[#111]/30 to-transparent flex flex-col items-start z-10">
            <h4 className="font-sans text-xl sm:text-2xl lg:text-3xl font-light italic tracking-wide text-white/90 max-w-lg leading-relaxed">
              “{audiences[activeIndex].desc}”
            </h4>
          </div>
        </div>

        {/* Right Column: Index Stack */}
        <div 
          className="w-5/12 flex flex-col justify-between p-12 lg:p-16 xl:p-20 z-10 bg-[#111111]"
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          <div>
            <h2 className="font-sans text-3xl lg:text-4xl font-light tracking-tight text-[#FAF9F6]">
              Who We Accompany
            </h2>
          </div>

          {/* Links stack */}
          <div className="flex flex-col gap-1.5 my-auto w-full">
            {audiences.map((item, i) => {
              const isActive = activeIndex === i;

              return (
                <Link
                  key={i}
                  href={`/services?for=${item.slug}`}
                  onMouseEnter={() => handleMouseEnter(i)}
                  className="w-full text-left flex items-center justify-between group py-3.5 relative outline-none border-b border-white/[0.03] last:border-b-0"
                >
                  <div className="flex items-center gap-4 sm:gap-6 w-full">
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <h3 className={`text-xs sm:text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 truncate w-full ${
                        isActive ? 'text-white translate-x-2 font-normal' : 'text-white/50 group-hover:text-white/85'
                      }`}>
                        {item.title}
                      </h3>

                      {isActive && (
                        <div className="w-full h-[1px] bg-white/10 mt-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-white/70"
                            style={{ width: `${isHovering ? 0 : progress}%` }}
                            transition={{ ease: 'linear' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`w-[6px] h-[6px] rounded-full transition-all duration-300 border flex-shrink-0 ${
                    isActive ? 'bg-white scale-125 border-white' : 'bg-transparent border-white/20 group-hover:border-white/40'
                  }`} />
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
        className="flex flex-col lg:hidden w-full bg-[#111111]"
        onMouseLeave={handleMouseLeave}
      >
        {/* Step A: Header block at the top */}
        <div className="p-6 sm:p-12 border-b border-white/10">
          <h2 className="font-sans text-2xl sm:text-3xl font-light tracking-tight text-[#FAF9F6]">
            Who We Accompany
          </h2>
        </div>

        {/* Step B: Image projection block IN THE MIDDLE */}
        <div className="w-full h-[40vh] sm:h-[45vh] relative border-b border-white/10 overflow-hidden">
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
                className="object-cover object-center opacity-75 brightness-[0.75]"
                priority
                unoptimized
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating Quote overlay inside the image */}
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#111] via-[#111]/45 to-transparent flex flex-col items-start z-10">
            <p className="font-sans text-xs sm:text-sm font-light italic leading-relaxed text-white/90 max-w-xl">
              “{audiences[activeIndex].desc}”
            </p>
          </div>
        </div>

        {/* Step C: Index stack links below the image */}
        <div className="p-6 sm:p-12 flex flex-col gap-1 w-full bg-[#111111]">
          {audiences.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <button
                key={i}
                onClick={() => handleMouseEnter(i)}
                className="w-full text-left flex items-center justify-between py-3.5 outline-none border-b border-white/[0.03] last:border-b-0"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <h3 className={`text-xs tracking-[0.15em] uppercase font-light transition-all duration-300 truncate w-full ${
                      isActive ? 'text-white font-normal translate-x-1' : 'text-white/50'
                    }`}>
                      {item.title}
                    </h3>

                    {isActive && (
                      <div className="w-full h-[1px] bg-white/10 mt-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-white/70"
                          style={{ width: `${isHovering ? 0 : progress}%` }}
                          transition={{ ease: 'linear' }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className={`w-[5px] h-[5px] rounded-full transition-all duration-300 border flex-shrink-0 ${
                  isActive ? 'bg-white border-white scale-110' : 'bg-transparent border-white/20'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
}