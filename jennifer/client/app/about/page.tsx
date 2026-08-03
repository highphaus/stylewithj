'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';
import { useSiteData } from '@/lib/use-site-data';

export function AboutContent() {
  const { about } = useSiteData();

  return (
    <>
      {/* ── EDITORIAL HEADER ── */}
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-4">
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-semibold text-black/60 font-sans">
              {about.eyebrow}
            </span>
          </div>

          <h1 className="font-serif text-[22px] min-[360px]:text-[25px] sm:text-6xl md:text-7xl font-light tracking-tight leading-snug sm:leading-[1.1] text-[#1A1A1A] max-w-4xl mt-2">
            <span className="block font-light">{about.titleLine1}</span>
            <span className="block italic font-normal text-black/60 mt-1 sm:mt-2">{about.titleLine2}</span>
          </h1>

        </div>
      </section>

      {/* ── MAIN STORY SECTION ── */}
      <section className="pb-20 sm:pb-28 pt-4 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Portrait & Archival Details */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-28">
            <div className="relative w-full h-[85vh] sm:h-auto sm:aspect-[3/4] min-h-[480px] bg-[#0D0D0D] overflow-hidden shadow-2xl border border-black/5 rounded-xs">
              <Image
                src={about.creativeDirectorImage || "/images/includes/IMG_0267.JPG.jpeg"}
                alt={`${about.creativeDirectorName}, ${about.creativeDirectorTitle}`}
                fill
                priority
                className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md px-4 py-2 border border-white/10 text-white rounded-xs">
                <span className="text-[8px] tracking-[0.3em] uppercase block text-white/60 font-sans">{about.creativeDirectorTitle}</span>
                <span className="font-serif text-xs text-white font-medium">{about.creativeDirectorName}</span>
              </div>
            </div>

            <div className="mt-6 p-6 bg-[#EFECE6] border border-black/5 flex flex-col gap-2">
              <span className="text-[8px] tracking-[0.3em] uppercase text-black/40 font-sans">OUR PHILOSOPHY</span>
              <p className="font-serif text-sm italic text-black/80">
                {about.philosophyQuote}
              </p>
            </div>
          </div>

          {/* Right Column: Full Story Text */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-base sm:text-lg font-sans font-light text-black/80 leading-relaxed">
            
            <p className="text-xl sm:text-2xl font-serif font-light text-black leading-snug">
              {about.storyParagraph1}
            </p>

            <p>
              {about.storyParagraph2}
            </p>

            <p>
              {about.storyParagraph3}
            </p>

            <div className="py-2 my-2">
              <span className="font-serif text-xl sm:text-2xl font-light italic text-[#1A1A1A]">
                And that's where Style with J was born.
              </span>
            </div>

            {/* HIGHLIGHTED GOAL CARD (MATCHES OUR PHILOSOPHY STYLE) */}
            <div className="p-6 bg-[#EFECE6] border border-black/5 flex flex-col gap-2 my-2 shadow-xs rounded-xs">
              <span className="text-[8px] tracking-[0.3em] uppercase text-black/50 font-sans font-semibold">MY GOAL</span>
              <p className="font-serif text-lg sm:text-xl italic text-black font-normal leading-relaxed">
                {about.goalQuote}
              </p>
            </div>

            <p>
              Because when you're comfortable in what you wear, confidence follows naturally.
            </p>

            <div className="pt-2">
              <span className="font-serif text-xl text-black/70 italic">
                Welcome to Style with J.
              </span>
            </div>

            <div className="pt-4">
              <Link
                href="/services"
                className="group inline-flex items-center gap-6 px-8 py-4 bg-[#1A1A1A] text-white text-[10px] tracking-[0.3em] uppercase font-light hover:bg-black transition-all shadow-md"
              >
                Explore What We Do
                <span className="transform group-hover:translate-x-2 transition-transform text-sm">→</span>
              </Link>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />
      <AboutContent />
      <AtelierFooter />
    </div>
  );
}
