'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="w-full bg-[#FAF9F6] text-[#1A1A1A] overflow-hidden">
      {/* 3-Column Responsive Grid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full min-h-[600px] lg:h-[80vh]">
        
        {/* ── PANEL 1: THE TEXT INTRO BLOCK ──────────────────────────────── */}
        <div className="flex flex-col justify-center px-8 sm:px-12 xl:px-20 py-16 lg:py-0 bg-[#EFECE6]">
          <div className="max-w-md flex flex-col items-start">
            
            {/* Minimal Header Accent */}
            <div className="flex items-center gap-4 mb-8 sm:mb-12">
              <span className="text-[10px] tracking-[0.35em] uppercase font-light text-[#1A1A1A]/60">
                Visual Storyteller
              </span>
              <div className="w-8 h-[1px] bg-[#1A1A1A]/30" />
            </div>

            {/* Editorial Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light leading-[1.2] tracking-wide mb-8">
              Hi, I’m J. <br />
              <span className="italic font-normal">I style stories.</span>
            </h2>

            {/* Paragraph Text */}
            <p className="text-sm font-light text-[#1A1A1A]/80 leading-relaxed tracking-wide mb-10 max-w-[340px]">
              With over 8 years of experience in fashion and image consulting, I help women 
              discover their signature style and build wardrobes that are chic, functional and 
              uniquely theirs.
            </p>

            {/* Minimal CTA Link Element */}
            <Link
              href="/about"
              className="group flex items-center gap-16 pb-2 border-b border-[#1A1A1A]/30 hover:border-[#1A1A1A] text-[10px] tracking-[0.25em] uppercase font-light transition-colors duration-300"
            >
              Read My Story
              <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm">→</span>
            </Link>
            
          </div>
        </div>

        {/* ── PANEL 2: CENTER SPLIT PORTRAIT ────────────────────────────── */}
        <div className="relative w-full h-[500px] md:h-full bg-[#222]">
          <Image
            src="/images/img01.jpeg" // Make sure your black and white portrait exists here!
            alt="J. Personal Stylist Portrait"
            fill
            className="object-cover object-center grayscale hover:scale-[1.02] transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* ── PANEL 3: MOOD-BOARD QUOTE LAYER ───────────────────────────── */}
        {/* Spans full grid on mobile, matches the single column width on large screens */}
        <div className="relative w-full h-[500px] md:h-full md:col-span-2 lg:col-span-1 bg-[#1A1A1A] flex items-center justify-center text-white p-8 sm:p-12 xl:p-16">
          
          {/* Background Moodboard Asset Container */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/img02.jpeg" // Make sure your moodboard flatlay layer asset exists here!
              alt="Editorial Aesthetic Flatlay"
              fill
              className="object-cover object-center opacity-40 brightness-[0.4]"
            />
          </div>

          {/* Foreground Stylized Quote Structure */}
          <div className="relative z-10 max-w-sm flex flex-col items-start gap-3">
            {/* Opening Quote Icon */}
            <span className="font-serif text-4xl text-white/40 leading-none h-4">“</span>
            
            <p className="text-xl sm:text-2xl font-serif font-light italic leading-relaxed text-white/90 tracking-wide pl-2">
              My goal is simple—<br />
              to make getting dressed the easiest decision of your day.
            </p>

            {/* Closing Quote Icon */}
            <span className="font-serif text-4xl text-white/40 leading-none h-4 self-end mr-4">”</span>
          </div>

        </div>

      </div>
    </section>
  );
}