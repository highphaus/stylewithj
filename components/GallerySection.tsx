'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GallerySection() {
  const images = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <section className="w-full bg-white text-thalina-text py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
        >
          <h2 className="font-sans text-4xl md:text-5xl lg:text-[50px] font-light tracking-tight">
            Our Work
          </h2>
          <Link href="/portfolio" className="relative group inline-block text-lg font-sans font-light">
            <span>View Full Gallery</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-thalina-text transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          {images.map((src, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative w-full aspect-[3/4] overflow-hidden group cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Gallery image ${idx + 1}`} 
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
