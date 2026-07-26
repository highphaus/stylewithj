'use client';
import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: "Sarah L.",
    text: "Jenny completely transformed my wardrobe and my confidence. Her eye for detail and understanding of personal style is unmatched. I finally feel like my outward appearance matches my inner self.",
  },
  {
    name: "Michael R.",
    text: "As a professional stepping into a new executive role, I needed to refine my image. Jenny provided incredible guidance, color analysis, and shopping support. Highly recommended!",
  },
  {
    name: "Elena G.",
    text: "The personal styling session was a revelation. Jenny showed me how to mix and match pieces I already owned while adding a few key staples. I've never received so many compliments.",
  }
];

export default function Testimonials() {
  return (
    <section className="w-full bg-[#FAF9F6] text-[#1A1A1A] py-24 sm:py-32 border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-center mb-20 text-[#1A1A1A]"
        >
          Reviews
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="flex flex-col items-center text-center p-8 bg-[#EFECE6] border border-black/5"
            >
              <div className="flex gap-1 mb-8 text-[#1A1A1A]/80">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="font-serif text-base font-light leading-relaxed mb-8 italic text-black/80">
                "{review.text}"
              </p>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-light text-black/60">
                {review.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}