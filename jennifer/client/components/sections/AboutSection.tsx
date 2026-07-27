'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─── Carousel slides for mobile ─────────────────────────────────── */
const slides = [
  { src: '/images/img01.jpeg', alt: 'J. Personal Stylist Portrait' },
  { src: '/images/img05.jpeg', alt: 'Editorial Style Session' },
  { src: '/images/img07.jpeg', alt: 'Fashion Consultation' },
  { src: '/images/img14.jpeg', alt: 'Wardrobe Styling' },
  { src: '/images/img15.jpeg', alt: 'Style Story' },
];

const INTERVAL = 3500;

/* ─── Mobile Carousel ─────────────────────────────────────────────── */
function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, INTERVAL);
  };

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next, paused]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '420px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: idx === current ? 1 : 0, zIndex: idx === current ? 1 : 0 }}
          aria-hidden={idx !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={idx === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/35 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 max-w-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-[1px] bg-white/50" />
          <span className="text-[9px] tracking-[0.4em] uppercase font-light text-white/60">About Me</span>
        </div>
        <h2 className="font-serif text-3xl font-light leading-[1.15] tracking-wide text-white mb-3">
          Hi, I'm J.<br />
          <span className="italic font-normal text-white/80">I style stories.</span>
        </h2>
        <p className="font-sans text-[11px] font-light text-white/70 leading-relaxed mb-3 max-w-[260px]">
          With over 8 years of experience in fashion and image consulting, I help women
          discover their signature style and build wardrobes that are chic, functional and uniquely theirs.
        </p>
        <p className="font-serif text-xs italic text-white/55 leading-snug mb-6 max-w-[240px]">
          "My goal is simple: to make getting dressed the easiest decision of your day."
        </p>
        <Link
          href="/about"
          className="group self-start flex items-center gap-4 pb-1.5 border-b border-white/40 hover:border-white text-[9px] tracking-[0.3em] uppercase font-light text-white/80 hover:text-white transition-all duration-300"
        >
          Read My Story
          <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 text-sm">→</span>
        </Link>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-5 right-5 z-20">
        <span className="font-mono text-[10px] text-white/40">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="flex items-center justify-center w-5 h-5"
          >
            <span
              className="block rounded-full transition-all duration-500"
              style={{
                width: idx === current ? '20px' : '6px',
                height: '6px',
                background: idx === current ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.35)',
                borderRadius: idx === current ? '3px' : '50%',
              }}
            />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10">
        <div
          key={`${current}-${paused}`}
          className="h-full bg-white/60"
          style={{ animation: paused ? 'none' : `aboutProgress ${INTERVAL}ms linear forwards` }}
        />
      </div>

      <style jsx>{`
        @keyframes aboutProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}

/* ─── Desktop / Tablet 3-column layout (original) ────────────────── */
function DesktopLayout() {
  return (
    <section className="w-full bg-[#FAF9F6] text-[#1A1A1A] overflow-hidden">
      <div className="grid grid-cols-3 w-full min-h-[340px] lg:h-[80vh]">

        {/* Panel 1: Portrait */}
        <div className="relative w-full h-full min-h-[340px] bg-[#EFECE6]">
          <Image
            src="/images/img01.jpeg"
            alt="J. Personal Stylist Portrait"
            fill
            className="object-cover object-center hover:scale-[1.02] transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 33vw, 33vw"
          />
        </div>

        {/* Panel 2: Moodboard with quote */}
        <div className="relative w-full h-full min-h-[340px] bg-[#1A1A1A] flex items-center justify-center text-white p-8 xl:p-16">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/img02.jpeg"
              alt="Editorial Aesthetic Flatlay"
              fill
              className="object-cover object-center opacity-45"
            />
          </div>
          <div className="relative z-10 flex flex-col items-start gap-3 max-w-sm">
            <span className="font-serif text-4xl text-white/40 leading-none h-4">"</span>
            <p className="text-lg lg:text-xl xl:text-2xl font-serif font-light italic leading-relaxed text-white/90 tracking-wide pl-2">
              My goal is simple:<br />
              to make getting dressed the easiest decision of your day.
            </p>
            <span className="font-serif text-4xl text-white/40 leading-none h-4 self-end mr-4">"</span>
          </div>
        </div>

        {/* Panel 3: Text intro */}
        <div className="flex flex-col justify-center px-8 xl:px-20 py-12 lg:py-0 bg-[#EFECE6]">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4 mb-8 lg:mb-12">
              <span className="text-[9px] lg:text-[10px] tracking-[0.35em] uppercase font-light text-[#1A1A1A]/60">
                About Me
              </span>
              <div className="w-8 h-[1px] bg-[#1A1A1A]/30" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light leading-[1.2] tracking-wide mb-6 lg:mb-8">
              Hi, I'm J. <br />
              <span className="italic font-normal">I style stories.</span>
            </h2>
            <p className="text-xs lg:text-sm font-light text-[#1A1A1A]/80 leading-relaxed tracking-wide mb-8 lg:mb-10 max-w-[340px]">
              With over 8 years of experience in fashion and image consulting, I help women
              discover their signature style and build wardrobes that are chic, functional and
              uniquely theirs.
            </p>
            <Link
              href="/about"
              className="group flex items-center gap-8 lg:gap-16 pb-2 border-b border-[#1A1A1A]/30 hover:border-[#1A1A1A] text-[9px] lg:text-[10px] tracking-[0.25em] uppercase font-light transition-colors duration-300"
            >
              Read My Story
              <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm">→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Combined export ─────────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <>
      {/* Mobile only: auto-scrolling carousel */}
      <div className="sm:hidden">
        <MobileCarousel />
      </div>

      {/* Tablet & Desktop: original 3-column layout */}
      <div className="hidden sm:block">
        <DesktopLayout />
      </div>
    </>
  );
}
