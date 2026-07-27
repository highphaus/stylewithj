'use client';
import React from 'react';
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

      {/* ── EDITORIAL HEADER ── */}
      <header className="pt-32 sm:pt-44 pb-12 sm:pb-16 px-4 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/10">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-3 font-semibold">
          STYLING LEDGER
        </span>
        <h1 className="font-serif text-3xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-none text-black">
          What Can I <span className="italic text-black/50">Style</span> For You?
        </h1>
        <p className="font-serif text-sm sm:text-xl lg:text-2xl text-black/60 font-light italic leading-relaxed mt-4 sm:mt-6 max-w-3xl">
          Discover curated styling categories tailored to your personality, lifestyle, body proportions, and special occasions.
        </p>
      </header>

      {/* ── CATEGORIES GRID ── */}
      <main className="px-4 sm:px-12 lg:px-20 max-w-7xl mx-auto py-10 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          {categoryData.map((cat) => (
            <div 
              key={cat.num}
              className="bg-[#FAF8F3] border border-black/10 p-5 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.02)] rounded-xs flex flex-col justify-between group hover:border-black/30 transition-all duration-300"
            >
              <div>
                {/* Header Badge */}
                <div className="flex justify-between items-center mb-5 border-b border-black/10 pb-4">
                  <span className="font-mono text-xs font-bold text-black/40">/{cat.num}</span>
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold text-black/70">
                    {cat.title}
                  </span>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                  
                  {/* Left Column: Image */}
                  <div className="sm:col-span-5 relative aspect-[4/3] sm:aspect-[3/4] w-full overflow-hidden bg-[#EFECE6] border border-black/5 rounded-xs shadow-xs">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Right Column: Title, Description & Bullet List */}
                  <div className="sm:col-span-7 flex flex-col gap-3.5">
                    <h3 className="font-serif text-lg sm:text-2xl font-light text-black leading-snug">
                      {cat.headline}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans font-light text-black/70 leading-relaxed">
                      {cat.desc}
                    </p>

                    <div className="pt-2 border-t border-black/10">
                      <span className="text-[9px] tracking-[0.25em] uppercase text-black/45 block mb-2.5 font-semibold">
                        Included Services:
                      </span>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {cat.items.map((item, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans font-light bg-white border border-black/10 px-2.5 py-1 rounded-xs text-black/80 shadow-2xs"
                          >
                            <span className="w-1 h-1 rounded-full bg-black/40" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom CTA Action Link */}
              <div className="mt-6 sm:mt-8 pt-4 border-t border-black/10 flex justify-between items-center">
                <Link 
                  href="/services" 
                  className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium text-black hover:opacity-70 transition-opacity flex items-center gap-1.5"
                >
                  Explore Details
                  <span className="text-xs">→</span>
                </Link>
                <Link 
                  href="/connect" 
                  className="px-4 py-2 bg-black text-white text-[9px] tracking-[0.2em] uppercase font-light hover:bg-black/80 transition-colors rounded-xs"
                >
                  Book Session
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* ── BOTTOM CALL TO ACTION ── */}
        <section className="mt-12 sm:mt-24 p-6 sm:p-14 bg-[#EFECE6] border border-black/10 rounded-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-8 shadow-sm">
          <div className="max-w-2xl">
            <span className="text-[9px] tracking-[0.4em] uppercase font-sans text-black/45 font-semibold block mb-2">
              PERSONALIZED CONSULTATIONS
            </span>
            <h2 className="font-serif text-xl sm:text-4xl font-light text-black leading-tight">
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
