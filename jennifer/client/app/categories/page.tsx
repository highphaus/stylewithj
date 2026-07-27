'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';

const categoryData = [
  {
    num: '01',
    title: 'EVERYDAY',
    headline: 'Everyday Style & Professional Dressing',
    desc: 'Effortless outfits designed for real life, daily confidence, corporate meetings, and senior executive posture.',
    image: '/images/img14.jpeg',
    items: [
      'Everyday Style',
      'Casual & Weekend',
      'Corporate & Workwear',
      'Business & Formal'
    ]
  },
  {
    num: '02',
    title: 'CELEBRATIONS',
    headline: 'Weddings & Milestone Occasions',
    desc: 'Statement occasion silhouettes, bridal party curations, and traditional heritage drapes built for milestone memories.',
    image: '/images/img07.jpeg',
    items: [
      'Weddings',
      'Bridesmaid',
      'Bridal',
      'Engagement',
      'Indian Festive',
      'Ethnic & Traditional',
      'Parties'
    ]
  },
  {
    num: '03',
    title: 'LIFE & TRAVEL',
    headline: 'Destination & Resort Wardrobes',
    desc: 'Relaxed luxury collections, romantic date night looks, and travel wardrobes crafted for intentional living.',
    image: '/images/img15.jpeg',
    items: [
      'Vacation',
      'Resort',
      'Travel',
      'Date Night',
      'Special Occasions'
    ]
  },
  {
    num: '04',
    title: 'YOUR STYLE',
    headline: 'Personal Fit & Custom Consultations',
    desc: 'Bespoke personal consultations tailored around your body proportions, comfort, maternity needs, and unique fit.',
    image: '/images/img05.jpeg',
    items: [
      'Wardrobe Refresh',
      'Personal Shopping',
      'Petite & Tall',
      'Plus-Size',
      'Maternity'
    ]
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />

      {/* ── REFINED EDITORIAL HEADER ── */}
      <header className="pt-32 sm:pt-40 pb-10 sm:pb-14 px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto border-b border-black/10">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-2 sm:mb-3 font-semibold">
          STYLING LEDGER
        </span>
        
        {/* Normal, Balanced Heading Scale */}
        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight text-black">
          What Can I <span className="italic text-black/50">Style</span> For You?
        </h1>

        <p className="font-serif text-sm sm:text-lg text-black/60 font-light italic leading-relaxed mt-3 sm:mt-4 max-w-2xl">
          Discover curated styling categories tailored to your personality, lifestyle, body proportions, and special occasions.
        </p>

        {/* Highlighted Philosophy Quote */}
        <div className="mt-6 sm:mt-8 p-5 sm:p-7 bg-[#EFECE6] border-l-4 border-[#1A1A1A] rounded-xs shadow-xs max-w-3xl">
          <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-black/50 block mb-1.5 font-bold">
            OUR PHILOSOPHY
          </span>
          <p className="font-serif text-base sm:text-xl font-light italic text-[#1A1A1A] leading-snug">
            "At Style with J, we help you discover your personal style, create looks that work for your real life, and build a wardrobe that works for you."
          </p>
        </div>
      </header>

      {/* ── HIGH-FASHION GALLERY GRID ── */}
      <main className="px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {categoryData.map((cat) => (
            <div 
              key={cat.num}
              className="bg-[#FAF8F3] border border-black/10 p-5 sm:p-8 rounded-xs shadow-xs flex flex-col justify-between group hover:border-black/30 transition-all duration-300"
            >
              <div>
                {/* Category Top Ledger Header */}
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-black/10">
                  <span className="font-mono text-xs font-bold text-black/40">/{cat.num}</span>
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-black/80">
                    {cat.title}
                  </span>
                </div>

                {/* High Fashion Gallery Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFECE6] border border-black/5 rounded-xs shadow-sm mb-5">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[8px] tracking-[0.25em] font-sans text-black uppercase font-bold shadow-xs rounded-xs">
                    CATEGORY // {cat.num}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-serif text-xl sm:text-2xl font-light text-black leading-snug mb-2">
                  {cat.headline}
                </h3>
                <p className="text-xs sm:text-sm font-sans font-light text-black/70 leading-relaxed mb-4">
                  {cat.desc}
                </p>

                {/* Service Items Grid (Pill Chips) */}
                <div className="pt-3 border-t border-black/10">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-black/50 block mb-2.5 font-semibold">
                    Included Services:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans font-light bg-white border border-black/10 px-3 py-1.5 rounded-xs text-black/85 shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-black/10 flex justify-between items-center">
                <Link 
                  href="/services" 
                  className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-black hover:opacity-60 transition-opacity flex items-center gap-1.5"
                >
                  Explore Details
                  <span className="text-xs">→</span>
                </Link>
                <Link 
                  href="/connect" 
                  className="px-4 py-2 bg-black text-white text-[9px] tracking-[0.2em] uppercase font-light hover:bg-black/80 transition-colors rounded-xs shadow-xs"
                >
                  Book Session
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* ── BOTTOM CALL TO ACTION ── */}
        <section className="mt-12 sm:mt-20 p-6 sm:p-12 bg-[#EFECE6] border border-black/10 rounded-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm">
          <div className="max-w-xl">
            <span className="text-[9px] tracking-[0.4em] uppercase font-sans text-black/50 font-semibold block mb-2">
              PERSONALIZED CONSULTATIONS
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-light text-black leading-tight">
              Ready to find a style that feels like you, only better?
            </h2>
          </div>
          <Link
            href="/connect"
            className="group flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-3.5 sm:py-4 bg-black text-white text-[10px] tracking-[0.3em] uppercase font-light hover:bg-black/85 transition-all shadow-md flex-shrink-0 rounded-xs"
          >
            Connect With Jennifer
            <span className="transform group-hover:translate-x-1 transition-transform text-xs">→</span>
          </Link>
        </section>

      </main>

      <AtelierFooter />
    </div>
  );
}
