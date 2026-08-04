'use client';

import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection'; 
import CinematicPhilosophy from '@/components/sections/CinematicPhilosophy';
import AudienceGrid from '@/components/AudienceGrid';
import ServicesGrid from '@/components/ServicesGrid';
import Transformations from '@/components/Transformations';
import MeetSection from '@/components/MeetSection';
import InfiniteMarquee from '@/components/sections/InfiniteMarquee';
import AtelierFooter from '@/components/sections/AtelierFooter';
import Navigation from '@/components/Navigation';
import { useLightbox } from '@/components/ImageLightbox';

// Template showcase components
import SplitScroll from '@/components/sections/SplitScroll';
import LookbookHorizon from '@/components/sections/LookbookHorizon';

export default function Home() {
  const { openLightbox } = useLightbox();
  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] min-h-screen font-sans antialiased selection:bg-black selection:text-white">
      <Navigation />
      
      {/* 1. Hero */}
      <div id="hero" />
      <HeroSection />
      
      {/* 1.5. Brand Intro Split Section */}
      <AboutSection />

      <main className="relative z-20">
        {/* 2. The Philosophy */}
        <CinematicPhilosophy />

        {/* 3. Who We Accompany */}
        <AudienceGrid />

        {/* 4. What We Do (Services) */}
        <ServicesGrid />

        {/* 4.5. The Horizon Silhouettes (Curated Category Silhouettes) */}
        <SplitScroll />

        {/* 5. Transformations */}
        <div id="transformations" />
        <Transformations />

        {/* 6. Testimonials */}
        <div id="testimonials" />
        <InfiniteMarquee />




        {/* --- All remaining sections --- */}
        <LookbookHorizon />
       
        {/* ── 8. JOURNAL SECTION ── */}
        <section className="bg-[#FAF9F6] border-t border-black/5 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left intro box */}
            <div className="col-span-12 lg:col-span-5 text-left flex flex-col justify-center items-start">
              <span className="font-sans text-[10px] tracking-[0.4em] text-black/45 block mb-4 uppercase font-semibold">
                ✦ JOURNAL
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl font-light tracking-tight leading-tight mb-4 text-[#1A1A1A]">
                Style, decoded.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-black/55 leading-relaxed font-light mb-8 max-w-sm">
                A space for styling advice, wardrobe inspiration, smart shopping, and everything in between.
              </p>
              <Link
                href="/journal"
                className="font-mono text-[9px] tracking-[0.25em] text-black hover:text-black/60 uppercase border-b border-black pb-1 transition-colors"
              >
                Explore the Journal →
              </Link>
            </div>

            {/* Right articles list with pictures */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
              {[
                { num: '01', title: '7 Styling Rules That Will Instantly Elevate Your Everyday Looks', category: 'The Style Edit', image: '/images/includes/IMG_0330.JPG.jpeg' },
                { num: '02', title: "You Don't Need More Clothes. You Need Better Outfits.", category: 'The Wardrobe Edit', image: '/images/includes/IMG_8857.JPG.jpeg' },
                { num: '03', title: 'How to Look Expensive Without Spending a Fortune', category: 'The Expensive Edit', image: '/images/includes/IMG_9158.JPG.jpeg' }
              ].map((article) => (
                <Link
                  key={article.num}
                  href="/journal"
                  className="group flex gap-5 items-center p-4 border border-black/5 hover:border-black/20 bg-white/50 hover:bg-[#EFECE6]/30 transition-all duration-500 rounded-sm shadow-[0_4px_25px_rgba(0,0,0,0.01)]"
                >
                  {/* Small Editorial Image Frame (Click to Pick) */}
                  <div 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openLightbox(article.image, article.title);
                    }}
                    className="relative w-20 sm:w-24 aspect-[3/4] overflow-hidden bg-[#EFECE6] flex-shrink-0 border border-black/5 cursor-pointer z-10"
                    title="Click to view image"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      draggable="false"
                    />
                  </div>

                  {/* Text details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[9px] text-black/35 group-hover:text-black">/{article.num}</span>
                      <div className="w-1 h-1 rounded-full bg-black/15" />
                      <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-black/40 font-semibold">{article.category}</span>
                    </div>
                    <h4 className="font-serif text-base sm:text-lg text-black/85 group-hover:text-black transition-colors leading-snug font-light">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. STYLE JOURNEY CTA SECTION ── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-[#EFECE6] p-10 sm:p-16 border border-black/5 shadow-[0_10px_35px_rgba(0,0,0,0.02)]">
            <div className="text-left">
              <span className="text-[9px] tracking-[0.5em] uppercase font-light text-[#1A1A1A]/40 font-sans block mb-3 font-semibold">
                READY TO FIND YOUR STYLE?
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-light tracking-wide text-black max-w-xl leading-tight">
                Let's create a wardrobe that feels as good as it looks.
              </h3>
            </div>
            <Link
              href="/connect"
              className="group flex items-center gap-6 px-8 py-4.5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.3em] uppercase font-light hover:bg-black transition-all shadow-lg flex-shrink-0 rounded-none border border-white/5"
            >
              Start Your Style Journey
              <span className="transform group-hover:translate-x-1.5 transition-transform text-sm">→</span>
            </Link>
          </div>
        </section>

      </main>

      <AtelierFooter />
    </div>
  );
}