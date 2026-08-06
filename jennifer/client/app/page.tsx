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
        <section className="bg-[#FAF9F6] border-t border-black/15 py-8 sm:py-32 px-2.5 sm:px-12 lg:px-20 max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 w-full min-w-0">
            
            {/* Left intro box */}
            <div className="col-span-12 lg:col-span-5 text-left flex flex-col justify-center items-start border-b lg:border-b-0 pb-4 lg:pb-0 border-black/10 px-1 sm:px-0">
              <h3 className="font-serif text-2xl sm:text-5xl font-light tracking-tight leading-tight mb-2 sm:mb-4 text-[#1A1A1A]">
                Style, decoded.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-black/65 leading-relaxed font-light mb-4 sm:mb-6 max-w-sm">
                A space for styling advice, wardrobe inspiration, smart shopping, and everything in between.
              </p>
              <Link
                href="/blog"
                className="font-mono text-[9px] tracking-[0.25em] text-black hover:text-black/60 uppercase border-b border-black pb-1 transition-colors font-semibold"
              >
                Explore the Blog →
              </Link>
            </div>

            {/* Right articles list - Mobile & Desktop: Clickable Cards */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-3 sm:gap-6 w-full min-w-0">
              {[
                { num: '01', title: '7 Styling Rules That Will Instantly Elevate Your Everyday Looks', category: 'The Style Edit', image: '/images/includes/IMG_0330.JPG.jpeg', slug: 'beyond-hoodies-tech-lead-executive-wardrobe-bangalore' },
                { num: '02', title: "You Don't Need More Clothes. You Need Better Outfits.", category: 'The Wardrobe Edit', image: '/images/includes/IMG_8857.JPG.jpeg', slug: '15-piece-workwear-capsule-wardrobe-bangalore-professionals' },
                { num: '03', title: 'How to Look Expensive Without Spending a Fortune', category: 'The Expensive Edit', image: '/images/includes/IMG_9158.JPG.jpeg', slug: 'how-to-dress-for-bangalore-weather-year-round-style-guide' }
              ].map((article) => (
                <Link
                  key={article.num}
                  href={`/blog/${article.slug}`}
                  className="group flex flex-row items-center sm:items-stretch gap-2.5 sm:gap-6 p-2.5 sm:p-5 border border-black/10 bg-white/70 hover:bg-[#EFECE6]/40 transition-all duration-500 rounded-xs shadow-xs w-full min-w-0 overflow-hidden cursor-pointer"
                >
                  {/* Image Frame */}
                  <div 
                    className="relative w-20 h-20 sm:w-36 sm:h-auto aspect-square sm:aspect-[3/4] overflow-hidden bg-[#0D0D0D] border border-black/10 rounded-xs flex-shrink-0"
                    title="Click to read article"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      draggable="false"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-1.5 py-0.5 overflow-hidden">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 min-w-0">
                        <span className="font-sans text-[8px] tracking-[0.15em] uppercase text-black/50 font-semibold truncate">{article.category}</span>
                      </div>
                      <h4 className="font-serif text-xs sm:text-lg lg:text-xl text-black font-light leading-snug group-hover:text-black/70 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                    </div>

                    <div className="pt-1.5 flex items-center justify-between border-t border-black/5 min-w-0">
                      <span
                        className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-black font-semibold group-hover:opacity-60 transition-opacity truncate"
                      >
                        Read Article →
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          openLightbox(article.image, article.title);
                        }}
                        className="font-mono text-[8px] sm:text-[9px] text-black/40 hover:text-black uppercase flex-shrink-0 ml-2 z-10"
                        title="Zoom image"
                      >
                        Expand
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. STYLE JOURNEY CTA SECTION ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-20 pb-20 sm:pb-28">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-10 bg-[#EFECE6] p-6 sm:p-12 lg:p-16 border border-black/10 shadow-xs rounded-xs">
            <div className="text-left max-w-xl">
              <span className="text-[8px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.5em] uppercase text-black/50 font-sans block mb-2 sm:mb-3 font-semibold">
                READY TO FIND YOUR STYLE?
              </span>
              <h3 className="font-serif text-xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1A1A1A] leading-tight">
                Let's create a wardrobe that feels as good as it looks.
              </h3>
            </div>
            <Link
              href="/connect"
              className="group flex items-center justify-center gap-4 px-6 sm:px-8 py-3.5 sm:py-4.5 bg-[#1A1A1A] hover:bg-black text-white text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-mono font-medium transition-all shadow-md flex-shrink-0 w-full md:w-auto rounded-xs cursor-pointer border border-white/10"
            >
              Start Your Style Journey
              <span className="transform group-hover:translate-x-1.5 transition-transform text-xs sm:text-sm">→</span>
            </Link>
          </div>
        </section>

      </main>

      <AtelierFooter />
    </div>
  );
}