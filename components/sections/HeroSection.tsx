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
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1920" 
          alt="Campaign Masterpiece"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
      </motion.div>

      {/* Navigation Layer */}
      <header className="w-full fixed top-0 left-0 mix-blend-difference text-white z-50 flex justify-center border-b border-white/5 backdrop-blur-[2px]">
        <div className="w-full max-w-7xl flex justify-between items-center px-6 md:px-12 py-5">
          {/* Custom brand formatting stylewithj */}
          <Link href="/" className="font-sans text-lg tracking-[0.15em] font-light lowercase">
            stylewithj
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.2em] uppercase font-light">
            <Link href="#collections" className="hover:opacity-60 transition-opacity">Collections</Link>
            <Link href="#about" className="hover:opacity-60 transition-opacity">Philosophy</Link>
          </nav>
        </div>
      </header>

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
              Ethereal Structures.<br />Tailored Silhouettes.
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