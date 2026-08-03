'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '@/lib/use-site-data';
import { useLightbox } from '@/components/ImageLightbox';

export default function AboutSection() {
  const { about } = useSiteData();
  const { openLightbox } = useLightbox();

  const imageSrc = about.creativeDirectorImage || "/images/img22.jpeg";

  return (
    <section id="about-legacy" className="flex flex-col lg:flex-row w-full min-h-screen bg-[#FAF9F6] text-[#1A1A1A] border-b border-black/5 overflow-hidden m-0 p-0">
      
      {/* 1. TOP IMAGE ON MOBILE (FULL BLEED 100% SCREEN COVER WITH ZERO GAPS / DEAD SPACE) */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        onClick={() => openLightbox(imageSrc, "Style with J by Jennifer")}
        className="w-full lg:w-1/2 h-[100dvh] relative overflow-hidden bg-[#0D0D0D] cursor-pointer group order-1 lg:order-2 flex-shrink-0"
        title="Click to view full image"
      >
        <motion.img 
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={imageSrc} 
          alt="Style with J by Jennifer" 
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md text-white px-3.5 py-2 rounded-xs text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-mono font-semibold border border-white/10">
          ✦ JENNIFER // CREATIVE DIRECTOR
        </div>
      </motion.div>

      {/* 2. TEXT CONTENT BELOW IMAGE ON MOBILE */}
      <div className="w-full lg:w-1/2 px-6 py-16 sm:px-12 sm:py-20 lg:py-32 lg:px-24 flex flex-col justify-center bg-[#EFECE6] order-2 lg:order-1">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-black/55 mb-6 sm:mb-12 block font-semibold"
        >
          {about.eyebrow || "About Jennifer"}
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-6xl md:text-7xl font-light mb-8 sm:mb-12 tracking-tight leading-[1.1] text-black"
        >
          {about.titleLine1 || "The Difference"} <br />
          <span className="italic font-normal text-black/60">{about.titleLine2 || "You've Been Looking For"}</span>
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-xs sm:text-base text-black/75 leading-relaxed max-w-lg space-y-6 font-light"
        >
          <p>
            {about.storyParagraph1 || "Your image is often the first thing people notice and remember. I believe personal styling is about far more than fashion. It's about helping people align how they present themselves with who they truly are."}
          </p>
          <p>
            {about.storyParagraph2 || "Through a personalized approach to styling, grooming, wardrobe strategy, and image consulting, I help individuals unlock greater confidence, credibility, and presence in every area of their lives."}
          </p>
        </motion.div>
      </div>

    </section>
  );
}
