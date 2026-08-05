'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';

export default function CinematicPhilosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const { openLightbox } = useLightbox();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageSrc = "/images/includes/IMG_0330.JPG.jpeg";

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#FAF9F6] text-[#1A1A1A] overflow-hidden border-b border-black/10"
    >
      
      {/* ── MOBILE / SMALL DEVICE LAYOUT (TEXT FIRST -> FULL-BLEED ZERO-GAP HERO IMAGE IMMEDIATELY AFTER) ── */}
      <div className="block lg:hidden w-full bg-[#FAF9F6]">
        
        {/* 1. Header Text ("Style should never feel like a costume.") */}
        <div className="px-6 pt-12 pb-6 bg-[#FAF9F6]">
          <span className="font-mono text-[9px] tracking-[0.5em] text-black/50 uppercase block mb-3 font-semibold">
            ✦ OUR PHILOSOPHY
          </span>
          
          <h2 className="font-serif text-2xl lg:text-5xl font-light text-[#1A1A1A] leading-[1.15] tracking-tight">
            Style should never <br />
            <span className="italic font-normal text-black/75">feel like a costume.</span>
          </h2>
        </div>

        {/* 2. FULL-BLEED ZERO-GAP HERO STYLE COVER IMAGE IMMEDIATELY AFTER HEADLINE */}
        <div 
          onClick={() => openLightbox(imageSrc, "Style with J Philosophy")}
          className="relative w-full h-[100dvh] min-h-[500px] bg-[#0D0D0D] overflow-hidden cursor-pointer group"
          title="Click to view image"
        >
          <motion.div style={{ scale: imageScale }} className="w-full h-full relative">
            <Image
              src={imageSrc} 
              alt="Style with J Philosophy"
              fill
              className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xs text-[8px] tracking-[0.3em] uppercase font-mono font-semibold border border-white/10">
              ✦ PHILOSOPHY SILHOUETTE
            </div>
          </motion.div>
        </div>

        {/* 3. BODY TEXT, QUOTE & CTA BELOW THE IMAGE */}
        <div className="px-6 pt-8 pb-12 flex flex-col gap-6 bg-[#FAF9F6]">
          <div className="space-y-4 font-sans text-xs font-light text-black/80 leading-relaxed tracking-wide">
            <p>
              We don't believe in dressing you according to fleeting trends or forcing you into a version of yourself that doesn't feel natural.
            </p>
            <p>
              We believe style is personal. It should fit you, your personality, your lifestyle, your comfort, and the way you want to show up in the world.
            </p>
          </div>

          {/* HIGHLIGHTED QUOTE BOX */}
          <div className="p-6 bg-[#EFECE6] border-l-2 border-[#1A1A1A] rounded-xs shadow-xs">
            <p className="font-serif text-base font-light italic leading-relaxed text-[#1A1A1A]">
              “Our goal is simple: to help you find a style that feels like you, only better.”
            </p>
          </div>

          <p className="font-sans text-xs font-medium tracking-widest text-black/70 uppercase">
            Because when you feel comfortable in what you wear, confidence follows naturally.
          </p>

          {/* STYLE JOURNEY CTA */}
          <div className="pt-6 border-t border-black/10 flex flex-col items-start gap-3">
            <span className="font-sans text-[8px] tracking-[0.4em] text-black/50 uppercase font-semibold">
              READY TO FIND YOUR STYLE?
            </span>
            <h3 className="font-serif text-lg font-light tracking-wide text-[#1A1A1A] leading-tight">
              Let's create a wardrobe that feels as good as it looks.
            </h3>
            <Link
              href="/connect"
              className="group flex items-center justify-center gap-3 px-6 py-3.5 bg-[#1A1A1A] hover:bg-black text-white text-[9px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-mono font-medium transition-all shadow-md mt-1 w-full sm:w-auto rounded-xs cursor-pointer border border-white/10"
            >
              Start Your Style Journey
              <span className="transform group-hover:translate-x-1.5 transition-transform text-xs">→</span>
            </Link>
          </div>
        </div>

      </div>

      {/* ── DESKTOP & TABLET LAYOUT (lg:grid) ── */}
      <div className="hidden lg:block max-w-7xl mx-auto py-24 lg:py-32 px-12 lg:px-20">
        <div className="grid grid-cols-12 gap-16 items-center">
          
          {/* LEFT COLUMN: ELEGANT PHILOSOPHY TYPOGRAPHY PANEL */}
          <div className="col-span-7 flex flex-col justify-center items-start text-left space-y-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.5em] text-black/50 uppercase block mb-3 font-semibold">
                ✦ OUR PHILOSOPHY
              </span>
              
              <h2 className="font-serif text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-[1.12] tracking-tight">
                Style should never <br />
                <span className="italic font-normal text-black/75">feel like a costume.</span>
              </h2>
            </div>

            <div className="w-12 h-[1px] bg-black/20" />

            <div className="space-y-4 font-sans text-sm font-light text-black/80 leading-relaxed tracking-wide max-w-xl">
              <p>
                We don't believe in dressing you according to fleeting trends or forcing you into a version of yourself that doesn't feel natural.
              </p>
              <p>
                We believe style is personal. It should fit you, your personality, your lifestyle, your comfort, and the way you want to show up in the world.
              </p>
            </div>

            {/* HIGHLIGHTED QUOTE BOX */}
            <div className="p-8 bg-[#EFECE6] border-l-2 border-[#1A1A1A] rounded-xs max-w-xl w-full shadow-xs">
              <p className="font-serif text-xl font-light italic leading-relaxed text-[#1A1A1A]">
                “Our goal is simple: to help you find a style that feels like you, only better.”
              </p>
            </div>

            <p className="font-sans text-sm font-medium tracking-widest text-black/70 uppercase">
              Because when you feel comfortable in what you wear, confidence follows naturally.
            </p>

            {/* STYLE JOURNEY CTA */}
            <div className="pt-6 border-t border-black/10 w-full max-w-xl flex flex-col items-start gap-4">
              <span className="font-sans text-[8px] tracking-[0.4em] text-black/50 uppercase font-semibold">
                READY TO FIND YOUR STYLE?
              </span>
              <h3 className="font-serif text-xl font-light tracking-wide text-[#1A1A1A] leading-tight">
                Let's create a wardrobe that feels as good as it looks.
              </h3>
              <Link
                href="/connect"
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#1A1A1A] hover:bg-black text-white text-[9px] tracking-[0.25em] uppercase font-mono font-medium transition-all shadow-md mt-2 rounded-xs cursor-pointer border border-white/10"
              >
                Start Your Style Journey
                <span className="transform group-hover:translate-x-1.5 transition-transform text-xs">→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: 100% CLEAN IMAGE FRAME */}
          <div 
            onClick={() => openLightbox(imageSrc, "Style with J Philosophy")}
            className="col-span-5 relative w-full aspect-[4/5] overflow-hidden bg-[#EFECE6] border border-black/10 shadow-xl rounded-xs cursor-pointer group"
            title="Click to view image"
          >
            <motion.div style={{ scale: imageScale }} className="w-full h-full relative">
              <Image
                src={imageSrc} 
                alt="Style with J Philosophy"
                fill
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                priority
                unoptimized
              />
            </motion.div>
          </div>

        </div>
      </div>

    </section>
  );
}
