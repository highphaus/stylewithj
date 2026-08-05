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

        {/* 7. Tactile Wall */}
        <LookbookHorizon />
       
        {/* ── 8. BLOG SECTION (STYLE DECODED) ── */}
        <section className="bg-[#FAF9F6] border-t border-black/15 py-16 sm:py-32 px-4 sm:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
            
            {/* Left intro box */}
            <div className="col-span-12 lg:col-span-5 text-left flex flex-col justify-center items-start border-b lg:border-b-0 pb-8 lg:pb-0 border-black/10">
              <span className="font-sans text-[10px] tracking-[0.4em] text-black/50 block mb-3 uppercase font-semibold">
                ✦ BLOG
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl font-light tracking-tight leading-tight mb-4 text-[#1A1A1A]">
                Style, decoded.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-black/65 leading-relaxed font-light mb-6 max-w-sm">
                A space for styling advice, wardrobe inspiration, smart shopping, and everything in between.
              </p>
              <Link
                href="/journal"
                className="font-mono text-[9px] tracking-[0.25em] text-black hover:text-black/60 uppercase border-b border-black pb-1 transition-colors font-semibold"
              >
                Explore the Blog →
              </Link>
            </div>

            {/* Right articles list - Mobile: Full-Width Editorial Cover Cards / Desktop: Sleek List */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-8 sm:gap-6">
              {[
                { num: '01', title: '7 Styling Rules That Will Instantly Elevate Your Everyday Looks', category: 'The Style Edit', image: '/images/includes/IMG_0330.JPG.jpeg' },
                { num: '02', title: "You Don't Need More Clothes. You Need Better Outfits.", category: 'The Wardrobe Edit', image: '/images/includes/IMG_8857.JPG.jpeg' },
                { num: '03', title: 'How to Look Expensive Without Spending a Fortune', category: 'The Expensive Edit', image: '/images/includes/IMG_9158.JPG.jpeg' }
              ].map((article) => (
                <div
                  key={article.num}
                  className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 border border-black/10 bg-white/70 hover:bg-[#EFECE6]/40 transition-all duration-500 rounded-xs shadow-xs"
                >
                  {/* Image Frame (Click to View Lightbox) */}
                  <div 
                    onClick={() => openLightbox(article.image, article.title)}
                    className="relative w-full sm:w-32 h-[70vh] sm:h-auto sm:aspect-[3/4] overflow-hidden bg-[#0D0D0D] border border-black/10 cursor-pointer rounded-xs flex-shrink-0"
                    title="Click to view image"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      draggable="false"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between gap-3 pt-2 sm:pt-0">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[9px] text-black/40 font-bold">/{article.num}</span>
                        <div className="w-1 h-1 rounded-full bg-black/20" />
                        <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-black/50 font-semibold">{article.category}</span>
                      </div>
                      <h4 className="font-serif text-xl sm:text-xl text-black font-light leading-snug group-hover:text-black/70 transition-colors">
                        {article.title}
                      </h4>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-black/5">
                      <Link
                        href="/journal"
                        className="font-mono text-[9px] tracking-[0.2em] uppercase text-black font-semibold hover:opacity-60 transition-opacity"
                      >
                        Read Article →
                      </Link>
                      <button
                        onClick={() => openLightbox(article.image, article.title)}
                        className="font-mono text-[9px] text-black/40 hover:text-black uppercase"
                      >
                        Zoom 🔍
                      </button>
                    </div>
                  </div>
                </div>
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