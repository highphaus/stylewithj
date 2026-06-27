'use client';
import React from 'react';
import { motion } from 'framer-motion';

const stylingServices = [
  { name: "Personal Styling Session", price: "From ₹15,000" },
  { name: "Wardrobe Strategy", price: "From ₹25,000" },
  { name: "Special Event Styling", price: "From ₹20,000" }
];

const imageServices = [
  { name: "Personal Branding Audit", price: "From ₹30,000" },
  { name: "Color Analysis", price: "From ₹12,000" },
  { name: "Complete Transformation", price: "Custom" }
];

export default function ServicesGrid() {
  return (
    <section id="services" className="flex flex-col lg:flex-row w-full min-h-screen bg-thalina-bg text-thalina-text">
      
      {/* Left Content Column */}
      <div className="w-full lg:w-1/2 px-8 pt-32 pb-20 lg:pt-40 lg:pb-32 lg:px-24 flex flex-col justify-start">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-sans text-4xl md:text-5xl lg:text-[50px] font-light mb-20 tracking-tight"
        >
          Our Services
        </motion.h2>

        {/* Styling Services */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="font-sans text-2xl font-light mb-8">Styling & Grooming</h3>
          <div className="flex flex-col gap-6">
            {stylingServices.map((item, i) => (
              <div key={i} className="group flex justify-between items-center py-4 border-b border-gray-300/40 cursor-pointer">
                <span className="font-sans text-base font-medium group-hover:pl-2 transition-all duration-300">{item.name}</span>
                <span className="font-sans text-sm font-light">{item.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image Services */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="font-sans text-2xl font-light mb-8">Image Consulting</h3>
          <div className="flex flex-col gap-6">
            {imageServices.map((item, i) => (
              <div key={i} className="group flex justify-between items-center py-4 border-b border-gray-300/40 cursor-pointer">
                <span className="font-sans text-base font-medium group-hover:pl-2 transition-all duration-300">{item.name}</span>
                <span className="font-sans text-sm font-light">{item.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Right Image Column */}
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
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80" 
          alt="Fashion Styling Services" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

    </section>
  );
}
