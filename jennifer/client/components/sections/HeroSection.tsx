'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSiteData } from '@/lib/use-site-data';

export default function HeroSection() {
  const { hero } = useSiteData();

  return (
    <section className="relative w-full h-[100dvh] min-h-[580px] sm:min-h-[620px] md:min-h-[680px] bg-[#111] text-white overflow-hidden flex flex-col justify-center items-start pt-20 md:pt-24 pb-8 md:pb-12 z-10">
      
      {/* 1. BACKGROUND FULL COVER CINEMATIC LAYER WITH RESPONSIVE DEVICE IMAGES */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#0c0c0c]">
        {/* Desktop Hero Image */}
        <Image
          src={hero.desktopImage || "/images/hero/hero image desktop.png"}
          alt="Style with J — Hero Desktop"
          fill
          priority
          sizes="(min-width: 768px) 100vw, 1px"
          style={{ objectPosition: hero.desktopImagePosition || 'center 50%' }}
          className="object-cover opacity-100 hidden md:block transition-all duration-700"
        />
        {/* Mobile / Small Device Hero Image */}
        <Image
          src={hero.mobileImage || "/images/hero/hero image.jpeg"}
          alt="Style with J — Hero Mobile"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 1px"
          style={{ objectPosition: hero.mobileImagePosition || 'center 15%' }}
          className="object-cover opacity-100 block md:hidden transition-all duration-700"
        />
        {/* Mobile gradient: Balanced middle-and-bottom fade ensuring text readability while keeping the model's portrait clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25 block md:hidden pointer-events-none" />
        {/* Desktop subtle text contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10 hidden md:block pointer-events-none" />
      </div>

      {/* 2. MAIN HERO CONTENT */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-24 flex justify-between items-center z-10 my-auto">
        
        {/* Left Side: Typography & CTA */}
        <div className="max-w-md lg:max-w-lg flex flex-col items-start text-left w-full sm:w-auto">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[9.5px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-white/70 mb-2 sm:mb-2.5 block font-mono font-medium"
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-[40px] lg:text-[44px] font-serif font-light leading-[1.18] sm:leading-[1.16] tracking-wide mb-2.5 sm:mb-4"
          >
            {hero.titleLine1} <br />
            {hero.titleLine2} <br />
            <span className="italic font-normal">{hero.titleItalic}</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-10 sm:w-12 h-[1px] bg-white/30 mb-2.5 sm:mb-4"
          />

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs sm:text-[14px] md:text-[15px] font-light text-white/80 max-w-[280px] sm:max-w-xs leading-relaxed mb-5 sm:mb-7 tracking-wide"
          >
            {hero.subtitleLine1} <br />
            {hero.subtitleLine2}
          </motion.p>

          <motion.a
            href={hero.ctaUrl || "/connect"}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="group inline-flex items-center justify-between gap-8 sm:gap-10 px-5 sm:px-6 py-2.5 sm:py-3 border border-white/40 hover:border-white bg-black/40 hover:bg-black/60 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-mono font-medium transition-all duration-300 backdrop-blur-md shadow-lg rounded-xs"
          >
            <span>{hero.ctaText || "Connect"}</span>
            <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm">→</span>
          </motion.a>
        </div>

        {/* Right Side: Editorial Callout Line with slow smooth entrance animation */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden md:flex flex-col items-start border-l border-white/20 pl-6 py-2 max-w-[150px]"
        >
          <p className="text-[10px] tracking-[0.2em] uppercase font-light leading-relaxed text-white/80">
            {hero.sideText}
          </p>
        </motion.div>

      </div>

    </section>
  );
}