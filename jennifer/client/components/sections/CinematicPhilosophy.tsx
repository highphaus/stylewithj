'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CinematicPhilosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Parallax effects tied to the scroll position of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Image scales up slightly and moves down for a classic parallax window effect
  const imageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Text container fades in and glides up gently as it reaches the center of the viewport
  const { scrollYProgress: textScroll } = useScroll({
    target: textRef,
    offset: ['start 85%', 'start 40%'],
  });
  
  const textOpacity = useTransform(textScroll, [0, 1], [0, 1]);
  const textY = useTransform(textScroll, [0, 1], [60, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen py-24 sm:py-36 bg-[#111111] overflow-hidden flex items-center justify-center"
    >
      {/* Background Parallax Image Layer */}
      <motion.div 
        style={{ y: imageY }}
        className="absolute inset-0 w-full h-full opacity-100 origin-center"
      >
        <Image
          src="/images/philosophy_bg.png" 
          alt="Style with J Philosophy background"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Clean Dark Overlay Tint for Typography Legibility */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Foreground Content */}
      <motion.div 
        ref={textRef}
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 w-full max-w-4xl mx-auto px-8 sm:px-16 py-12 sm:py-20 flex flex-col items-center text-center text-white"
      >
        <span className="font-mono text-[9px] tracking-[0.6em] text-white/50 uppercase mb-8 md:mb-12">
          OUR PHILOSOPHY
        </span>
        
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.15] tracking-tight max-w-4xl">
          Style should never <br className="hidden sm:block" />
          <span className="italic font-normal text-white/80">feel like a costume.</span>
        </h2>

        <div className="my-10 md:my-16 w-8 h-[1px] bg-white/30" />

        <div className="space-y-6 max-w-2xl font-sans text-sm sm:text-base font-light text-white/85 leading-relaxed tracking-wide">
          <p>
            We don't believe in dressing you according to fleeting trends or forcing you into a version of yourself that doesn't feel natural.
          </p>
          <p>
            We believe style is personal. It should fit you—your personality, your lifestyle, your comfort, and the way you want to show up in the world.
          </p>
        </div>

        <div className="my-10 p-6 max-w-xl">
          <p className="font-serif text-xl sm:text-2xl font-light italic leading-relaxed text-white/95">
            “Our goal is simple: to help you find a style that feels like you, only better.”
          </p>
        </div>

        <p className="font-sans text-xs sm:text-sm font-medium tracking-widest text-white/70 uppercase">
          Because when you feel comfortable in what you wear, confidence follows naturally.
        </p>

        {/* ── STYLE JOURNEY CTA ── */}
        <div className="mt-16 pt-12 border-t border-white/10 w-full max-w-2xl flex flex-col items-center gap-6">
          <span className="font-sans text-[8px] tracking-[0.4em] text-white/50 uppercase font-semibold">
            READY TO FIND YOUR STYLE?
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-light tracking-wide text-white leading-tight">
            Let's create a wardrobe that feels as good as it looks.
          </h3>
          <Link
            href="/connect"
            className="group flex items-center gap-4 px-6 py-3 bg-white text-black text-[9px] tracking-[0.25em] uppercase font-light hover:bg-[#FAF9F6]/90 transition-all shadow-md flex-shrink-0"
          >
            Start Your Style Journey
            <span className="transform group-hover:translate-x-1 transition-transform text-xs">→</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
