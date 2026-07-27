'use client';
import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';

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
    title: 'Personal Styling',
    summary: 'Discover and define your personal style with looks tailored to your personality, lifestyle, comfort, preferences, and the way you want to show up in the world.',
    points: [
      'Discover your personal style',
      'Understand what silhouettes, colours, and fits work for you',
      'Create outfits that suit your personality and lifestyle',
      'Feel comfortable and confident in what you wear',
    ],
    image: '/images/img18.jpeg',
  },
  {
    num: '02',
    title: 'Wardrobe Styling',
    summary: 'Make your existing wardrobe work harder. We\'ll help you rediscover pieces you\'ve forgotten, create fresh outfit combinations, identify what\'s missing, and make your wardrobe feel new again.',
    points: [
      'Comprehensive wardrobe assessment',
      'Identifying what works and what doesn\'t',
      'Styling existing pieces in new ways',
      'Creating multiple looks from the same wardrobe',
      'Identifying key wardrobe gaps & building an intentional closet',
    ],
    image: '/images/img19.jpeg',
  },
  {
    num: '03',
    title: 'Personal Shopping / Curated Shopping',
    summary: 'Shop with intention through curated recommendations that fit your personal style, lifestyle, needs, and budget, so you spend less time searching and more time finding pieces that truly work for you.',
    points: [
      'Personalised shopping recommendations',
      'Curated pieces based on individual style',
      'Shopping according to budget',
      'Helping clients avoid unnecessary purchases',
      'Finding pieces that work with what you already own',
    ],
    image: '/images/img20.jpeg',
  },
  {
    num: '04',
    title: 'Occasion Styling',
    summary: 'Tell us where you\'re going, and we\'ll help you figure out what to wear. From celebrations to casual outings, we curate the perfect look for every event.',
    points: [
      'Weddings: Bridesmaids, bridal & ethnic styling',
      'Parties & evening events',
      'Date nights & romantic dinners',
      'Vacations & getaway wardrobes',
      'Birthdays & milestone celebrations',
      'Special events & casual occasion styling',
    ],
    image: '/images/img21.jpeg',
  },
  {
    num: '05',
    title: 'Work & Professional Styling',
    summary: 'Build a work wardrobe that feels polished, confident, comfortable, and authentically yours. From everyday office looks to important meetings and first impressions, we\'ll help you dress for the way you want to show up.',
    points: [
      'Office wardrobe & everyday executive dressing',
      'Business casual & elevated professional looks',
      'Corporate dressing & key presentations',
      'Important meetings & first-impression styling',
      'Transitioning into a new job or senior leadership role',
    ],
    image: '/images/img22.jpeg',
  },
  {
    num: '06',
    title: 'Styling for Comfort',
    tagline: 'HEART OF WHAT WE DO',
    summary: 'We don\'t believe you need to sacrifice comfort to look stylish. We help you find clothes and looks that make you feel confident, comfortable, and completely yourself.',
    points: [
      'Zero-sacrifice comfort styling',
      'Fits and fabrics tailored to your physical ease',
      'Effortless dressing for daily confidence',
      'Style that feels like you, only better',
    ],
    image: '/images/img23.jpeg',
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
  return (
    <div className={isEmbedded ? "" : "min-h-screen bg-[#FAF9F6] text-[#1A1A1A]"}>
      {!isEmbedded && <Navigation />}

      {/* ── TOP HERO HEADER (MINIMALIST TYPOGRAPHY) ── */}
      <section className="pt-36 sm:pt-44 pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/10">
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-light text-black/50 font-sans">
              WHAT WE DO
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] text-[#1A1A1A]">
            Shop Smarter.<br />
            <span className="italic font-normal text-black/60">Style Better.</span>
          </h1>

          <div className="mt-4 space-y-4 text-base sm:text-lg font-sans font-light text-black/75 leading-relaxed">
            <p>
              We believe that great style isn't about constantly buying more. It's about shopping smarter—investing in pieces that work for you, complement what you already own, and make your wardrobe more versatile.
            </p>
            <p>
              Whether you're refreshing your wardrobe or simply looking for new ways to style what you already have, our approach is all about making thoughtful choices that feel good, look good, and work for your real life.
            </p>
            <p className="font-serif text-xl sm:text-2xl font-light italic text-[#1A1A1A] pt-2">
              “Because looking your best isn't about having more clothes. It's about knowing what to do with the right ones.”
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR FOUNDATION ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto bg-[#EFECE6] my-12 border border-black/5">
        <div className="max-w-3xl flex flex-col gap-4">
          <span className="text-[9px] tracking-[0.4em] uppercase font-sans font-light text-black/40">
            OUR FOUNDATION
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-light text-black">
            Style that feels like you.
          </h2>
          <p className="font-sans text-sm sm:text-base font-light text-black/75 leading-relaxed">
            We believe personal style isn't about following every trend or constantly buying something new. It's about understanding what makes you feel confident, comfortable, and completely yourself. At Style with J, we help you discover your personal style, create looks that work for your real life, and build a wardrobe that works for you.
          </p>
        </div>
      </section>

      {/* ── 3 PILLARS ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12">
        <div className="mb-10">
          <span className="text-[9px] tracking-[0.5em] uppercase font-light text-[#1A1A1A]/40 font-sans block mb-2">
            OUR APPROACH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A]">
            Three Pillars of Great Style
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5E2DC]">
          {pillars.map((p) => (
            <div key={p.num} className="bg-[#FAF9F6] p-8 lg:p-10 flex flex-col justify-between gap-6 border border-black/5 hover:border-black/20 transition-colors">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-xs tracking-widest text-[#1A1A1A]/40">{p.num}</span>
                  <div className="flex-1 h-[1px] bg-[#1A1A1A]/10" />
                </div>
                
                <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-[#1A1A1A]/60 font-medium mb-3">
                  {p.title}
                </h3>
                
                <p className="font-serif text-xl sm:text-2xl font-light leading-snug text-[#1A1A1A] mb-4">
                  {p.headline}
                </p>
                
                <p className="font-sans text-xs sm:text-sm font-light text-[#1A1A1A]/75 leading-relaxed">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DETAILED SERVICES BREAKDOWN (WITH IMAGE PER SERVICE) ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div className="border-t border-[#1A1A1A]/10 pt-16 mb-12">
          <span className="text-[9px] tracking-[0.5em] uppercase font-light text-[#1A1A1A]/40 font-sans block mb-2">
            HOW WE CAN HELP
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1A1A]">
            Our Services
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[#1A1A1A]/10">
          {servicesList.map((svc) => (
            <div
              key={svc.num}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 lg:py-16 hover:bg-[#F5F3EF] -mx-6 sm:-mx-12 px-6 sm:px-12 transition-colors duration-300 items-center"
            >
              {/* Number */}
              <div className="lg:col-span-1 flex items-start pt-1">
                <span className="font-mono text-xs tracking-widest text-[#1A1A1A]/40">{svc.num}</span>
              </div>

              {/* Service Info & Bullets */}
              <div className="lg:col-span-7 flex flex-col justify-center gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-[#1A1A1A]">
                    {svc.title}
                  </h3>
                  {svc.tagline && (
                    <span className="bg-[#1A1A1A] text-white text-[7px] tracking-[0.25em] uppercase px-2 py-0.5 font-sans">
                      {svc.tagline}
                    </span>
                  )}
                </div>

                <p className="text-sm font-sans font-light text-[#1A1A1A]/75 leading-relaxed max-w-xl">
                  {svc.summary}
                </p>

                {/* Bullets */}
                <div className="pt-2">
                  <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-black/40 block mb-3">
                    Key Focus Areas:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {svc.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs font-sans text-black/75 font-light bg-white/60 p-2.5 border border-black/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/50 flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Service Image Card */}
              <div className="lg:col-span-4 flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
                <div className="relative w-full max-w-[280px] aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-[#EFECE6] border border-black/5 shadow-md group-hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[7px] tracking-[0.3em] uppercase font-sans text-black">
                    SERVICE // {svc.num}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES GRID ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 border-t border-black/10">
        <div className="mb-12">
          <span className="text-[9px] tracking-[0.5em] uppercase font-light text-[#1A1A1A]/40 font-sans block mb-2">
            CATEGORIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A]">
            What Can I Style For You?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E5E2DC]">
          {categories.map((cat) => (
            <div key={cat.label} className="bg-[#FAF9F6] p-8 border border-black/5 flex flex-col gap-4 hover:bg-[#F0EDE7] transition-colors">
              <div className="border-b border-black/10 pb-3">
                <h3 className="font-sans text-xs tracking-[0.25em] uppercase font-medium text-[#1A1A1A]">
                  {cat.label}
                </h3>
              </div>
              <div className="flex flex-col gap-2.5">
                {cat.items.map((item) => (
                  <span key={item} className="font-sans text-xs tracking-wide text-[#1A1A1A]/75 font-light flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-black/40 flex-shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── READY TO FIND YOUR STYLE CTA ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div className="border-t border-[#1A1A1A]/10 pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 bg-[#EFECE6] p-10 sm:p-14 border border-black/5">
          <div>
            <span className="text-[9px] tracking-[0.5em] uppercase font-light text-[#1A1A1A]/40 font-sans block mb-2">
              READY TO FIND YOUR STYLE?
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-light tracking-wide text-black">
              Let's create a wardrobe that feels as good as it looks.
            </h3>
          </div>
          <Link
            href="/connect"
            className="group flex items-center gap-6 px-8 py-4 bg-[#1A1A1A] text-white text-[10px] tracking-[0.3em] uppercase font-light hover:bg-black transition-all shadow-lg flex-shrink-0"
          >
            Start Your Style Journey
            <span className="transform group-hover:translate-x-2 transition-transform text-sm">→</span>
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
