'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLightbox } from '@/components/ImageLightbox';

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

  return (
    <section className="w-full bg-[#FAF9F6] text-[#1A1A1A] py-16 sm:py-24 lg:py-28 px-6 sm:px-12 lg:px-20 border-b border-black/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">
        
        {/* ── WRITINGS / TEXT HEADER (SEPARATED FROM IMAGES) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-8 border-b border-black/10">
          
          {/* Left Column: Intro & Title */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-semibold text-[#1A1A1A]/60">
                ✦ ABOUT ME
              </span>
              <div className="w-8 h-[1px] bg-[#1A1A1A]/30" />
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light leading-[1.12] tracking-tight text-[#1A1A1A] mb-4">
              Hi, I'm J. <br />
              <span className="italic font-normal text-black/80">I style stories.</span>
            </h2>

            <p className="text-xs sm:text-sm font-light text-[#1A1A1A]/80 leading-relaxed tracking-wide max-w-xl">
              With over 8 years of experience in fashion and image consulting, I help women
              discover their signature style and build wardrobes that are chic, functional, and
              uniquely theirs.
            </p>
          </div>

          {/* Right Column: Quote & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end gap-6">
            <div className="p-6 bg-[#EFECE6] border-l-2 border-[#1A1A1A] rounded-xs w-full max-w-md">
              <p className="font-serif text-sm sm:text-base font-light italic leading-relaxed text-[#1A1A1A]">
                “My goal is simple: to make getting dressed the easiest decision of your day.”
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

        {/* ── 3 CLEAN IMAGE PANELS (ZERO TEXT OVERLAY ON PICTURES) ── */}
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
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
