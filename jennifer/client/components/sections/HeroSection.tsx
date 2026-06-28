// src/components/sections/HeroSection.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 600], [0, 120]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Cinematic Parallax Layer */}
      <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-[115%] origin-top">
        <Image
          src="/images/hero/heroimage1.jpeg" 
          alt="Campaign Masterpiece"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
      </motion.div>

      {/* Main Typography Header Block */}
      <motion.div style={{ opacity: opacityText }} className="absolute inset-0 z-10 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 mix-blend-difference text-white">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row md:justify-between md:items-end gap-8">
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-6xl md:text-8xl font-light tracking-wide max-w-4xl leading-[1.05]"
            >
             
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="flex flex-col items-start md:items-end gap-6">
            <p className="text-[10px] tracking-[0.3em] text-neutral-300 font-light max-w-[260px] md:text-right leading-relaxed uppercase">
              An exploration of fluid geometry and raw textile architecture.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}