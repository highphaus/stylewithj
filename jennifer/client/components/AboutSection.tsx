'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="flex flex-col lg:flex-row w-full min-h-screen bg-thalina-bg text-thalina-text">
      
      {/* Left Text Content */}
      <div className="w-full lg:w-1/2 px-8 py-20 lg:py-32 lg:px-24 flex flex-col justify-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-sans text-lg font-light mb-16 block"
        >
          About Jennifer
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-5xl md:text-6xl lg:text-[75px] leading-[1.1] font-light mb-12 tracking-tight"
        >
          The Difference <br />
          You've Been Looking For
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-base md:text-lg text-thalina-text/80 leading-relaxed max-w-lg space-y-8 font-light"
        >
          <p>
            Your image is often the first thing people notice and remember. I believe personal styling is about far more than fashion. It's about helping people align how they present themselves with who they truly are.
          </p>
          <p>
            Through a personalized approach to styling, grooming, wardrobe strategy, and image consulting, I help individuals unlock greater confidence, credibility, and presence in every area of their lives.
          </p>
        </motion.div>
      </div>

      {/* Right Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden"
      >
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/images/img22.jpeg" 
          alt="Style with J by Jennifer" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
      
    </section>
  );
}
