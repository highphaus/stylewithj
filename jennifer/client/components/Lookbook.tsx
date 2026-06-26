import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const works = [
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    title: "The Executive",
    category: "Corporate Chic",
    span: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    title: "Off-Duty",
    category: "Weekend Casual",
    span: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    image: "https://images.unsplash.com/photo-1550614000-4b95d4ed79ea?auto=format&fit=crop&w=800&q=80",
    title: "Gala Ready",
    category: "Evening Wear",
    span: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
    title: "The Minimalist",
    category: "Essentials",
    span: "col-span-1 md:col-span-2 row-span-1"
  },
  {
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=800&q=80",
    title: "Power Suiting",
    category: "Tailoring",
    span: "col-span-1 md:col-span-1 row-span-2"
  },
  {
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=800&q=80",
    title: "Riviera",
    category: "Resort Wear",
    span: "col-span-1 md:col-span-1 row-span-1"
  }
];

export default function Lookbook({ hideButton = false }: { hideButton?: boolean }) {
  return (
    <section id="portfolio" className="py-40 px-6 lg:px-12 bg-charcoal text-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8"
        >
          <div>
            <span className="font-sans text-[9px] tracking-[0.4em] uppercase font-light text-cream/50 block mb-6">
              PORTFOLIO
            </span>
            <h2 className="font-serif text-5xl md:text-7xl font-light tracking-tight">
              Selected Works
            </h2>
          </div>
          
          {!hideButton && (
            <Link href="/portfolio" className="group relative overflow-hidden border-b border-cream/30 pb-2 text-[10px] font-light tracking-[0.3em] uppercase text-cream hover:border-gold hover:text-gold transition-colors duration-500 inline-flex items-center gap-4">
              Explore Archive
            </Link>
          )}
        </motion.div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-3 gap-6 h-auto md:h-[1200px]">
          {works.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group overflow-hidden ${item.span} h-[400px] md:h-auto`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Elegant Caption Reveal */}
              <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1]">
                <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-gold block mb-2">
                  {item.category}
                </span>
                <h3 className="font-serif text-3xl font-light text-white tracking-wide">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
