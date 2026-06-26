import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutSection({ hideButton = false }: { hideButton?: boolean }) {
  return (
    <section id="about" className="py-40 px-6 lg:px-12 bg-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-20 lg:gap-32 items-center">
        
        {/* Left: Huge Editorial Image */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="aspect-[4/5] overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80" 
              alt="Jenny consulting" 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
          </div>
          {/* Subtle Decorative Accent */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 border-[0.5px] border-charcoal/20 z-[-1] hidden md:block"></div>
        </motion.div>

        {/* Right: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start lg:pl-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-sans text-[9px] tracking-[0.4em] uppercase font-light text-charcoal/50 block mb-12"
          >
            The Vision
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl text-charcoal mb-12 font-light leading-[1.1] tracking-tight"
          >
            It's Not About Clothes.<br />
            <span className="italic text-gold">It's About Confidence.</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-xs md:text-sm text-charcoal/70 leading-loose mb-16 max-w-lg space-y-6 font-light"
          >
            <p>
              Your image is often the first thing people notice and remember.
            </p>
            <p>
              I believe personal styling is about far more than fashion. It's about helping people align how they present themselves with who they truly are and who they aspire to become.
            </p>
            <p>
              Through a personalized approach to styling, grooming, wardrobe strategy, and image consulting, I help individuals unlock greater confidence, credibility, and presence in every area of their lives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {!hideButton && (
              <Link href="/about" className="group relative overflow-hidden border-b border-charcoal pb-2 text-[10px] font-light tracking-[0.3em] uppercase text-charcoal hover:text-gold hover:border-gold transition-colors duration-500 inline-flex items-center gap-4">
                Meet Jenny
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
