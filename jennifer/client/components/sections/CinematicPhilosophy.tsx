'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CinematicPhilosophy() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#FAF9F6] text-[#1A1A1A] py-16 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: 100% CLEAN IMAGE FRAME (ZERO TEXT OVER PICTURE) */}
        <div className="col-span-1 lg:col-span-5 relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#EFECE6] border border-black/10 shadow-xl rounded-xs">
          <motion.div style={{ scale: imageScale }} className="w-full h-full relative">
            <Image
              src="/images/philosophy_bg.png" 
              alt="Style with J Philosophy"
              fill
              className="object-cover object-center"
              priority
              unoptimized
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: ELEGANT PHILOSOPHY TYPOGRAPHY PANEL */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-start text-left space-y-6 sm:space-y-8">
          <div>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.5em] text-black/50 uppercase block mb-3 font-semibold">
              ✦ OUR PHILOSOPHY
            </span>
            
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-[1.12] tracking-tight">
              Style should never <br className="hidden sm:block" />
              <span className="italic font-normal text-black/75">feel like a costume.</span>
            </h2>
          </div>

          <div className="w-12 h-[1px] bg-black/20" />

          <div className="space-y-4 font-sans text-xs sm:text-sm font-light text-black/80 leading-relaxed tracking-wide max-w-xl">
            <p>
              We don't believe in dressing you according to fleeting trends or forcing you into a version of yourself that doesn't feel natural.
            </p>
            <p>
              We believe style is personal. It should fit you, your personality, your lifestyle, your comfort, and the way you want to show up in the world.
            </p>
          </div>

          {/* HIGHLIGHTED QUOTE BOX */}
          <div className="p-6 sm:p-8 bg-[#EFECE6] border-l-2 border-[#1A1A1A] rounded-xs max-w-xl w-full shadow-xs">
            <p className="font-serif text-lg sm:text-xl font-light italic leading-relaxed text-[#1A1A1A]">
              “Our goal is simple: to help you find a style that feels like you, only better.”
            </p>
          </div>

          <p className="font-sans text-xs sm:text-sm font-medium tracking-widest text-black/70 uppercase">
            Because when you feel comfortable in what you wear, confidence follows naturally.
          </p>

          {/* ── STYLE JOURNEY CTA ── */}
          <div className="pt-6 border-t border-black/10 w-full max-w-xl flex flex-col items-start gap-4">
            <span className="font-sans text-[8px] tracking-[0.4em] text-black/50 uppercase font-semibold">
              READY TO FIND YOUR STYLE?
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-light tracking-wide text-[#1A1A1A] leading-tight">
              Let's create a wardrobe that feels as good as it looks.
            </h3>
            <Link
              href="/connect"
              className="group inline-flex items-center gap-4 px-6 py-3 bg-[#1A1A1A] text-white text-[9px] tracking-[0.25em] uppercase font-light hover:bg-black transition-all shadow-md mt-2"
            >
              Start Your Style Journey
              <span className="transform group-hover:translate-x-1 transition-transform text-xs">→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
