'use client';
import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';
import { useLightbox } from '@/components/ImageLightbox';

// ── DATA ────────────────────────────────────────────────────────────────────

const pillars = [
  {
    num: '01',
    title: 'DISCOVER YOUR STYLE',
    headline: 'Find what makes you feel confident and comfortable.',
    body: 'Your style should feel personal. We help you understand what works for you, from silhouettes and fits to colours, proportions, and outfit combinations, so you can feel confident in what you wear without feeling like you\'re trying to be someone else. It\'s about discovering what makes you feel like the best version of yourself and turning that into a style that feels natural to you.',
  },
  {
    num: '02',
    title: 'STYLE YOUR LIFE',
    headline: 'Create looks that work for your real life, not just Instagram.',
    body: 'Style shouldn\'t only exist in pictures. Whether you\'re dressing for work, a date night, a vacation, a wedding, a special event, or simply trying to figure out what to wear every day, we help you create looks that fit your lifestyle and the moments that matter to you. Because the best outfit isn\'t just the one that looks good, it\'s the one you actually feel good in.',
  },
  {
    num: '03',
    title: 'BUILD YOUR WARDROBE',
    headline: 'Shop smarter. Style better.',
    body: 'We believe in shopping smarter, not shopping more. Our approach is about making the most of what you already own, discovering new ways to style your existing pieces, and investing in the right additions that make your wardrobe more versatile. Because looking your best isn\'t about having more clothes. It\'s about knowing what to do with the right ones.',
  },
];

const servicesList = [
  {
    num: '01',
    category: 'Style Discovery',
    title: 'Personal Styling',
    pricing: 'Starting from ₹5,000',
    summary: 'Discover and define your personal style with looks tailored to your personality, lifestyle, comfort, preferences, and the way you want to show up in the world.',
    points: [
      'Discover your personal style & signature silhouette',
      'Understand what silhouettes, colours, and fits work for you',
      'Create outfits that suit your personality and Bangalore lifestyle',
      'Feel comfortable and confident in what you wear',
    ],
    image: '/images/includes/IMG_0271.JPG.jpeg',
  },
  {
    num: '02',
    category: 'Closet Evolution',
    title: 'Wardrobe Styling & Audit',
    pricing: 'Starting from ₹7,500',
    summary: 'Make your existing wardrobe work harder. We\'ll help you audit pieces, create fresh outfit combinations, identify what\'s missing, and build a versatile capsule closet.',
    points: [
      'Comprehensive wardrobe audit & assessment',
      'Identifying what works and what doesn\'t',
      'Styling existing pieces in 5+ new ways',
      'Creating multiple looks from the same wardrobe',
      'Building an intentional, versatile capsule closet',
    ],
    image: '/images/includes/IMG_1406.JPG.jpeg',
  },
  {
    num: '03',
    category: 'Intentional Shopping',
    title: 'Personal Shopping Bangalore',
    pricing: 'Starting from ₹10,000',
    summary: 'Shop with intention through curated itineraries in Indiranagar boutiques, Commercial Street markets, or luxury malls tailored to your style and budget.',
    points: [
      'Personalised shopping itineraries & recommendations',
      'Curated pieces based on individual body proportions',
      'Shopping according to exact budget parameters',
      'Avoiding unnecessary impulse purchases',
      'Finding handloom & modern pieces that complement your closet',
    ],
    image: '/images/includes/IMG_1423.JPG.jpeg',
  },
  {
    num: '04',
    category: 'Event & Celebration',
    title: 'Occasion & Bridal Styling',
    pricing: 'Starting from ₹12,500',
    summary: 'Tell us where you\'re going, and we\'ll help you figure out what to wear. From Bangalore garden weddings and bridal trousseau curations to dates and galas.',
    points: [
      'Weddings: Bridal trousseau & bridesmaid curations',
      'Garden wedding guest & cocktail drapes',
      'Date nights & anniversary dinners',
      'Vacations & resort wardrobes',
      'Special milestone events',
    ],
    image: '/images/includes/IMG_1754.JPG.jpeg',
  },
  {
    num: '05',
    category: 'Professional Identity',
    title: 'Workwear & Tech Leadership Styling',
    pricing: 'Starting from ₹15,000',
    summary: 'Build an executive work wardrobe that feels polished, confident, comfortable, and authentically yours. Tailored for Bangalore tech leads, founders, and corporate directors.',
    points: [
      'Executive workwear & smart casual leadership dressing',
      'Business casual & elevated professional looks for tech hubs',
      'Corporate dressing for key investor pitch meetings',
      'Important meetings & first impressions',
    ],
    image: '/images/includes/IMG_8863.JPG.jpeg',
  },
];

const categories = [
  {
    label: 'EVERYDAY',
    items: ['Everyday Style', 'Casual & Weekend', 'Corporate & Workwear', 'Business & Formal'],
  },
  {
    label: 'CELEBRATIONS',
    items: ['Weddings', 'Bridesmaid', 'Bridal', 'Engagement', 'Indian Festive', 'Ethnic & Traditional', 'Parties'],
  },
  {
    label: 'LIFE & TRAVEL',
    items: ['Vacation', 'Resort', 'Travel', 'Date Night', 'Special Occasions'],
  },
  {
    label: 'YOUR STYLE',
    items: ['Wardrobe Refresh', 'Personal Shopping', 'Petite & Tall', 'Plus-Size', 'Maternity'],
  },
];

// ── COMPONENT ────────────────────────────────────────────────────────────────

export function ServicesContent({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const { openLightbox } = useLightbox();
  const [expandedMobileServices, setExpandedMobileServices] = useState<Record<string, boolean>>({});

  const toggleMobileService = (num: string) => {
    setExpandedMobileServices((prev: Record<string, boolean>) => ({ ...prev, [num]: !prev[num] }));
  };

  return (
    <div className={isEmbedded ? "" : "min-h-screen bg-[#FAF9F6] text-[#1A1A1A]"}>
      {!isEmbedded && <Navigation />}

      {/* ── TOP HERO HEADER (MINIMALIST TYPOGRAPHY) ── */}
      <section className="pt-36 sm:pt-44 pb-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/10">
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-light text-black/50 font-sans font-semibold">
              WHAT WE DO
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] text-[#1A1A1A]">
            Style that feels like you.
          </h1>

          <div className="mt-4 space-y-4 text-xs sm:text-base lg:text-lg font-sans font-light text-black/75 leading-relaxed">
            <p>
              We believe personal style isn't about following every trend or constantly buying something new. It's about understanding what makes you feel confident, comfortable, and completely yourself.
            </p>
            
            {/* Highlighted Core Commitment Card */}
            <div className="mt-6 p-5 sm:p-8 bg-[#EFECE6] border-l-4 border-[#1A1A1A] rounded-xs shadow-xs">
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-black/50 block mb-2 font-bold">
                OUR CORE COMMITMENT
              </span>
              <p className="font-serif text-base sm:text-xl lg:text-2xl font-light italic text-[#1A1A1A] leading-snug">
                "At Style with J, we help you discover your personal style, create looks that work for your real life, and build a wardrobe that works for you."
              </p>
            </div>

            {/* Categories Page Link Button Box */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-3 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#1A1A1A] text-white text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-mono font-medium hover:bg-black transition-all shadow-md rounded-xs w-full sm:w-auto text-center"
              >
                Explore Styling Categories
                <span className="text-xs">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 PILLARS ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12 sm:py-16">
        <div className="mb-8 sm:mb-12">
          <span className="text-[8px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.5em] uppercase font-light text-[#1A1A1A]/50 font-sans block mb-2 font-semibold">
            OUR APPROACH
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1A1A]">
            Three Pillars of Great Style
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {pillars.map((p) => (
            <div key={p.num} className="bg-[#FAF8F3] p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-5 sm:gap-6 border border-black/10 hover:border-black/30 transition-all rounded-xs shadow-xs">
              <div>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <span className="font-mono text-xs tracking-widest text-[#1A1A1A]/50">{p.num}</span>
                  <div className="flex-1 h-[1px] bg-[#1A1A1A]/10" />
                </div>
                
                <h3 className="font-sans text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#1A1A1A]/70 font-semibold mb-2 sm:mb-3">
                  {p.title}
                </h3>
                
                <p className="font-serif text-lg sm:text-xl lg:text-2xl font-light leading-snug text-[#1A1A1A] mb-3 sm:mb-4">
                  {p.headline}
                </p>
                
                <p className="font-sans text-xs sm:text-sm font-light text-[#1A1A1A]/80 leading-relaxed">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DETAILED SERVICES BREAKDOWN (SECTION HEADING + CLEAN PICTURES WITHOUT CAPTIONS ON TOP) ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div className="border-t border-[#1A1A1A]/10 pt-16 mb-12">
          <span className="text-[9px] tracking-[0.5em] uppercase font-light text-[#1A1A1A]/40 font-sans block mb-2 font-semibold">
            HOW WE CAN HELP
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1A1A]">
            Our Services
          </h2>
        </div>

        {/* MOBILE LAYOUT: FULL-BLEED IMAGES WITH IN-DEPTH DETAILS BETWEEN EACH IMAGE */}
        <div className="flex flex-col lg:hidden divide-y divide-black/15 -mx-6 sm:-mx-12">
          {servicesList.map((svc) => (
            <div key={svc.num} className="flex flex-col bg-[#FAF9F6]">
              {/* Full Bleed Image (Touch Left & Right Edges) */}
              <div
                onClick={() => openLightbox(svc.image, svc.title, {
                  num: svc.num,
                  category: svc.category,
                  story: `${svc.summary} — Key Highlights: ${svc.points.join(' • ')}`,
                  concept: svc.title,
                  fabric: svc.points.join(' • ')
                })}
                className="relative w-full h-[70vh] min-h-[420px] bg-[#0D0D0D] overflow-hidden cursor-pointer group flex-shrink-0"
                title="Click to view image in high-res"
              >
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>

              {/* Service Detailed Writing Panel Between/Under the Image */}
              <div className="px-6 sm:px-8 py-8 bg-[#FAF8F3] flex flex-col gap-4 border-b border-black/10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/50 font-bold">
                    ✦ SERVICE {svc.num}
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-black/70 bg-[#EFECE6] px-2.5 py-1 border border-black/10 rounded-xs font-semibold">
                    {svc.pricing}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
                  {svc.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm font-light text-black/80 leading-relaxed">
                  {svc.summary}
                </p>

                {/* Key Points Checklist */}
                <div className="pt-3 border-t border-black/10 flex flex-col gap-2.5">
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-black/50 font-bold">
                    WHAT THIS INCLUDES:
                  </span>
                  <div className="flex flex-col gap-2">
                    {svc.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 font-sans text-xs text-black/85 font-light leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/40 mt-1 flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="pt-4 flex items-center justify-between border-t border-black/10 gap-4">
                  <button
                    onClick={() => openLightbox(svc.image, svc.title, {
                      num: svc.num,
                      category: 'Our Services',
                      story: `${svc.summary} — Key Highlights: ${svc.points.join(' • ')}`,
                      concept: svc.title,
                      fabric: svc.points.join(' • ')
                    })}
                    className="font-mono text-[9px] tracking-[0.2em] uppercase text-black font-semibold hover:opacity-70 transition-opacity"
                  >
                    View Lightbox
                  </button>

                  <Link
                    href="/connect"
                    className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-white font-mono text-[8px] tracking-[0.25em] uppercase font-semibold rounded-xs shadow-xs transition-colors"
                  >
                    Book Session →
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* DESKTOP LAYOUT (lg:flex) */}
        <div className="hidden lg:flex flex-col divide-y divide-[#1A1A1A]/10">
          {servicesList.map((svc) => (
            <div
              key={svc.num}
              className="group grid grid-cols-12 gap-8 py-16 hover:bg-[#F5F3EF] -mx-12 px-12 transition-colors duration-300 items-center"
            >
              {/* COVER IMAGE */}
              <div className="col-span-5 order-2 flex items-center justify-center">
                <div 
                  onClick={() => openLightbox(svc.image, svc.title, {
                    num: svc.num,
                    category: 'Our Services',
                    story: `${svc.summary} — Key Highlights: ${svc.points.join(' • ')}`,
                    concept: svc.title,
                    fabric: svc.points.join(' • ')
                  })}
                  className="relative w-full h-[700px] min-h-[520px] aspect-[3/4] overflow-hidden bg-[#0D0D0D] border border-black/10 shadow-md group-hover:scale-[1.02] transition-transform duration-500 rounded-xs cursor-pointer z-10"
                  title="Click to view image details"
                >
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xs text-[8px] tracking-[0.3em] uppercase font-mono font-semibold border border-white/10">
                    ✦ SERVICE {svc.num}
                  </div>
                </div>
              </div>

              {/* WRITINGS & DETAILS */}
              <div className="col-span-7 order-1 flex flex-col justify-center gap-4">
                <div className="flex items-center justify-between max-w-xl">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/45 font-bold block">
                    ✦ SERVICE {svc.num}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-black/70 bg-[#EFECE6] px-3 py-1 border border-black/10 rounded-xs font-semibold">
                    {svc.pricing}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tracking-widest text-[#1A1A1A]/40">/{svc.num}</span>
                  <h3 className="font-serif text-4xl font-light tracking-wide text-[#1A1A1A] uppercase">
                    {svc.title}
                  </h3>
                </div>

                <p className="text-sm font-sans font-light text-[#1A1A1A]/80 leading-relaxed max-w-xl">
                  {svc.summary}
                </p>

                {/* Bullets */}
                <div className="pt-2">
                  <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-black/50 block mb-3 font-semibold">
                    Key Highlights:
                  </span>
                  <ul className="grid grid-cols-2 gap-2.5">
                    {svc.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs font-sans text-black/80 font-light bg-white/70 p-2.5 border border-black/5 rounded-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/40 flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3">
                  <Link
                    href="/connect"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-[9px] tracking-[0.25em] uppercase font-mono font-semibold hover:bg-black transition-all rounded-xs shadow-sm"
                  >
                    Book Consultation →
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES (WHAT CAN I STYLE FOR YOU?) ── */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-20 py-12 sm:py-24 border-t border-black/10">
        <div className="mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
          <span className="text-[8px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.5em] uppercase font-light text-[#1A1A1A]/50 font-sans block mb-2 sm:mb-3 font-semibold">
            CATEGORIES
          </span>
          <h2 className="font-serif text-xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A]">
            What Can I <span className="italic text-black/50">Style</span> For You?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.label} 
              className="bg-[#EFECE6] p-4 sm:p-6 lg:p-8 border border-black/10 flex flex-col gap-3 sm:gap-4 shadow-xs rounded-xs hover:border-black/30 transition-all h-full"
            >
              <div className="border-b border-black/10 pb-2.5 sm:pb-3 flex items-center justify-between">
                <h3 className="font-sans text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase font-bold text-[#1A1A1A]">
                  {cat.label}
                </h3>
                <span className="font-mono text-[8px] sm:text-[9px] text-black/40 font-semibold">({cat.items.length})</span>
              </div>
              <div className={cat.items.length > 5 ? "grid grid-cols-2 sm:grid-cols-1 gap-1.5 sm:gap-2.5" : "flex flex-col gap-1.5 sm:gap-2.5"}>
                {cat.items.map((item) => (
                  <span key={item} className="font-sans text-[8px] sm:text-xs tracking-normal sm:tracking-wide text-[#1A1A1A]/85 font-light flex items-center gap-1.5 sm:gap-2 leading-tight">
                    <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-black/35 flex-shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── READY TO FIND YOUR STYLE CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-20 py-12 sm:py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-10 bg-[#EFECE6] p-6 sm:p-12 lg:p-14 border border-black/10 shadow-xs rounded-xs">
          <div className="text-left max-w-xl">
            <span className="text-[8px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.5em] uppercase font-semibold text-[#1A1A1A]/50 font-sans block mb-2">
              READY TO FIND YOUR STYLE?
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-light tracking-tight text-[#1A1A1A] leading-tight">
              Let's create a wardrobe that feels as good as it looks.
            </h3>
          </div>
          <Link
            href="/connect"
            className="group flex items-center justify-center gap-4 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#1A1A1A] hover:bg-black text-white text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-mono font-medium transition-all shadow-md flex-shrink-0 w-full md:w-auto rounded-xs cursor-pointer border border-white/10"
          >
            Start Your Style Journey
            <span className="transform group-hover:translate-x-1.5 transition-transform text-xs sm:text-sm">→</span>
          </Link>
        </div>
      </section>

      {!isEmbedded && <AtelierFooter />}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-[10px] tracking-[0.4em] uppercase font-light text-[#1A1A1A]/40">Loading...</div>
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}
