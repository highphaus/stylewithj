// src/components/sections/InfiniteMarquee.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const marqueeImages = [
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600',
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600',
  'https://images.unsplash.com/photo-152436991641-6745cdb1723f?q=80&w=600',
];

export default function InfiniteMarquee() {
  // We duplicate the array to create a seamless, gapless infinite loop
  const duplicatedImages = [...marqueeImages, ...marqueeImages, ...marqueeImages];

  return (
    <section className="bg-[#FAF9F6] py-24 border-t border-b border-neutral-200/60 overflow-hidden w-full">
      
      {/* Editorial Mini-Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-12 flex justify-between items-baseline">
        <div>
          <span className="font-mono text-[9px] tracking-[0.5em] text-neutral-400 uppercase block mb-2">
            Seasonal Runway Frame
          </span>
          <h3 className="font-serif text-xl md:text-2xl font-light tracking-wide text-[#1A1A1A]">
            The Live Lookbook Stream
          </h3>
        </div>
        <a 
          href="/gallery" 
          className="font-mono text-[9px] tracking-widest text-neutral-400 hover:text-black uppercase border-b border-neutral-300 pb-1 transition-colors"
        >
          View Full Archive (84+) →
        </a>
      </div>

      {/* The Infinite Track Wrap */}
      <div className="flex w-full overflow-hidden relative select-none">
        
        {/* Subtle vignette shade masks on left and right to look expensive */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex gap-6 pr-6 flex-shrink-0"
          animate={{ x: [0, '-33.33%'] }}
          transition={{
            ease: "linear",
            duration: 35, // Adjust this number to make the stream faster or slower
            repeat: Infinity,
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div 
              key={index} 
              className="relative w-[240px] sm:w-[320px] aspect-[2/3] overflow-hidden bg-neutral-100 group border border-neutral-200/40"
            >
              <Image
                src={src}
                alt={`Runway Look ${index}`}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
                sizes="(max-width: 768px) 240px, 320px"
              />
              {/* Subtle hover framing numbers */}
              <div className="absolute bottom-3 left-3 font-mono text-[8px] text-white bg-black/40 px-1.5 py-0.5 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                LOOK // {String((index % marqueeImages.length) + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}