'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSiteData } from '@/lib/use-site-data';

export default function HeroSection() {
  const { hero } = useSiteData();

  return (
    <section className="relative w-full min-h-[120vh] sm:min-h-[130vh] lg:min-h-[140vh] bg-[#111] text-white overflow-hidden flex items-center py-24 sm:py-32">
      
      {/* 1. BACKGROUND FULL COVER CINEMATIC LAYER WITH RESPONSIVE DEVICE IMAGES */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#0c0c0c]">
        {/* Desktop Hero Image */}
        <Image
          src={hero.desktopImage || "/images/hero/hero image desktop.png"}
          alt="Style with J — Hero Desktop"
          fill
          priority
          style={{ objectPosition: 'center 0%' }}
          className="object-cover opacity-100 hidden md:block transition-all duration-700"
          unoptimized
        />
        {/* Mobile / Small Device Hero Image */}
        <Image
          src={hero.mobileImage || "/images/hero/hero image.jpeg"}
          alt="Style with J — Hero Mobile"
          fill
          priority
          style={{ objectPosition: 'center 0%' }}
          className="object-cover opacity-100 block md:hidden transition-all duration-700"
          unoptimized
        />
        {/* Minimal subtle text contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* 2. MAIN HERO CONTENT */}
      <div className="w-full max-w-[1440px] mx-auto px-8 lg:px-24 flex justify-between items-center z-10 mt-12">
        
        {/* Left Side: Typography & CTA */}
        <div className="max-w-xl flex flex-col items-start text-left">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/60 mb-3 block font-light"
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-5xl md:text-6xl font-serif font-light leading-[1.15] tracking-wide mb-6"
          >
            {hero.titleLine1} <br />
            {hero.titleLine2} <br />
            <span className="italic font-normal">{hero.titleItalic}</span>
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
            className="text-xs sm:text-base font-light text-white/70 max-w-[280px] sm:max-w-xs leading-relaxed mb-10 tracking-wide"
          >
            {hero.subtitleLine1} <br />
            {hero.subtitleLine2}
          </motion.p>

          <motion.a
            href={hero.ctaUrl || "/connect"}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="group flex items-center gap-12 px-6 py-3 border border-white/30 hover:border-white text-[10px] tracking-[0.25em] uppercase font-light transition-all duration-300 backdrop-blur-[2px]"
          >
            {hero.ctaText || "Connect"}
            <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm">→</span>
          </motion.a>
        </div>

        {/* Right Side: Editorial Callout Line */}
        <div className="hidden md:flex flex-col items-start border-l border-white/20 pl-6 py-2 max-w-[150px]">
          <p className="text-[10px] tracking-[0.2em] uppercase font-light leading-relaxed text-white/80">
            {hero.sideText}
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