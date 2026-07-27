'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';

export function AboutContent() {
  return (
    <>
      {/* ── EDITORIAL HEADER ── */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/10">
        <div className="flex flex-col items-start gap-4">
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-semibold text-black/60 font-sans">
              About Me
            </span>
          </div>

          <h1 className="font-serif text-[22px] min-[360px]:text-[25px] sm:text-6xl md:text-7xl font-light tracking-tight leading-snug sm:leading-[1.1] text-[#1A1A1A] max-w-4xl mt-2">
            <span className="block font-light">Clothes caught my eye.</span>
            <span className="block italic font-normal text-black/60 mt-1 sm:mt-2">Style caught my heart.</span>
          </h1>

        </div>
      </section>

      {/* ── MAIN STORY SECTION ── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Portrait & Archival Details */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-28">
            <div className="relative aspect-[3/4] w-full bg-[#EAE8E3] overflow-hidden shadow-2xl border border-black/5">
              <Image
                src="/images/img01.jpeg"
                alt="Jennifer — Founder of Style with J"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 border border-black/5">
                <span className="text-[8px] tracking-[0.3em] uppercase block text-black/50 font-sans">CREATIVE DIRECTOR</span>
                <span className="font-serif text-xs text-black">Jennifer</span>
              </div>
            </div>

            <div className="mt-6 p-6 bg-[#EFECE6] border border-black/5 flex flex-col gap-2">
              <span className="text-[8px] tracking-[0.3em] uppercase text-black/40 font-sans">OUR PHILOSOPHY</span>
              <p className="font-serif text-sm italic text-black/80">
                “Style is personal. It should fit you — your personality, your lifestyle, your comfort, and the way you want to show up in the world.”
              </p>
            </div>
          </div>

          {/* Right Column: Full Story Text */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-base sm:text-lg font-sans font-light text-black/80 leading-relaxed">
            
            <p className="text-xl sm:text-2xl font-serif font-light text-black leading-snug">
              I've always believed that getting dressed should feel good—not like a rulebook you have to follow.
            </p>

            <p>
              My journey with styling started through modelling, where I found myself more fascinated by what happened behind the scenes—the outfits, the details, and the way the right look could change how someone carried themselves.
            </p>

            <p>
              As I explored my own style, I learned what made me feel comfortable, confident, and like the best version of myself. That journey led me to start styling friends and people around me, helping them discover what truly suited them. The incredibly positive feedback and seeing how confident and comfortable they felt in their looks gave me the confidence to take this passion further.
            </p>

            <div className="py-4 border-y border-black/10 my-2">
              <span className="font-serif text-xl sm:text-2xl font-light italic text-[#1A1A1A]">
                And that's where Style with J was born.
              </span>
            </div>

            <p>
              I don't believe in dressing people according to trends or forcing them into a version of themselves that doesn't feel natural. Style is personal. It should fit you—your personality, your lifestyle, your comfort, and the way you want to show up in the world.
            </p>

            <p className="font-medium text-black">
              My goal is simple: to help you find a style that feels like you, only better.
            </p>

            <p>
              Because when you're comfortable in what you wear, confidence follows naturally.
            </p>

            <div className="pt-4">
              <span className="font-serif text-xl text-black/70 italic">
                Welcome to Style with J.
              </span>
            </div>

            <div className="pt-6 border-t border-black/10">
              <Link
                href="/services"
                className="group inline-flex items-center gap-6 px-8 py-4 bg-[#1A1A1A] text-white text-[10px] tracking-[0.3em] uppercase font-light hover:bg-black transition-all shadow-md"
              >
                Explore What We Do
                <span className="transform group-hover:translate-x-2 transition-transform text-sm">→</span>
              </Link>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />
      <AboutContent />
      <AtelierFooter />
    </div>
  );
}
