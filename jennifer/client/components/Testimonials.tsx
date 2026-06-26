"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "Working with Jenny completely changed the way I see myself. I now have a wardrobe that reflects my personality and supports my career goals.",
    author: "RAHUL MEHTA",
    title: "FOUNDER",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    quote: "Jenny didn't just improve my style. She helped me become more confident and intentional about how I present myself.",
    author: "ANANYA SINGH",
    title: "MARKETING PROFESSIONAL",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    quote: "The transformation went beyond clothing. It improved my confidence, self-image, and overall presence.",
    author: "KUNAL MALHOTRA",
    title: "ENTREPRENEUR",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-40 px-6 lg:px-12 bg-cream text-charcoal overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-24">
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase font-light text-charcoal/50 block">
            CLIENT EXPERIENCES
          </span>
        </div>

        <div className="relative h-[600px] md:h-[500px] flex items-center justify-center">
          {/* Large Decorative Quote */}
          <span className="absolute top-10 left-1/2 -translate-x-1/2 font-serif text-[200px] md:text-[300px] text-gold/5 leading-none select-none z-0">
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl"
            >
              <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal font-light leading-tight mb-16 tracking-tight px-4">
                "{testimonials[currentIndex].quote}"
              </h3>
              
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-charcoal/10">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].author} 
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div className="text-left">
                  <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-charcoal block mb-1">
                    {testimonials[currentIndex].author}
                  </span>
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-light text-charcoal/50 block">
                    {testimonials[currentIndex].title}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-12 z-20">
            <button 
              onClick={prevTestimonial}
              className="font-sans text-[9px] tracking-[0.3em] uppercase text-charcoal/50 hover:text-charcoal transition-colors pb-1 border-b border-transparent hover:border-charcoal"
            >
              PREV
            </button>
            <div className="flex items-center gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-1 h-1 rounded-full transition-all duration-500 ${
                    currentIndex === idx ? 'bg-charcoal scale-150' : 'bg-charcoal/20'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="font-sans text-[9px] tracking-[0.3em] uppercase text-charcoal/50 hover:text-charcoal transition-colors pb-1 border-b border-transparent hover:border-charcoal"
            >
              NEXT
            </button>
          </div>
        </div>

        {/* Featured / Certified Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-40 pt-16 border-t border-charcoal/10 flex flex-col md:flex-row justify-between items-center gap-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase font-light text-charcoal/50">
              FEATURED IN
            </span>
            <div className="flex items-center gap-10 opacity-40 grayscale">
              <span className="font-serif text-xl font-light tracking-widest">VOGUE</span>
              <span className="font-serif text-xl italic font-light">Entrepreneur</span>
              <span className="font-sans text-lg font-light tracking-[0.2em] uppercase">FEMINA</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase font-light text-charcoal/50">
              CERTIFIED BY
            </span>
            <span className="font-serif text-sm italic text-charcoal/40">International Image Institute</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}