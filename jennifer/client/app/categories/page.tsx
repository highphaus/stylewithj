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
    desc: 'Effortless outfits designed for real life — daily confidence, corporate meetings, and workwear that feels authentically you.',
    image: '/images/img14.jpeg',
    color: '#F5F2ED',
    items: ['Everyday Style', 'Casual & Weekend', 'Corporate & Workwear', 'Business & Formal']
  },
  {
    num: '02',
    title: 'CELEBRATIONS',
    headline: 'Weddings & Milestone Occasions',
    desc: 'Statement occasion silhouettes, bridal party curations, and traditional heritage drapes built for unforgettable memories.',
    image: '/images/img07.jpeg',
    color: '#EDE8E0',
    items: ['Weddings', 'Bridesmaid', 'Bridal', 'Engagement', 'Indian Festive', 'Ethnic & Traditional', 'Parties']
  },
  {
    num: '03',
    title: 'LIFE & TRAVEL',
    headline: 'Destination & Resort Wardrobes',
    desc: 'Relaxed luxury collections, romantic date night looks, and travel wardrobes crafted for intentional, beautiful living.',
    image: '/images/img15.jpeg',
    color: '#F0EBE4',
    items: ['Vacation', 'Resort', 'Travel', 'Date Night', 'Special Occasions']
  },
  {
    num: '04',
    title: 'YOUR STYLE',
    headline: 'Personal Fit & Custom Consultations',
    desc: 'Bespoke personal consultations tailored around your body proportions, comfort, maternity needs, and unique identity.',
    image: '/images/img05.jpeg',
    color: '#EAE6DE',
    items: ['Wardrobe Refresh', 'Personal Shopping', 'Petite & Tall', 'Plus-Size', 'Maternity']
  }
];

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />

      {/* ── HERO HEADER ── */}
      <section className="pt-32 sm:pt-40 pb-0 px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-black/10 pb-10">
          <div className="max-w-2xl">
            <span className="font-sans text-[10px] tracking-[0.45em] uppercase text-black/50 block mb-3 font-semibold">
              STYLING LEDGER
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-black">
              What Can I{' '}
              <em className="not-italic italic text-black/45">Style</em>{' '}
              For You?
            </h1>
          </div>
          <p className="font-serif text-sm sm:text-base text-black/55 font-light italic leading-relaxed max-w-xs sm:text-right">
            Curated styling for every personality, lifestyle, and occasion.
          </p>
        </div>
      </section>

      {/* ── PHILOSOPHY STRIP ── */}
      <section className="px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="bg-[#1A1A1A] text-white px-6 sm:px-10 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-serif text-sm sm:text-base lg:text-lg font-light italic leading-snug max-w-2xl text-white/90">
            "At Style with J, we help you discover your personal style, create looks that work for your real life, and build a wardrobe that works for you."
          </p>
          <Link
            href="/connect"
            className="flex-shrink-0 font-sans text-[9px] tracking-[0.3em] uppercase font-semibold text-white/60 hover:text-white border-b border-white/30 hover:border-white pb-0.5 transition-all"
          >
            Book a Session →
          </Link>
        </div>
      </section>

      {/* ── MAIN CATEGORY GALLERY ── */}
      <main className="px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto py-12 sm:py-16">

        {/* Full-width featured first category */}
        <div className="mb-8 sm:mb-10">
          <div 
            className="relative w-full overflow-hidden group cursor-default"
            style={{ background: categoryData[0].color }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[380px] sm:min-h-[480px]">
              
              {/* Left: Text Content */}
              <div className="flex flex-col justify-between p-7 sm:p-12 order-2 sm:order-1">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] font-bold text-black/40">/{categoryData[0].num}</span>
                    <span className="font-sans text-[9px] tracking-[0.35em] uppercase font-bold text-black/60 border border-black/15 px-3 py-1">
                      {categoryData[0].title}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-black leading-snug mb-4">
                    {categoryData[0].headline}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-black/65 font-light leading-relaxed mb-6 max-w-sm">
                    {categoryData[0].desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categoryData[0].items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-sans bg-white/70 border border-black/10 px-3 py-1.5 text-black/75 font-light"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-black/10 flex items-center gap-6">
                  <Link href="/services" className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-black hover:opacity-60 flex items-center gap-2 transition-opacity">
                    Explore Services <span>→</span>
                  </Link>
                  <Link href="/connect" className="font-sans text-[10px] tracking-[0.2em] uppercase font-light text-black/50 hover:text-black transition-colors">
                    Book a Session
                  </Link>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative min-h-[260px] sm:min-h-full overflow-hidden order-1 sm:order-2">
                <Image
                  src={categoryData[0].image}
                  alt={categoryData[0].title}
                  fill
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

            </div>
          </div>
        </div>

        {/* Three smaller cards below */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {categoryData.slice(1).map((cat) => (
            <div
              key={cat.num}
              className="group flex flex-col overflow-hidden border border-black/10 hover:border-black/30 transition-all duration-300"
              style={{ background: cat.color }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
                {/* Overlay label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                  <span className="font-sans text-[9px] tracking-[0.3em] uppercase font-bold text-white/90">
                    {cat.title}
                  </span>
                </div>
                <div className="absolute top-3 right-3 font-mono text-[9px] font-bold text-white/70 bg-black/25 backdrop-blur-sm px-2 py-1">
                  /{cat.num}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 sm:p-6">
                <h3 className="font-serif text-lg sm:text-xl font-light text-black leading-snug mb-2">
                  {cat.headline}
                </h3>
                <p className="font-sans text-xs text-black/60 font-light leading-relaxed mb-4 flex-1">
                  {cat.desc}
                </p>

                {/* Pill chips */}
                <div className="border-t border-black/10 pt-4">
                  <span className="text-[8px] tracking-[0.3em] uppercase text-black/40 font-semibold block mb-2.5">
                    Includes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] sm:text-[10px] font-sans bg-white/70 border border-black/10 px-2.5 py-1 text-black/70 font-light"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card footer */}
                <div className="mt-5 pt-4 border-t border-black/10 flex justify-between items-center">
                  <Link
                    href="/services"
                    className="font-sans text-[9px] tracking-[0.2em] uppercase font-semibold text-black hover:opacity-60 transition-opacity flex items-center gap-1.5"
                  >
                    Details <span className="text-xs">→</span>
                  </Link>
                  <Link
                    href="/connect"
                    className="px-4 py-1.5 bg-black text-white text-[8px] tracking-[0.2em] uppercase font-light hover:bg-black/75 transition-colors"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* ── BOTTOM CTA ── */}
      <section className="px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto pb-16 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 border border-black/10 overflow-hidden">
          {/* Left: Message */}
          <div className="bg-[#EFECE6] p-8 sm:p-12 flex flex-col justify-between gap-8">
            <div>
              <span className="text-[9px] tracking-[0.4em] uppercase font-sans text-black/50 font-semibold block mb-3">
                START YOUR STYLE JOURNEY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-black leading-snug">
                Ready to find a style that feels like you, only better?
              </h2>
            </div>
            <Link
              href="/connect"
              className="group self-start flex items-center gap-4 px-7 py-3.5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.3em] uppercase font-light hover:bg-black transition-all shadow-sm"
            >
              Connect With Jennifer
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Right: Side details */}
          <div className="bg-white p-8 sm:p-12 flex flex-col justify-between gap-6 border-t sm:border-t-0 sm:border-l border-black/10">
            <p className="font-serif text-base sm:text-lg font-light text-black/70 italic leading-relaxed">
              Every session is personal. Every wardrobe is unique. Every style story starts with a conversation.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Personal Styling', href: '/services' },
                { label: 'Wardrobe Styling', href: '/services' },
                { label: 'Occasion Styling', href: '/services' },
                { label: 'Workwear Styling', href: '/services' },
              ].map((s) => (
                <Link key={s.label} href={s.href} className="text-[11px] font-sans text-black/70 hover:text-black transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-black/30 group-hover:bg-black transition-colors flex-shrink-0" />
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AtelierFooter />
    </div>
  );
}
