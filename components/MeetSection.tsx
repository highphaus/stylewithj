'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function MeetSection() {
  return (
    <section className="w-full bg-[#FAF9F6] text-[#1A1A1A] py-40 lg:py-64 px-6 md:px-16 lg:px-28 border-b border-black/[0.04] overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-20 gap-x-12 items-start relative">
        
        {/* ── LEFT TRACK: ASYMMETRIC METADATA IDENTIFIER (COLUMNS 1-4) ── */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full pt-4">
          <div className="sticky top-32">
            <span className="font-sans text-[10px] tracking-[0.7em] text-black/30 block mb-4 uppercase">
              THE DESIGNER PROFILE // IDENTIFICATION
            </span>
            <h2 className="font-serif text-5xl md:text-7xl font-light tracking-tighter leading-none text-[#1A1A1A] mb-8">
              Meet <br />
              <span className="italic text-black/30 font-light">Jennifer.</span>
            </h2>
            <div className="w-12 h-[1px] bg-black/20 mb-8" />
            <p className="font-sans text-[9px] tracking-widest text-black/40 uppercase leading-relaxed max-w-[200px]">
              FOUNDER // CREATIVE IDENTITY DIRECTOR OF STYLE WITH J
            </p>
          </div>
        </div>

        {/* ── CENTER TRACK: THE MUSEUM-SCALE EDITORIAL PORTRAIT (COLUMNS 5-8) ── */}
        <div className="lg:col-span-4 w-full relative">
          {/* LAYERED INDEX WATERMARK FLOATING IN BACKGROUND */}
          <div className="absolute top-0 right-0 font-sans text-[18vw] font-extralight text-black/[0.015] leading-none pointer-events-none select-none tracking-tighter -translate-y-24 z-0">
            J_
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative aspect-[3/4] bg-[#EAE8E3] overflow-hidden shadow-[40px_40px_90px_rgba(0,0,0,0.012)] border border-black/[0.01] z-10"
          >
            <img
              src="/images/img17.jpeg"
              alt="Style with J by Jennifer"
              className="w-full h-full object-cover object-top transition-transform duration-[4000ms] ease-out hover:scale-[1.03]"
            />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 font-sans text-[7px] tracking-[0.4em] uppercase text-black">
              ARCHIVAL FRAME // NO. 17
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT TRACK: DECONSTRUCTED SERIF QUOTE SYSTEM (COLUMNS 9-12) ── */}
        <div className="lg:col-span-4 lg:pl-8 flex flex-col justify-end h-full lg:pt-32 z-10 text-left">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* STYLISTIC TOP BORDER LINE CHANNELS */}
            <div className="w-6 h-px bg-black/40 mb-8" />
            
            <p className="font-serif text-2xl md:text-3xl lg:text-[32px] font-light italic leading-[1.4] tracking-tight text-black/80 mb-12">
              "Style is a deeply personal expression of who you are, and every time you dress, you are asserting a part of yourself."
            </p>

            {/* LOWER ASSESSED PARAMETERS BLOCK */}
            <div className="border-t border-black/10 pt-6 flex flex-col gap-2">
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-black/50 font-medium">
                PHILOSOPHY ACCENTUATION
              </span>
              <p className="font-serif text-xs text-black/40 leading-relaxed font-light">
                An exploration into the structural canvas lines that dictate physical posture, social presence, and clothing psychology.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}