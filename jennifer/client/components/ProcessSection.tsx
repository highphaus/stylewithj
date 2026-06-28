'use client';
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: "Discover",
    desc: "Understanding your goals, lifestyle, challenges, and aspirations.",
    number: "01"
  },
  {
    title: "Assess",
    desc: "Evaluating your current wardrobe, style, grooming, and personal image.",
    number: "02"
  },
  {
    title: "Strategize",
    desc: "Creating a personalized styling and image transformation roadmap.",
    number: "03"
  },
  {
    title: "Transform",
    desc: "Implementing wardrobe, grooming, and styling recommendations.",
    number: "04"
  },
  {
    title: "Elevate",
    desc: "Building confidence and maintaining a polished personal presence.",
    number: "05"
  }
];

export default function ProcessSection() {
  return (
    <section className="py-40 px-6 lg:px-12 bg-white text-charcoal">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
        >
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase font-light text-charcoal/50 block mb-6">
            THE PROCESS
          </span>
          <h2 className="font-serif text-5xl md:text-7xl font-light tracking-tight">
            The Transformation Journey
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col relative group"
            >
              {/* Luxury thin connector line */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-[1px] bg-charcoal/10 z-0"></div>
              )}
              
              <div className="relative z-10 flex flex-col items-center mb-12">
                <span className="font-serif text-6xl md:text-8xl italic text-charcoal/10 group-hover:text-gold transition-colors duration-700 font-light mb-8">
                  {step.number}
                </span>
                <div className="w-1 h-1 bg-charcoal rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              </div>
              
              <div className="text-center px-4">
                <h3 className="font-serif text-2xl tracking-wide font-light text-charcoal mb-4">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-charcoal/70 leading-loose font-light">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
