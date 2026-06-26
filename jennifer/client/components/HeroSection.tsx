import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Image with Slow Zoom */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=2000&q=80" 
          alt="Jenny - Image Consultant" 
          className="w-full h-full object-cover object-[center_20%] opacity-70"
        />
        {/* Deep editorial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-black/20 z-10"></div>
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-sans text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-light text-cream block mb-8">
            PERSONAL STYLIST • IMAGE CONSULTANT • PERSONAL BRAND STRATEGIST
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-serif text-5xl md:text-8xl lg:text-[110px] text-cream font-light leading-[0.9] tracking-tight mb-8">
            Become the Best-Presented<br />
            <span className="italic text-gold/90">Version of Yourself.</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-sans text-xs md:text-sm text-cream/80 leading-loose tracking-wide mb-16 font-light">
            Helping ambitious individuals build confidence, credibility, and a powerful personal presence through personal styling, wardrobe strategy, grooming, and image transformation.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <Link href="/connect" className="group relative overflow-hidden border border-cream px-12 py-4 text-[9px] font-light tracking-[0.3em] uppercase text-cream hover:text-charcoal transition-colors duration-500">
            <span className="relative z-10">Start Your Style Journey</span>
            <div className="absolute inset-0 bg-cream transform scale-x-0 origin-left transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-x-100 z-0"></div>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-cream/50">Scroll</span>
        <div className="w-[1px] h-12 bg-cream/20 overflow-hidden relative">
          <div className="w-full h-full bg-cream origin-top animate-[scrolldown_2s_ease-in-out_infinite]"></div>
        </div>
      </motion.div>
    </section>
  );
}
