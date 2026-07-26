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
    image: '/images/img04.jpeg',
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
    image: '/images/img05.jpeg',
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
    image: '/images/img07.jpeg',
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
    image: '/images/img06.jpeg',
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
    image: '/images/img08.jpeg',
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

      {/* ── 1. TYPOGRAPHIC PURE HEADER (NO PICTURE) ── */}
      <header className="pt-32 pb-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/10">
        <span className="font-sans text-[10px] tracking-[0.6em] uppercase text-black/40 block mb-4 font-semibold">
          ✦ JOURNAL
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-none text-black">
          Style, decoded.
        </h1>
        <p className="font-serif text-lg sm:text-xl lg:text-2xl text-black/55 font-light italic leading-relaxed mt-6 max-w-3xl">
          A space for styling advice, wardrobe inspiration, smart shopping, and everything in between.
        </p>
      </header>

      <main className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto py-16">

        {/* ── 2. EDITORIAL SUB-SECTIONS LEDGER ── */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {edits.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 border border-black/10 hover:border-black bg-[#FAF9F6] transition-all duration-300 flex flex-col justify-between min-h-[140px]"
              >
                <span className="font-mono text-[9px] text-black/30 font-bold block mb-4">
                  0{idx + 1}
                </span>
                <div>
                  <h4 className="font-sans text-xs tracking-widest font-semibold text-black uppercase mb-2">
                    {item.label}
                  </h4>
                  <p className="text-[10px] text-black/55 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. DETAILED TOPICS & FEATURED ARTICLES ── */}
        <section className="space-y-24 mb-32">
          <div>
            <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-black/45 block mb-10 font-semibold">
              ✦ EDITORIAL DIRECTORY
            </span>
          </div>

          {topics.map((topic, index) => (
            <div 
              key={topic.num}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start border-t border-black/10 pt-12 first:border-0 first:pt-0"
            >
              {/* Left Column: Featured Article teaser with Image */}
              <div className="col-span-12 lg:col-span-5 flex flex-col items-start gap-5">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-black/40 font-semibold">
                  {topic.num} — {topic.category}
                </span>

                {/* Category Cover Image */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#EFECE6] border border-black/5 shadow-sm">
                  <img
                    src={topic.image}
                    alt={topic.category}
                    className="absolute inset-0 w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-700 ease-out"
                    draggable="false"
                  />
                </div>
                
                <div className="bg-[#EFECE6] p-8 border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.015)] w-full">
                  <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-black/40 block mb-4 font-bold">
                    [ FEATURED TOPIC READ ]
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light italic leading-snug text-black mb-6">
                    "{topic.featuredTitle}"
                  </h3>
                  <span className="font-sans text-[8px] tracking-[0.25em] text-black/45 uppercase border-b border-black/25 pb-0.5 font-medium">
                    Topic Active
                  </span>
                </div>
              </div>

              {/* Right Column: Bullets list of sample topics */}
              <div className="col-span-12 lg:col-span-7">
                <span className="font-mono text-[9px] tracking-[0.3em] text-black/35 uppercase block mb-6 font-semibold">
                  DECODED INSIGHTS // SAMPLES
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {topic.items.map((item, bulletIdx) => (
                    <li 
                      key={bulletIdx}
                      className="flex items-start gap-3 text-xs text-black/75 font-sans font-light leading-relaxed group cursor-default"
                    >
                      <span className="text-black/30 mt-0.5 select-none font-mono">•</span>
                      <span className="group-hover:text-black transition-colors duration-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* ── 4. WHAT CAN I STYLE FOR YOU? DIRECTORY ── */}
        <section className="border-t border-black/15 pt-20 pb-16">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-black/40 block mb-4 font-semibold">
              ✦ STYLING LEDGER
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-black">
              What Can I <span className="italic text-black/40">Style</span> For You?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {styleCategories.map((category, idx) => (
              <div 
                key={idx}
                className="bg-[#EFECE6] p-8 border border-black/5 flex flex-col gap-6"
              >
                <h4 className="font-sans text-[10px] tracking-[0.3em] font-bold text-black uppercase border-b border-black/10 pb-3">
                  {category.title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {category.items.map((sub, subIdx) => (
                    <li 
                      key={subIdx}
                      className="text-xs font-sans font-light text-black/70 flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-black/15 flex-shrink-0" />
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </main>

      <AtelierFooter />
    </div>
  );
}
