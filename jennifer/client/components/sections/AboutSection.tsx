'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="w-full bg-[#FAF9F6] text-[#1A1A1A] overflow-hidden">
      {/* Always 3 columns across all screen sizes (horizontal layout) */}
      <div className="grid grid-cols-3 w-full min-h-[300px] sm:min-h-[400px] lg:h-[80vh]">

        {/* ── PANEL 1: CENTER SPLIT PORTRAIT (FIRST/LEFT) ── */}
        <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] bg-[#EFECE6]">
          <Image
            src="/images/img01.jpeg"
            alt="J. Personal Stylist Portrait"
            fill
            className="object-cover object-center hover:scale-[1.02] transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 33vw"
          />
        </div>

        {/* ── PANEL 2: MOOD-BOARD QUOTE LAYER (SECOND/CENTER - PICTURE) ── */}
        <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] bg-[#1A1A1A] flex items-center justify-center text-white p-3 sm:p-8 xl:p-16">
          {/* Background Moodboard */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/img02.jpeg"
              alt="Editorial Aesthetic Flatlay"
              fill
              className="object-cover object-center opacity-45"
            />
          </div>

          {/* Foreground Quote */}
          <div className="relative z-10 flex flex-col items-start gap-1 sm:gap-3 max-w-sm">
            <span className="font-serif text-xl sm:text-4xl text-white/40 leading-none h-2 sm:h-4">"</span>

            <p className="text-[8px] xs:text-[9px] sm:text-base lg:text-xl xl:text-2xl font-serif font-light italic leading-snug text-white/90 tracking-wide pl-1 sm:pl-2">
              My goal is simple:<br />
              to make getting dressed the easiest decision of your day.
            </p>

            <span className="font-serif text-xl sm:text-4xl text-white/40 leading-none h-2 sm:h-4 self-end mr-1 sm:mr-4">"</span>
          </div>
        </div>

        {/* ── PANEL 3: THE TEXT INTRO BLOCK (THIRD/RIGHT - WRITING) ── */}
        <div className="flex flex-col justify-center px-3 sm:px-8 xl:px-20 py-6 sm:py-12 lg:py-0 bg-[#EFECE6]">
          <div className="flex flex-col items-start">

            {/* Minimal Header Accent */}
            <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-8 lg:mb-12">
              <span className="text-[6px] sm:text-[9px] lg:text-[10px] tracking-[0.2em] sm:tracking-[0.35em] uppercase font-light text-[#1A1A1A]/60">
                About Me
              </span>
              <div className="w-4 sm:w-8 h-[1px] bg-[#1A1A1A]/30" />
            </div>

            {/* Editorial Heading */}
            <h2 className="text-sm sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light leading-[1.2] tracking-wide mb-3 sm:mb-6 lg:mb-8">
              Hi, I'm J. <br />
              <span className="italic font-normal">I style stories.</span>
            </h2>

            {/* Paragraph Text */}
            <p className="hidden xs:block text-[9px] sm:text-xs lg:text-sm font-light text-[#1A1A1A]/80 leading-relaxed tracking-wide mb-4 sm:mb-8 lg:mb-10 max-w-[340px]">
              With over 8 years of experience in fashion and image consulting, I help women
              discover their signature style and build wardrobes that are chic, functional and
              uniquely theirs.
            </p>

            {/* CTA Link */}
            <Link
              href="/about"
              className="group flex items-center gap-3 sm:gap-8 lg:gap-16 pb-1 sm:pb-2 border-b border-[#1A1A1A]/30 hover:border-[#1A1A1A] text-[6px] sm:text-[9px] lg:text-[10px] tracking-[0.15em] sm:tracking-[0.25em] uppercase font-light transition-colors duration-300"
            >
              Read My Story
              <span className="transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300 text-xs sm:text-sm">→</span>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}
