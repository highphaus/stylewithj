import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DiscoveryCall() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Full Background Image with Parallax feel */}
      <motion.div 
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1534126416832-a88fdf23f178?auto=format&fit=crop&w=2000&q=80" 
          alt="Fashion Consultation" 
          className="w-full h-full object-cover object-center"
        />
        {/* Deep luxury overlay */}
        <div className="absolute inset-0 bg-charcoal/40"></div>
      </motion.div>

      <div className="text-center z-10 max-w-4xl px-6 flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-sans text-[9px] tracking-[0.4em] uppercase font-light text-cream/70 block mb-8"
        >
          BEGIN YOUR TRANSFORMATION
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-[90px] mb-8 font-light text-cream tracking-tight leading-[0.9]"
        >
          Let's Create Something <span className="italic text-gold">Exceptional.</span>
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-sm md:text-base text-cream/80 leading-loose max-w-2xl mx-auto mb-16 font-light"
        >
          <p>Your identity is your ultimate signature. Elevate your presence, project absolute confidence, and embrace the transformative power of intentional design.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link href="/connect" className="group relative overflow-hidden border border-cream px-12 py-5 text-[10px] font-light tracking-[0.3em] uppercase text-cream hover:text-charcoal transition-colors duration-500 inline-flex items-center gap-4 bg-charcoal/20 backdrop-blur-sm">
            <span className="relative z-10">Start Your Style Journey</span>
            <div className="absolute inset-0 bg-cream transform scale-y-0 origin-bottom transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-y-100 z-0"></div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
