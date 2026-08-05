'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLightbox } from '@/components/ImageLightbox';
import { useSiteData } from '@/lib/use-site-data';

const aboutImages = [
  { 
    src: '/images/includes/IMG_0267.JPG.jpeg', 
    alt: 'J. Personal Stylist Portrait',
    title: 'Portrait & Studio'
  },
  { 
    src: '/images/includes/IMG_3112.JPG.jpeg', 
    alt: 'Editorial Aesthetic Flatlay',
    title: 'Editorial & Curation'
  },
  { 
    src: '/images/includes/IMG_8771.JPG.jpeg', 
    alt: 'Wardrobe & Style Session',
    title: 'Wardrobe & Consultation'
  },
];

export default function AboutSection() {
  const { openLightbox } = useLightbox();
  const { about } = useSiteData();

  return (
    <section className="w-full bg-[#FAF9F6] text-[#1A1A1A] border-b border-black/10 overflow-hidden">
      
      {/* ── MOBILE DEVICE LAYOUT (TEXT -> FULL-BLEED HERO IMAGES -> READ MY STORY BUTTON) ── */}
      <div className="block md:hidden w-full bg-[#FAF9F6]">
        
        {/* 1. Header Text */}
        <div className="px-6 pt-12 pb-8 border-b border-black/10 bg-[#FAF9F6]">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] tracking-[0.4em] uppercase font-semibold text-[#1A1A1A]/60">
              ✦ ABOUT ME
            </span>
            <div className="w-8 h-[1px] bg-[#1A1A1A]/30" />
          </div>
          
          <h2 className="text-3xl font-serif font-light leading-[1.15] tracking-tight text-[#1A1A1A] mb-3">
            {about.titleLine1 || "Hi, I'm J."} <br />
            <span className="italic font-normal text-black/80">{about.titleLine2 || "I style stories."}</span>
          </h2>

          <p className="text-xs font-light text-[#1A1A1A]/80 leading-relaxed tracking-wide mb-6">
            {about.storyParagraph1 || "With over 8 years of experience in fashion and image consulting, I help women discover their signature style and build wardrobes that are chic, functional, and uniquely theirs."}
          </p>

          <div className="p-4 bg-[#EFECE6] border-l-2 border-[#1A1A1A] rounded-xs">
            <p className="font-serif text-xs font-light italic leading-relaxed text-[#1A1A1A]">
              {about.goalQuote || "“My goal is simple: to make getting dressed the easiest decision of your day.”"}
            </p>
          </div>
        </div>

        {/* 2. 100% ZERO GAP FULL BLEED HERO STYLE COVER IMAGES */}
        <div className="flex flex-col bg-[#FAF9F6] divide-y divide-black/10">
          {aboutImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(img.src, img.alt)}
              className="relative w-full h-[100dvh] min-h-[500px] bg-[#0D0D0D] overflow-hidden cursor-pointer group flex-shrink-0"
              title={`Click to view ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* 3. READ MY STORY BUTTON DIRECTLY AFTER THE IMAGES ON SMALLER DEVICES */}
        <div className="px-6 py-8 bg-[#FAF9F6] flex justify-start items-center border-t border-black/10">
          <Link
            href="/about"
            className="group inline-flex items-center gap-4 px-6 py-3.5 bg-[#1A1A1A] text-white text-[9px] tracking-[0.25em] uppercase font-light hover:bg-black transition-all shadow-md rounded-xs"
          >
            <span>Read My Story</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform text-xs">→</span>
          </Link>
        </div>

      </div>

      {/* ── DESKTOP & TABLET LAYOUT (md:block) ── */}
      <div className="hidden md:block max-w-7xl mx-auto py-16 sm:py-24 lg:py-28 px-6 sm:px-12 lg:px-20">
        <div className="flex flex-col gap-12 lg:gap-16">
          
          {/* Header text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-8 border-b border-black/10">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-semibold text-[#1A1A1A]/60">
                  ✦ ABOUT ME
                </span>
                <div className="w-8 h-[1px] bg-[#1A1A1A]/30" />
              </div>
              
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light leading-[1.12] tracking-tight text-[#1A1A1A] mb-4">
                {about.titleLine1 || "Hi, I'm J."} <br />
                <span className="italic font-normal text-black/80">{about.titleLine2 || "I style stories."}</span>
              </h2>

              <p className="text-xs sm:text-sm font-light text-[#1A1A1A]/80 leading-relaxed tracking-wide max-w-xl">
                {about.storyParagraph1 || "With over 8 years of experience in fashion and image consulting, I help women discover their signature style and build wardrobes that are chic, functional, and uniquely theirs."}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end gap-6">
              <div className="p-6 bg-[#EFECE6] border-l-2 border-[#1A1A1A] rounded-xs w-full max-w-md">
                <p className="font-serif text-sm sm:text-base font-light italic leading-relaxed text-[#1A1A1A]">
                  {about.goalQuote || "“My goal is simple: to make getting dressed the easiest decision of your day.”"}
                </p>
              </div>

              <Link
                href="/about"
                className="group inline-flex items-center gap-6 pb-1 border-b border-[#1A1A1A]/40 hover:border-[#1A1A1A] text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-300"
              >
                Read My Story
                <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm">→</span>
              </Link>
            </div>
          </div>

          {/* Desktop 3-column image gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {aboutImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(img.src, img.alt)}
                className="group relative w-full aspect-[3/4] bg-[#EFECE6] overflow-hidden rounded-xs border border-black/10 shadow-md cursor-pointer"
                title={`Click to view ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-top sm:object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
