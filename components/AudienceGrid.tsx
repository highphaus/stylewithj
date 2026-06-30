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

const AUTO_DELAY = 4000; // 4 seconds per slide

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

  // Start timer when index changes (unless hovering)
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
    <section className="w-full min-h-screen bg-[#111111] text-white flex flex-col-reverse lg:flex-row relative overflow-hidden select-none">
      
      {/* ── BACKGROUND WATERMARK ACCENT ── */}
      <div className="absolute right-12 bottom-12 text-[15vw] font-sans font-light italic text-white/[0.02] leading-none pointer-events-none hidden lg:block">
        {audiences[activeIndex].keyword}
      </div>

      {/* ── LEFT CANVAS: THE EDITORIAL PROJECTION WINDOW (Bottom on mobile, Left on desktop) ── */}
      <div className="w-full lg:w-7/12 h-[55vh] sm:h-[60vh] lg:h-screen relative flex-shrink-0 border-t lg:border-t-0 border-white/10">
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

        {/* Dynamic Floating Quote Accent */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12 lg:p-16 bg-gradient-to-t from-[#111] via-[#111]/30 to-transparent flex flex-col items-start z-10">
          <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase mb-2 font-mono">
            [ COLLECTION MATRIX FRAME 0{activeIndex + 1} ]
          </span>
          <h4 className="font-sans text-xl sm:text-2xl lg:text-3xl font-light italic tracking-wide text-white/90 max-w-lg leading-relaxed">
            “{audiences[activeIndex].desc}”
          </h4>
        </div>
      </div>

      {/* ── RIGHT CANVAS: THE HIGH-FASHION INDEX SYSTEM (Top on mobile, Right on desktop) ── */}
      <div 
        className="w-full lg:w-5/12 flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-20 z-10 bg-[#111111] lg:border-l border-white/10"
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Top Header Label */}
        <div className="mb-10 lg:mb-0">
          <span className="text-[9px] tracking-[0.4em] uppercase font-light text-white/40 block mb-2">
            METIER / CLIENTELE
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white/90">
            Who We Accompany
          </h2>
        </div>

        {/* Dynamic Index Stack Navigation */}
        <div className="flex flex-col gap-1.5 my-8 lg:my-auto w-full">
          {audiences.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <Link
                key={i}
                href={`/services?for=${item.slug}`}
                onMouseEnter={() => handleMouseEnter(i)}
                className="w-full text-left flex items-center justify-between group py-3 relative outline-none border-b border-white/[0.03] last:border-b-0"
              >
                <div className="flex items-center gap-4 sm:gap-6 w-full">
                  <span className={`font-mono text-[10px] tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                  }`}>
                    0{i + 1}
                  </span>

                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <h3 className={`text-xs sm:text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 truncate w-full ${
                      isActive ? 'text-white translate-x-1 sm:translate-x-2 font-normal' : 'text-white/50 group-hover:text-white/85'
                    }`}>
                      {item.title}
                    </h3>

                    {/* Autoplay progress line */}
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

                {/* Minimal Bullet indicator */}
                <div className={`w-[6px] h-[6px] rounded-full transition-all duration-300 border flex-shrink-0 ${
                  isActive ? 'bg-white scale-125 border-white' : 'bg-transparent border-white/20 group-hover:border-white/40'
                }`} />
              </Link>
            );
          })}
        </div>

        {/* Bottom instructions */}
        <div className="flex justify-between items-center text-[9px] tracking-[0.2em] uppercase text-white/30 font-mono pt-4 border-t border-white/5">
          <span>STYLE ARCHIVE v1.2</span>
          <span className="hidden sm:inline">[ TAP TO EXPLORE ]</span>
        </div>

      </div>

    </section>
  );
}