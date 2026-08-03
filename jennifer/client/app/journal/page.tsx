'use client';
import React from 'react';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';
import { motion } from 'framer-motion';

const edits = [
  { label: 'THE STYLE EDIT', desc: 'Personal style | Styling tips | Confidence' },
  { label: 'THE WARDROBE EDIT', desc: 'Wardrobe building | Smart shopping | Outfit ideas' },
  { label: 'THE EXPENSIVE EDIT', desc: 'Look expensive | Budget styling | Elevated dressing' },
  { label: 'THE OCCASION EDIT', desc: 'Work | Weddings | Vacations | Dates | Events' },
  { label: 'STYLE STORIES', desc: 'My journey | Client stories | Behind the scenes' }
];

const topics = [
  {
    num: '01',
    category: 'STYLE 101',
    featuredTitle: '7 Styling Rules That Will Instantly Elevate Your Everyday Looks',
    image: '/images/includes/IMG_3119.JPG.jpeg',
    items: [
      'How to find your personal style',
      'How to dress for your body proportions',
      'How to understand your best silhouettes',
      'How to choose colours that work for you',
      'How to create outfits that look polished',
      'Common styling mistakes',
      'How to make basic outfits look expensive'
    ]
  },
  {
    num: '02',
    category: 'THE WARDROBE EDIT',
    featuredTitle: "You Don't Need More Clothes. You Need Better Outfits.",
    image: '/images/includes/IMG_4485.JPG.jpeg',
    items: [
      'Wardrobe essentials everyone actually needs',
      'How to build a capsule wardrobe',
      'What to keep, what to let go',
      'How to style one piece 5 different ways',
      'How to make your wardrobe feel new without shopping',
      'Pieces worth investing in',
      'What not to spend money on'
    ]
  },
  {
    num: '03',
    category: 'DRESS FOR THE OCCASION',
    featuredTitle: 'What Do I Wear? A No-Stress Guide to Dressing for Any Occasion',
    image: '/images/includes/IMG_5314.JPG.jpeg',
    items: [
      'What to wear to a wedding',
      'What to wear on a first date',
      'Vacation outfit ideas',
      'What to wear to a work event',
      'How to dress for interviews',
      'What to wear for brunch',
      'How to dress for a night out'
    ]
  },
  {
    num: '04',
    category: 'LOOK EXPENSIVE',
    featuredTitle: 'How to Look Expensive Without Spending a Fortune',
    image: '/images/includes/IMG_5315.JPG.jpeg',
    items: [
      'How to look expensive on a budget',
      'Colours that look luxurious',
      'How to make affordable clothes look premium',
      'The importance of fit',
      'Accessories that elevate an outfit',
      'How to create a polished look',
      '5 things that instantly make an outfit look more expensive'
    ]
  },
  {
    num: '05',
    category: 'STYLE STORIES',
    featuredTitle: 'What Styling Other People Has Taught Me About Personal Style',
    image: '/images/includes/IMG_7135.JPG.jpeg',
    items: [
      'Your own style journey',
      'Lessons you\'ve learned from styling people',
      'Client transformations',
      'Styling challenges',
      'Before-and-after stories',
      'Your personal fashion opinions',
      'Behind-the-scenes of Style with J'
    ]
  }
];

const styleCategories = [
  {
    title: 'EVERYDAY',
    items: ['Everyday Style', 'Casual & Weekend', 'Corporate & Workwear', 'Business & Formal']
  },
  {
    title: 'CELEBRATIONS',
    items: ['Weddings', 'Bridesmaid', 'Bridal', 'Engagement', 'Indian Festive', 'Ethnic & Traditional', 'Parties']
  },
  {
    title: 'LIFE & TRAVEL',
    items: ['Vacation', 'Resort', 'Travel', 'Date Night', 'Special Occasions']
  },
  {
    title: 'YOUR STYLE',
    items: ['Wardrobe Refresh', 'Personal Shopping', 'Petite & Tall', 'Plus-Size', 'Maternity']
  }
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />

      {/* ── 1. TYPOGRAPHIC PURE HEADER ── */}
      <header className="pt-32 sm:pt-40 pb-10 sm:pb-16 px-4 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/10">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-2 sm:mb-3 font-semibold">
          JOURNAL
        </span>
        <h1 className="font-serif text-3xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-none text-black">
          Style, decoded.
        </h1>
        <p className="font-serif text-sm sm:text-xl lg:text-2xl text-black/60 font-light italic leading-relaxed mt-3 sm:mt-6 max-w-3xl">
          A space for styling advice, wardrobe inspiration, smart shopping, and everything in between.
        </p>
      </header>

      <main className="px-4 sm:px-12 lg:px-20 max-w-7xl mx-auto py-10 sm:py-20">

        {/* ── 2. EDITORIAL SUB-SECTIONS LEDGER (2-COL MOBILE / 5-COL DESKTOP) ── */}
        <section className="mb-14 sm:mb-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
            {edits.map((item, idx) => (
              <div 
                key={idx}
                className="p-3.5 sm:p-6 border border-black/10 hover:border-black bg-[#FAF8F3] transition-all duration-300 flex flex-col justify-between min-h-[120px] sm:min-h-[150px] rounded-xs shadow-xs"
              >
                <span className="font-mono text-[8px] sm:text-[9px] text-black/35 font-bold block mb-2 sm:mb-3">
                  0{idx + 1}
                </span>
                <div>
                  <h4 className="font-sans text-[10px] sm:text-xs tracking-wider font-semibold text-black uppercase mb-1 leading-snug">
                    {item.label}
                  </h4>
                  <p className="text-[9px] sm:text-[10px] text-black/60 leading-relaxed font-light line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. DETAILED TOPICS & FEATURED ARTICLES ── */}
        <section className="space-y-12 sm:space-y-24 mb-20 sm:mb-32">
          <div className="pb-3 border-b border-black/10">
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-black/50 block font-semibold">
              EDITORIAL DIRECTORY
            </span>
          </div>

          {topics.map((topic) => (
            <div 
              key={topic.num}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start border-t border-black/10 pt-8 sm:pt-14 first:border-0 first:pt-0"
            >
              {/* Left Column: Featured Article teaser with Image */}
              <div className="col-span-12 lg:col-span-5 flex flex-col items-start gap-3.5 sm:gap-5">
                <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-black/50 font-semibold">
                  {topic.num} / {topic.category}
                </span>

                {/* Category Cover Image - Full Bleed Hero Style Cover on Mobile */}
                <div className="relative w-full h-[65vh] sm:h-auto sm:aspect-[4/5] min-h-[380px] overflow-hidden bg-[#0D0D0D] border border-black/5 shadow-md rounded-xs">
                  <img
                    src={topic.image}
                    alt={topic.category}
                    className="absolute inset-0 w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700 ease-out"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
                
                <div className="bg-[#EFECE6] p-4 sm:p-8 border border-black/5 shadow-xs w-full rounded-xs">
                  <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-black/45 block mb-2 sm:mb-3 font-bold">
                    [ FEATURED READ ]
                  </span>
                  <h3 className="font-serif text-base sm:text-2xl font-light italic leading-snug text-black mb-3 sm:mb-4">
                    "{topic.featuredTitle}"
                  </h3>
                  <span className="font-sans text-[8px] tracking-[0.25em] text-black/50 uppercase border-b border-black/25 pb-0.5 font-medium inline-block">
                    Topic Active
                  </span>
                </div>
              </div>

              {/* Right Column: Bullets list of sample topics */}
              <div className="col-span-12 lg:col-span-7">
                <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-black/40 uppercase block mb-4 sm:mb-6 font-semibold">
                  DECODED INSIGHTS / SAMPLES
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-x-6 sm:gap-y-3.5">
                  {topic.items.map((item, bulletIdx) => (
                    <li 
                      key={bulletIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-black/80 font-sans font-light leading-relaxed group cursor-default bg-[#FAF8F3] p-2.5 sm:p-3 border border-black/5 rounded-xs"
                    >
                      <span className="text-black/40 mt-0.5 select-none font-mono text-xs">•</span>
                      <span className="group-hover:text-black transition-colors duration-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

      </main>

      <AtelierFooter />
    </div>
  );
}
