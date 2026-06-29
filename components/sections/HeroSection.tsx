'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-[#111] text-white overflow-hidden flex items-center">
      
      {/* 1. BACKGROUND CINEMATIC LAYER */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/hero/heroimage1.jpeg" // Make sure your image file exists here!
          alt="Campaign Masterpiece"
          fill
          priority
          className="object-cover object-center opacity-85 brightness-[0.85]"
        />
        {/* Subtle dark vignette overlay to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
      </div>

      {/* 2. LEFT SIDEBAR UTILITY (Vertical Typography Accent) */}
      <div className="hidden lg:flex absolute left-8 bottom-24 z-10 flex-col items-center gap-4 text-[9px] tracking-[0.3em] uppercase font-light text-white/50 [writing-mode:vertical-lr] rotate-180 select-none">
        <span>Bespoke Styling</span>
        <span className="w-1 h-1 bg-white/30 rounded-full my-1" />
        <span>Wardrobe Curation</span>
        <span className="w-1 h-1 bg-white/30 rounded-full my-1" />
        <span>Image Consulting</span>
      </div>

      {/* 3. MAIN HERO CONTENT */}
      <div className="w-full max-w-[1440px] mx-auto px-8 lg:px-24 flex justify-between items-center z-10 mt-12">
        
        {/* Left Side: Typography & CTA */}
        <div className="max-w-xl flex flex-col items-start">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/60 mb-3 block font-light"
          >
            Personal Stylist
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-light leading-[1.15] tracking-wide mb-6"
          >
            Style that <br />
            reflects who <br />
            <span className="italic font-normal">you are.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-12 h-[1px] bg-white/30 mb-6"
          />

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base font-light text-white/70 max-w-[280px] sm:max-w-xs leading-relaxed mb-10 tracking-wide"
          >
            Intentional wardrobes. <br />
            Timeless confidence.
          </motion.p>

          <motion.a
            href="/contact"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="group flex items-center gap-12 px-6 py-3 border border-white/30 hover:border-white text-[10px] tracking-[0.25em] uppercase font-light transition-all duration-300 backdrop-blur-[2px]"
          >
            Connect
            <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm">→</span>
          </motion.a>
        </div>

        {/* Right Side: Editorial Callout Line */}
        <div className="hidden md:flex flex-col items-start border-l border-white/20 pl-6 py-2 max-w-[150px]">
          <p className="text-[10px] tracking-[0.2em] uppercase font-light leading-relaxed text-white/80">
            Editorial approach. Personal touch.
          </p>
        </div>

      </div>

      {/* 4. BOTTOM BOTTOM CENTERED SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-[9px] tracking-[0.3em] uppercase font-light text-white/40">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>

    </section>
  );
}