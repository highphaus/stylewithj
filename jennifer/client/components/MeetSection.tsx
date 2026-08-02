'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLightbox } from '@/components/ImageLightbox';

export default function MeetSection() {
  const { openLightbox } = useLightbox();

  return (
    <section className="w-full bg-[#FAF9F6] text-[#1A1A1A] pt-16 pb-28 lg:pt-24 lg:pb-36 px-6 md:px-16 lg:px-24 border-b border-black/[0.06] overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-16 gap-x-12 items-center relative">
        
        {/* ── LEFT TRACK: DESIGNER IDENTIFIER & PRIMARY CTA ── */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.5em] text-black/40 block mb-3 uppercase font-semibold">
                THE DESIGNER PROFILE
              </span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-none text-[#1A1A1A]">
                Meet <br />
                <span className="italic text-black/40 font-normal">Jennifer.</span>
              </h2>
            </div>

            <div className="w-12 h-[1px] bg-black/25" />

            <div className="flex flex-col gap-2">
              <span className="font-sans text-[10px] tracking-[0.3em] text-black/60 uppercase font-semibold">
                FOUNDER & CREATIVE DIRECTOR
              </span>
              <p className="font-sans text-xs sm:text-sm font-light text-black/75 leading-relaxed max-w-sm">
                Helping individuals discover, refine, and elevate their personal style with custom wardrobe curations built for real life, confidence, and quiet luxury.
              </p>
            </div>

            {/* ── CTA BUTTONS ── */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="group relative inline-flex items-center gap-4 bg-black text-white px-7 py-3.5 text-[10px] tracking-[0.25em] uppercase font-light transition-all duration-300 hover:bg-black/80 rounded-xs shadow-sm"
              >
                <span>Read Story</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </Link>

              <Link
                href="/connect"
                className="group inline-flex items-center gap-3 border border-black/25 text-black px-6 py-3.5 text-[10px] tracking-[0.25em] uppercase font-light hover:border-black hover:bg-black/5 transition-all duration-300 rounded-xs"
              >
                <span>Book Session</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── CENTER TRACK: THE MUSEUM-SCALE EDITORIAL PORTRAIT (Click to Pick Lightbox) ── */}
        <div className="lg:col-span-4 w-full relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => openLightbox('/images/img31.jpeg', 'Jennifer — Founder & Creative Director')}
            className="w-full relative aspect-[3/4] bg-[#EFECE6] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-black/10 rounded-xs cursor-pointer group"
            title="Click to view image"
          >
            <img
              src="/images/img31.jpeg"
              alt="Jennifer — Founder & Creative Identity Director"
              className="w-full h-full object-cover object-top transition-transform duration-[3000ms] ease-out group-hover:scale-[1.03]"
            />
            {/* Subtle floating badge */}
            <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md text-white px-3 py-1.5 rounded-xs text-[8px] tracking-[0.3em] uppercase font-mono font-medium">
              ✦ CLICK TO PREVIEW
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT TRACK: QUOTE & PHILOSOPHY HIGHLIGHT ── */}
        <div className="lg:col-span-4 lg:pl-6 flex flex-col justify-center h-full text-left">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="w-8 h-px bg-black/40" />
            
            <blockquote className="font-serif text-2xl md:text-3xl font-light italic leading-snug tracking-tight text-[#1A1A1A]">
              “Style is a deeply personal expression of who you are. Every time you dress, you are telling the world how you want to show up.”
            </blockquote>

            <div className="bg-[#EFECE6]/60 border-l-2 border-black/30 p-5 rounded-xs flex flex-col gap-2">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/50 font-semibold">
                PHILOSOPHY ACCENT
              </span>
              <p className="font-sans text-xs text-black/70 leading-relaxed font-light">
                An intentional approach focused on physical posture, silhouette proportions, and personal confidence over fleeting trends.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
