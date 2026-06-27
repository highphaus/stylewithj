'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function MeetSection() {
  return (
    <section className="w-full bg-thalina-bg text-thalina-text py-24 lg:py-40 px-6 lg:px-12 flex flex-col items-center justify-center text-center">
      <div className="max-w-[800px] mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-sans text-lg font-light mb-12 block uppercase tracking-widest"
        >
          Meet Jennifer
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-4xl md:text-5xl lg:text-[55px] leading-[1.2] font-light tracking-tight mb-16"
        >
          "Style is a deeply personal expression of who you are, and every time you dress, you are asserting a part of yourself."
        </motion.h2>

        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
          alt="Style with J by Jennifer"
          className="w-full md:w-[400px] h-[500px] object-cover mx-auto grayscale"
        />
      </div>
    </section>
  );
}
