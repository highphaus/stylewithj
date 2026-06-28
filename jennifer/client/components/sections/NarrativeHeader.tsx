// src/components/sections/NarrativeHeader.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function NarrativeHeader() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track precise scroll progression over a longer window
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // 1. Kinetic Typography Mapping: The heading expands massively to frame the view
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 3.5]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-30%"]);
  const opacitySubtext = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // 2. Fluid Canvas Morphing: The image window shifts shapes dynamically on scroll
  const clipPathShape = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [
      "inset(15% 25% 15% 25% round 0px)",   // Clean Center Pillar
      "inset(5% 10% 5% 10% round 120px)",   // Wide Soft Stadium Window
      "inset(0% 0% 0% 0% round 0px)",       // Full Screen Immersive Bleed
      "inset(20% 5% 5% 40% round 20px)"     // Asymmetric Architectural Cut
    ]
  );

  return (
    // h-[200vh] locks the viewport sticky so the transformation feels completely physical
    <div ref={targetRef} className="relative h-[200vh] bg-[#FAF9F6]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-16">
        
        {/* BACKGROUND ACCENT TEXT: Moving Horizon Subtext */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none overflow-hidden select-none z-0 opacity-[0.02]">
          <motion.p 
            style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
            className="font-serif text-[18vw] uppercase tracking-tighter whitespace-nowrap"
          >
            Sartorial Architecture Core Material
          </motion.p>
        </div>

        {/* ─── KINETIC TYPOGRAPHY LAYER ─── */}
        <motion.div 
          style={{ y: titleY }}
          className="w-full text-center z-20 pointer-events-none mt-12 md:mt-20"
        >
          <span className="font-sans text-[9px] tracking-[0.6em] uppercase text-neutral-400 font-light block mb-4">
            Celebrating Iconic Moments
          </span>
          <motion.h3 
            style={{ scale: titleScale }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-[#1A1A1A] origin-center will-change-transform"
          >
            The Narrative Stream
          </motion.h3>
        </motion.div>

        {/* ─── THE MORPHING VISUAL FRAME ─── */}
        <motion.div 
          style={{ clipPath: clipPathShape }}
          className="absolute inset-0 w-full h-full bg-neutral-900 z-10 transition-all duration-150 ease-out"
        >
          <Image
            src="/images/img24.jpeg"
            alt="Muted Avant-Garde Campaign Canvas"
            fill
            priority
            className="object-cover brightness-[0.85] contrast-[1.05]"
            sizes="100vw"
          />
        </motion.div>

        {/* ─── BASE MANIFESTO FOOTER BLOCK ─── */}
        <motion.div 
          style={{ opacity: opacitySubtext }}
          className="w-full flex flex-col sm:flex-row justify-between items-end gap-6 z-20 border-t border-neutral-200/60 pt-8"
        >
          <p className="font-sans text-xs tracking-widest text-neutral-500 uppercase font-light max-w-sm leading-relaxed">
            A real-time spatial exhibition mapping the exact boundary where fabric patterns transform into living structure.
          </p>
          <div className="font-mono text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-light">
            Canvas // Morph_Physics_01
          </div>
        </motion.div>

      </div>
    </div>
  );
}