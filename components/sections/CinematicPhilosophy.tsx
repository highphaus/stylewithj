'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CinematicPhilosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Parallax effects tied to the scroll position of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Image scales up slightly and moves down for a classic parallax window effect
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Text container fades in and glides up gently as it reaches the center of the viewport
  const { scrollYProgress: textScroll } = useScroll({
    target: textRef,
    offset: ['start 85%', 'start 40%'],
  });
  
  const textOpacity = useTransform(textScroll, [0, 1], [0, 1]);
  const textY = useTransform(textScroll, [0, 1], [60, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[120vh] md:h-[150vh] bg-[#111111] overflow-hidden flex items-center justify-center"
    >
      {/* Background Parallax Image Layer */}
      <motion.div 
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 w-full h-full opacity-40 origin-center"
      >
        <Image
          src="/images/img28.jpeg" // Using one of the new high-res local images
          alt="Cinematic Philosophy"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Subtle Grain Overlay for Editorial Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>

      {/* Foreground Content */}
      <motion.div 
        ref={textRef}
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col items-center text-center"
      >
        <span className="font-mono text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-8 md:mb-12">
          The Philosophy
        </span>
        
        <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl font-light text-[#FAF9F6] leading-[1.1] tracking-tight">
          Beyond the <br />
          <span className="italic font-light tracking-wide text-neutral-300">fabric of reality</span>
        </h2>
        
        <div className="mt-12 md:mt-20 w-[1px] h-24 bg-gradient-to-b from-neutral-400 to-transparent"></div>
        
        <p className="mt-12 max-w-xl font-sans text-sm md:text-base font-light text-neutral-300 leading-relaxed tracking-wide">
          Every piece is a dialogue between structured architectural form and the fluid geometry of the human silhouette. We do not just design garments; we architect second skins that carry an editorial narrative into the real world.
        </p>
      </motion.div>
    </section>
  );
}
