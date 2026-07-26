'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const EXCLUSIVE_PIECES = [
  { id: 1, src: '/images/img29.jpeg', title: 'SILHOUETTE 01', subtitle: 'The Architectural Drape' },
  { id: 2, src: '/images/img30.jpeg', title: 'SILHOUETTE 02', subtitle: 'Fluid Mechanics' },
  { id: 3, src: '/images/img31.jpeg', title: 'SILHOUETTE 03', subtitle: 'Structured Chaos' },
  { id: 4, src: '/images/img24.jpeg', title: 'SILHOUETTE 04', subtitle: 'Midnight Geometry' },
];

export default function AvantGardeShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll progress to horizontal translation
  // Moves the inner container leftwards as we scroll down
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']); // -75% because 4 items = 400% width, we need to slide 3 viewport widths

  return (
    // The outer container takes up 400vh to allow for enough vertical scroll distance
    <section ref={targetRef} className="relative h-[400vh] bg-[#FAF9F6] text-[#1A1A1A]">
      {/* Sticky container that stays in the viewport while scrolling */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Floating Typography behind the images */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <motion.h2 
            className="text-[20vw] font-serif font-light tracking-tighter text-[#1A1A1A]/5 whitespace-nowrap"
            style={{ x: useTransform(scrollYProgress, [0, 1], ['20%', '-100%']) }}
          >
            EXTRAORDINARY HAUTE COUTURE
          </motion.h2>
        </div>

        {/* The horizontal scrolling track */}
        <motion.div style={{ x }} className="flex gap-16 md:gap-32 px-[10vw] md:px-[20vw] z-10 relative">
          {EXCLUSIVE_PIECES.map((piece, index) => {
            // Create a slight parallax effect for each image inside the scrolling track
            return (
              <div 
                key={piece.id} 
                className="group relative flex flex-col justify-center items-center w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] flex-shrink-0"
              >
                {/* Number Indicator */}
                <div className="absolute -top-12 left-0 font-mono text-[10px] tracking-[0.5em] text-neutral-400">
                  {String(index + 1).padStart(2, '0')} // 04
                </div>

                {/* Image Container with overflow hidden for image scale effect */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-200">
                  <Image
                    src={piece.src}
                    alt={piece.title}
                    fill
                    className="object-cover object-center grayscale-[20%] transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:grayscale-0"
                    sizes="(max-width: 768px) 80vw, 40vw"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>

                {/* Caption Details */}
                <div className="w-full mt-6 md:mt-10 flex flex-col items-start overflow-hidden">
                  <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    {piece.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl md:text-4xl font-light tracking-wide text-[#1A1A1A] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                    {piece.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
