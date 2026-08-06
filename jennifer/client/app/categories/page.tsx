'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';
import { useLightbox } from '@/components/ImageLightbox';

const categoryData = [
  {
    id: 'everyday',
    num: '01',
    title: 'EVERYDAY & WORKWEAR',
    headline: 'Everyday Style & Professional Dressing',
    subtitle: 'AUTHENTIC EXECUTIVE PRESENCE',
    desc: 'Effortless outfits designed for real life — daily confidence, corporate meetings, and workwear that feels authentically you. Designed to navigate unpredictable climate shifts and high-stakes executive boardrooms.',
    image: '/images/includes/B4A2A5F7-FFA5-4B7A-9B0F-5EA8653D623E.JPG.jpeg',
    color: '#F5F2ED',
    items: ['Everyday Style', 'Casual & Weekend', 'Corporate & Workwear', 'Executive Presence', 'Business & Formal']
  },
  {
    id: 'celebrations',
    num: '02',
    title: 'CELEBRATIONS & BRIDAL',
    headline: 'Weddings & Milestone Occasions',
    subtitle: 'STATEMENT OCCASION CURATIONS',
    desc: 'Statement occasion silhouettes, bridal party curations, and traditional heritage drapes built for unforgettable memories. Seamlessly blending modern bridal fusion with authentic handloom heritage.',
    image: '/images/CIT09345.jpg',
    color: '#EDE8E0',
    items: ['Weddings', 'Bridesmaid', 'Bridal Trousseau', 'Engagement', 'Indian Festive', 'Ethnic & Traditional', 'Parties']
  },
  {
    id: 'travel',
    num: '03',
    title: 'LIFE, RESORT & TRAVEL',
    headline: 'Destination & Resort Wardrobes',
    subtitle: 'RELAXED LUXURY COLLECTIONS',
    desc: 'Relaxed luxury collections, romantic date night looks, and travel wardrobes crafted for intentional, beautiful living. Wrinkle-resistant, breathable travel capsule collections tailored for worldwide journeys.',
    image: '/images/includes/IMG_3112.JPG.jpeg',
    color: '#F0EBE4',
    items: ['Vacation', 'Resort Wear', 'Travel Capsule', 'Date Night', 'Special Occasions']
  },
  {
    id: 'personal',
    num: '04',
    title: 'YOUR STYLE & FIT',
    headline: 'Personal Fit & Custom Consultations',
    subtitle: 'BESPOKE PERSONAL PROPORTIONS',
    desc: 'Bespoke personal consultations tailored around your body proportions, comfort, maternity needs, and unique identity. We reconstruct your closet around who you are today.',
    image: '/images/includes/IMG_9051.JPG.jpeg',
    color: '#EAE6DE',
    items: ['Wardrobe Refresh', 'Personal Shopping', 'Petite & Tall', 'Plus-Size Styling', 'Maternity Consultations']
  }
];

export default function CategoriesPage() {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const { openLightbox } = useLightbox();

  const filteredCategories = categoryData.filter(
    (cat) => selectedTab === 'all' || cat.id === selectedTab
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />

      {/* ── 1. DISTINCTIVE HERO HEADER ── */}
      <header className="pt-32 sm:pt-40 pb-10 sm:pb-14 px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto border-b border-black/10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-sans text-[10px] tracking-[0.45em] uppercase text-black/50 block mb-3 font-semibold">
              ✦ STYLING CATEGORIES & CURATIONS
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-black">
              What Can I{' '}
              <em className="not-italic italic text-black/45">Style</em>{' '}
              For You?
            </h1>
          </div>
          <p className="font-serif text-sm sm:text-base text-black/60 font-light italic leading-relaxed max-w-xs md:text-right">
            Bespoke wardrobe curations tailored to your body proportions, daily career demands, and lifestyle milestones.
          </p>
        </div>
      </header>

      {/* ── 2. PHILOSOPHY HIGHLIGHT STRIP ── */}
      <section className="px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto py-6">
        <div className="bg-[#1A1A1A] text-white px-6 sm:px-10 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xs shadow-sm">
          <p className="font-serif text-sm sm:text-base lg:text-lg font-light italic leading-snug max-w-2xl text-white/90">
            "At Style with J, we help you discover your personal style, create looks that work for your real life, and build a wardrobe that works for you."
          </p>
          <Link
            href="/connect"
            className="flex-shrink-0 font-mono text-[9px] tracking-[0.3em] uppercase font-semibold text-white/70 hover:text-white border-b border-white/30 hover:border-white pb-0.5 transition-all"
          >
            Book Consultation →
          </Link>
        </div>
      </section>

      {/* ── 3. CATEGORY SELECTOR TOOLBAR (INTERACTIVE SWITCHER) ── */}
      <main className="px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto py-8 sm:py-12">
        <div className="mb-12 pb-6 border-b border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2.5 sm:px-3.5 sm:py-2 text-[9px] sm:text-[9.5px] tracking-[0.15em] uppercase font-mono transition-all rounded-xs border cursor-pointer shrink-0 whitespace-nowrap active:scale-95 ${
                selectedTab === 'all'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold shadow-xs'
                  : 'bg-white text-black/75 border-black/15 hover:border-black/40 hover:text-black font-medium'
              }`}
            >
              ALL CATEGORIES
            </button>
            {categoryData.map((cat) => {
              const isActive = selectedTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedTab(cat.id)}
                  className={`px-4 py-2.5 sm:px-3.5 sm:py-2 text-[9px] sm:text-[9.5px] tracking-[0.15em] uppercase font-mono transition-all rounded-xs border cursor-pointer shrink-0 whitespace-nowrap active:scale-95 ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold shadow-xs'
                      : 'bg-white text-black/75 border-black/15 hover:border-black/40 hover:text-black font-medium'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-xs text-black/50">
            Style with J
          </span>
        </div>

        {/* ── 4. ALTERNATING HIGH-FASHION SILHOUETTE CARDS ── */}
        <div className="space-y-12 sm:space-y-16">
          {filteredCategories.map((cat, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={cat.id}
                className="bg-[#FAF8F3] border border-black/10 rounded-xs overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Image Section */}
                <div
                  onClick={() => openLightbox(cat.image, cat.headline)}
                  className={`lg:col-span-6 relative min-h-[340px] sm:min-h-[460px] bg-[#0D0D0D] overflow-hidden cursor-pointer group ${
                    isEven ? 'order-1' : 'order-1 lg:order-2'
                  }`}
                  title="Click to view image in full-screen"
                >
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-white bg-black/80 px-3 py-1.5 rounded-xs border border-white/20">
                      Tap to View
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/80 bg-black/50 px-2 py-1 backdrop-blur-sm">
                      {cat.subtitle}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div
                  className={`lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-6 ${
                    isEven ? 'order-2' : 'order-2 lg:order-1'
                  }`}
                >
                  <div>
                    <div className="mb-4">
                      <span className="font-sans text-[9px] tracking-[0.35em] uppercase font-bold text-black/60 border border-black/15 px-3 py-1 bg-white">
                        {cat.title}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-black leading-tight mb-4">
                      {cat.headline}
                    </h2>

                    <p className="font-sans text-xs sm:text-sm text-black/75 font-light leading-relaxed mb-6">
                      {cat.desc}
                    </p>

                    {/* Sub-Curations Pills */}
                    <div className="pt-4 border-t border-black/10">
                      <span className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-black/45 block mb-3 font-semibold">
                        CURATED SUB-SERVICES:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item, iIdx) => (
                          <span
                            key={iIdx}
                            className="font-sans text-[9.5px] bg-white border border-black/12 px-3 py-1 text-black/80 font-medium rounded-xs shadow-2xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-[9px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-colors rounded-xs shadow-xs"
                    >
                      Explore Services →
                    </Link>
                    <Link
                      href="/connect"
                      className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/70 hover:text-black font-semibold border-b border-black/20 pb-0.5"
                    >
                      Book Consultation
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <AtelierFooter />
    </div>
  );
}
