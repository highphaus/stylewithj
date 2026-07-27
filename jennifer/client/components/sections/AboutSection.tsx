'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  { src: '/images/img01.jpeg', alt: 'J. Personal Stylist Portrait' },
  { src: '/images/img05.jpeg', alt: 'Editorial Style Session' },
  { src: '/images/img07.jpeg', alt: 'Fashion Consultation' },
  { src: '/images/img14.jpeg', alt: 'Wardrobe Styling' },
  { src: '/images/img15.jpeg', alt: 'Style Story' },
];

const INTERVAL = 3500;

export default function AboutSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    // Reset auto-scroll timer on manual nav
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, INTERVAL);
  };

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, paused]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(420px, 85vh, 900px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── SLIDES ── */}
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

      {/* ── DARK GRADIENT OVERLAY ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/35 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* ── TEXT CONTENT ── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28 max-w-2xl">

        {/* Label */}
        <div className="flex items-center gap-3 mb-5 sm:mb-8">
          <div className="w-6 sm:w-10 h-[1px] bg-white/50" />
          <span className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-light text-white/60">
            About Me
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-[1.15] tracking-wide text-white mb-4 sm:mb-6">
          Hi, I'm J.<br />
          <span className="italic font-normal text-white/80">I style stories.</span>
        </h2>

        {/* Body */}
        <p className="font-sans text-xs sm:text-sm font-light text-white/70 leading-relaxed mb-2 sm:mb-4 max-w-sm sm:max-w-md">
          With over 8 years of experience in fashion and image consulting, I help women
          discover their signature style and build wardrobes that are chic, functional and
          uniquely theirs.
        </p>

        {/* Quote */}
        <p className="font-serif text-sm sm:text-base italic text-white/55 leading-snug mb-7 sm:mb-10 max-w-xs sm:max-w-sm">
          "My goal is simple: to make getting dressed the easiest decision of your day."
        </p>

        {/* CTA */}
        <Link
          href="/about"
          className="group self-start flex items-center gap-4 sm:gap-6 pb-1.5 border-b border-white/40 hover:border-white text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-light text-white/80 hover:text-white transition-all duration-300"
        >
          Read My Story
          <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 text-sm">→</span>
        </Link>
      </div>

      {/* ── SLIDE COUNTER ── */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 flex items-center gap-2">
        <span className="font-mono text-[10px] text-white/40">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── DOT NAVIGATION ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="group flex items-center justify-center w-5 h-5"
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

      {/* ── PROGRESS BAR ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10">
        <div
          key={`${current}-${paused}`}
          className="h-full bg-white/60"
          style={{
            animation: paused ? 'none' : `progressBar ${INTERVAL}ms linear forwards`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
