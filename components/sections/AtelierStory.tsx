// src/components/sections/AtelierStory.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function AtelierStory() {
  const targetRef = useRef<HTMLElement>(null);
  
  // Track scroll position specifically for this container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Structural offsets: Creates an elegant, faster-moving vertical glide on scroll
  const yContent = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yImage = useTransform(scrollYProgress, [0, 1], [-20, 60]);

  return (
    <section 
      ref={targetRef}
      id="about" 
      className="relative bg-[#EAE9E4] px-6 md:px-16 py-32 md:py-44 border-t border-neutral-200 overflow-hidden z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.02)]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Text Content Glides Upward */}
        <motion.div
          style={{ y: yContent }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-medium mb-6 block">
            SARTORIAL DNA
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight font-serif text-[#1A1A1A] leading-[1.1] mb-10">
            Garments constructed <br /> to define structural <br /> identity.
          </h2>
          <div className="text-xs md:text-sm text-neutral-700 leading-relaxed font-light space-y-6 max-w-xl">
            <p>
              The label operates on the fine boundary separating architectural form from fluid textiles. We believe true presence is an intentional statement, structured carefully through elite pattern tailoring and geometric construction.
            </p>
            <p>
              Operating from a private studio environment, we consult with collectors and curators globally—blending striking contemporary silhouettes with timeless, high-tier textile execution.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Image Glides Downward to Create Contrast */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[380px] aspect-[3/4] overflow-hidden bg-neutral-300">
            <motion.div 
              style={{ y: yImage, scale: 1.05 }} 
              className="absolute inset-0 w-full h-[120%]"
            >
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Studio Production Portrait"
                fill
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-[1.2s]"
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}