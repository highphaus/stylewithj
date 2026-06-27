'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const transformations = [
  { 
    before: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop", 
    after: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    title: "Corporate Professional Transformation",
    desc: "From inconsistent wardrobe choices to a polished professional image that reflects leadership and confidence."
  },
  { 
    before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop", 
    after: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
    title: "Personal Reinvention",
    desc: "A complete style and grooming transformation designed to build confidence and self-expression."
  },
  { 
    before: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop", 
    after: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop",
    title: "Creator Personal Branding",
    desc: "Developing a visual identity that supports content creation and audience growth."
  }
];

export default function Transformations({ hideButton = false }: { hideButton?: boolean }) {
  return (
    <section className="py-40 px-6 lg:px-12 bg-beige text-charcoal overflow-hidden">
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase font-light text-charcoal/50 block mb-6">
            THE JOURNEY
          </span>
          <h2 className="font-serif text-5xl md:text-7xl font-light mb-8 tracking-tight">
            Real People.<br/>
            <span className="italic text-gold">Real Transformations.</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-charcoal/70 leading-loose max-w-2xl mx-auto font-light">
            Every transformation begins with understanding who you are today and where you want to be tomorrow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
          {transformations.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col text-left group"
            >
              <div className="flex gap-[2px] overflow-hidden mb-8">
                <div className="relative w-1/2 aspect-[3/5] overflow-hidden">
                  <img src={item.before} alt="Before" className="w-full h-full object-cover grayscale transition-transform duration-[2000ms] group-hover:scale-105" />
                  <span className="absolute bottom-4 left-4 text-[8px] tracking-[0.3em] uppercase font-light bg-cream/90 text-charcoal px-3 py-1">BEFORE</span>
                </div>
                <div className="relative w-1/2 aspect-[3/5] overflow-hidden">
                  <img src={item.after} alt="After" className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" />
                  <span className="absolute bottom-4 right-4 text-[8px] tracking-[0.3em] uppercase font-light bg-cream/90 text-charcoal px-3 py-1">AFTER</span>
                </div>
              </div>
              <h3 className="font-serif text-2xl mb-4 font-light tracking-wide">{item.title}</h3>
              <p className="font-sans text-xs text-charcoal/70 leading-loose font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {!hideButton && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Link href="/transformations" className="group relative overflow-hidden border-b border-charcoal/30 pb-2 text-[10px] font-light tracking-[0.3em] uppercase text-charcoal hover:border-gold hover:text-gold transition-colors duration-500 inline-flex items-center gap-4">
              Explore More Transformations
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
