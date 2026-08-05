'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';
import { useLightbox } from '@/components/ImageLightbox';

const categoryData = [
  {
    num: '01',
    title: 'EVERYDAY',
    headline: 'Everyday Style & Professional Dressing',
    desc: 'Effortless outfits designed for real life — daily confidence, corporate meetings, and workwear that feels authentically you.',
    image: '/images/includes/B4A2A5F7-FFA5-4B7A-9B0F-5EA8653D623E.JPG.jpeg',
    color: '#F5F2ED',
    items: ['Everyday Style', 'Casual & Weekend', 'Corporate & Workwear', 'Business & Formal']
  },
  {
    num: '02',
    title: 'CELEBRATIONS',
    headline: 'Weddings & Milestone Occasions',
    desc: 'Statement occasion silhouettes, bridal party curations, and traditional heritage drapes built for unforgettable memories.',
    image: '/images/CIT09345.jpg',
    color: '#EDE8E0',
    items: ['Weddings', 'Bridesmaid', 'Bridal', 'Engagement', 'Indian Festive', 'Ethnic & Traditional', 'Parties']
  },
  {
    num: '03',
    title: 'LIFE & TRAVEL',
    headline: 'Destination & Resort Wardrobes',
    desc: 'Relaxed luxury collections, romantic date night looks, and travel wardrobes crafted for intentional, beautiful living.',
    image: '/images/includes/IMG_3112.JPG.jpeg',
    color: '#F0EBE4',
    items: ['Vacation', 'Resort', 'Travel', 'Date Night', 'Special Occasions']
  },
  {
    num: '04',
    title: 'YOUR STYLE',
    headline: 'Personal Fit & Custom Consultations',
    desc: 'Bespoke personal consultations tailored around your body proportions, comfort, maternity needs, and unique identity.',
    image: '/images/includes/IMG_9051.JPG.jpeg',
    color: '#EAE6DE',
    items: ['Wardrobe Refresh', 'Personal Shopping', 'Petite & Tall', 'Plus-Size', 'Maternity']
  }
];

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedMobileWriting, setExpandedMobileWriting] = useState<Record<string, boolean>>({});
  const { openLightbox } = useLightbox();

  const toggleWriting = (id: string) => {
    setExpandedMobileWriting((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

        {/* Full-width featured first category (EVERYDAY STYLE) */}
        <div className="mb-8 sm:mb-10">
          <div 
            className="relative w-full overflow-hidden group cursor-default"
            style={{ background: categoryData[0].color }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[380px] sm:min-h-[480px]">
              
              {/* Left: Text Content (Hidden by default on mobile unless clicked) */}
              <div className="flex flex-col justify-between p-7 sm:p-12 order-2 sm:order-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] font-bold text-black/40">/{categoryData[0].num}</span>
                    <span className="font-sans text-[9px] tracking-[0.35em] uppercase font-bold text-black/60 border border-black/15 px-3 py-1">
                      {categoryData[0].title}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:block mb-2 sm:mb-4">
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-black leading-snug">
                      {categoryData[0].headline}
                    </h2>
                    
                    {/* Mobile click to view writing toggle */}
                    <button
                      onClick={() => toggleWriting('cat-01')}
                      className="sm:hidden px-3 py-1.5 bg-[#1A1A1A] text-white text-[8px] font-mono uppercase tracking-[0.2em] rounded-xs flex-shrink-0"
                    >
                      {expandedMobileWriting['cat-01'] ? 'Hide Writing ↑' : 'View Writing ↓'}
                    </button>
                  </div>

                  {/* WRITING BODY & ITEMS (Hidden on mobile by default unless expandedMobileWriting['cat-01'] is true) */}
                  <div className={`${expandedMobileWriting['cat-01'] ? 'block' : 'hidden sm:block'} transition-all`}>
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

              {/* Right: Image - Hero Style Cover on Mobile */}
              <div 
                onClick={() => {
                  if (window.innerWidth < 640) {
                    toggleWriting('cat-01');
                  } else {
                    openLightbox(categoryData[0].image, categoryData[0].headline);
                  }
                }}
                className="relative w-full h-[75vh] sm:h-full min-h-[400px] overflow-hidden order-1 sm:order-2 cursor-pointer bg-[#0D0D0D]"
                title="Click to view writing / details"
              >
                <Image
                  src={categoryData[0].image}
                  alt={categoryData[0].title}
                  fill
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="sm:hidden absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 text-[8px] font-mono tracking-[0.2em] uppercase border border-white/10 rounded-xs">
                  {expandedMobileWriting['cat-01'] ? 'Writing Open ▲' : 'Click to View Writing ▼'}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Three smaller cards below */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-16">
          {categoryData.slice(1).map((cat) => {
            const catKey = `cat-${cat.num}`;
            const isWritingOpen = !!expandedMobileWriting[catKey];
            return (
              <div
                key={cat.num}
                className="group flex flex-col overflow-hidden border border-black/10 hover:border-black/30 transition-all duration-300"
                style={{ background: cat.color }}
              >
                {/* Image - Hero Style Cover on Mobile */}
                <div 
                  onClick={() => {
                    if (window.innerWidth < 640) {
                      toggleWriting(catKey);
                    } else {
                      openLightbox(cat.num === '02' ? '/images/CIT09345.jpg' : cat.image, cat.headline);
                    }
                  }}
                  className="relative w-full h-[75vh] sm:h-auto sm:aspect-[4/5] min-h-[400px] overflow-hidden cursor-pointer bg-[#0D0D0D]"
                  title="Click to view writing / details"
                >
                  <Image
                    src={cat.num === '02' ? '/images/CIT09345.jpg' : cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
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
                  <div className="sm:hidden absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white px-2.5 py-1 text-[8px] font-mono tracking-[0.2em] uppercase border border-white/10 rounded-xs">
                    {isWritingOpen ? 'Writing Open ▲' : 'Click to View Writing ▼'}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg sm:text-xl font-light text-black leading-snug">
                      {cat.headline}
                    </h3>
                    <button
                      onClick={() => toggleWriting(catKey)}
                      className="sm:hidden px-2.5 py-1 bg-[#1A1A1A] text-white text-[8px] font-mono uppercase tracking-[0.15em] rounded-xs flex-shrink-0"
                    >
                      {isWritingOpen ? 'Hide ↑' : 'Writing ↓'}
                    </button>
                  </div>

                  <div className={`${isWritingOpen ? 'block' : 'hidden sm:block'}`}>
                    <p className="font-sans text-xs text-black/60 font-light leading-relaxed mb-4">
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
            );
          })}
        </div>

        {/* ── ETHNIC STYLING FEATURED CURATION (CLIENT CATEGORY SHOWCASE) ── */}
        <section className="border-t border-black/10 pt-16 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/45 block mb-2 font-semibold">
                ✦ ETHNIC STYLING CURATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-black tracking-tight">
                Festive, Bridal & Ceremony Looks
              </h2>
            </div>
            <p className="font-sans text-xs text-black/60 max-w-sm font-light leading-relaxed">
              Curated heritage drapes, contemporary sarees, and statement occasion ensembles designed for high-value celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                category: 'Festive Wear',
                title: 'Silk Heritage Drape',
                desc: 'Classic blue silk saree paired with sweet-neck blouse and gold accents.',
                image: '/images/DSC07159.jpg'
              },
              {
                category: 'Bridesmaids',
                title: 'Modern Saree Ensemble',
                desc: 'Statement black saree paired with sequined strapless blouse.',
                image: '/images/DSC04682.jpg'
              },
              {
                category: 'Traditional Ceremony',
                title: 'Temple Gold Curation',
                desc: 'Green & red silk weave styled with opulent gold temple jewelry.',
                image: '/images/CIT09345.jpg'
              },
              {
                category: 'Engagement',
                title: 'Contoured Lehenga Drape',
                desc: 'Silver-grey embellished lehenga styled with waistband & delicate stones.',
                image: '/images/DSC04633.jpg'
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="group flex flex-col bg-white border border-black/10 overflow-hidden hover:shadow-lg transition-all duration-500"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#EFECE6]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 text-white font-sans text-[8px] tracking-[0.25em] uppercase font-semibold px-2.5 py-1 backdrop-blur-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-black font-light mb-1 leading-snug group-hover:text-black/70 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-black/60 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-black/40">Ethnic / 0{idx + 1}</span>
                    <Link href="/connect" className="font-sans text-[9px] tracking-[0.2em] uppercase font-semibold text-black hover:opacity-60 transition-opacity">
                      Style This Look →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WESTERN & CONTEMPORARY STYLING CURATION SHOWCASE ── */}
        <section className="border-t border-black/10 pt-16 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/45 block mb-2 font-semibold">
                ✦ WESTERN & CONTEMPORARY CURATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-black tracking-tight">
                Modern Silhouettes, Resort & Evening Drapes
              </h2>
            </div>
            <p className="font-sans text-xs text-black/60 max-w-sm font-light leading-relaxed">
              Tailored contemporary wear, bias-cut silk slips, and sculpted evening silhouettes styled for intentional modern living.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                category: 'Staircase Silk Slip',
                title: 'Polka Dot Satin Drape',
                desc: 'Fluid bias-cut polka dot slip dress styled with ankle strap heels.',
                image: '/images/includes/B4A2A5F7-FFA5-4B7A-9B0F-5EA8653D623E.JPG.jpeg'
              },
              {
                category: 'Resort Evening',
                title: 'Sculpted Peplum Gown',
                desc: 'Structured black strapless peplum column gown by resort pool.',
                image: '/images/includes/IMG_8709.JPG.jpeg'
              },
              {
                category: 'Elevated Casual',
                title: 'Meadow Halter Midi',
                desc: 'Earthy white halter midi with artisanal leather waist belt.',
                image: '/images/includes/IMG_9051.JPG.jpeg'
              },
              {
                category: 'Ocean Luxury',
                title: 'Backless Halter Maxi',
                desc: 'Minimalist black backless gown against coastal ocean horizons.',
                image: '/images/includes/IMG_3112.JPG.jpeg'
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="group flex flex-col bg-white border border-black/10 overflow-hidden hover:shadow-lg transition-all duration-500"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#EFECE6]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 text-white font-sans text-[8px] tracking-[0.25em] uppercase font-semibold px-2.5 py-1 backdrop-blur-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-black font-light mb-1 leading-snug group-hover:text-black/70 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-black/60 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-black/40">Western / 0{idx + 1}</span>
                    <Link href="/lookbook" className="font-sans text-[9px] tracking-[0.2em] uppercase font-semibold text-black hover:opacity-60 transition-opacity">
                      View Lookbook →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

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
