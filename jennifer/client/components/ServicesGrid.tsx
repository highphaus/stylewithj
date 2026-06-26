import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Personal Styling",
    desc: "Develop a style that reflects your personality, lifestyle, and ambitions.",
    image: "https://images.unsplash.com/photo-1485230895905-ef40ba366951?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Wardrobe Strategy",
    desc: "Build a wardrobe that works for your body type, profession, and daily needs.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Grooming & Style",
    desc: "Refine grooming habits, hairstyles, accessories, and personal presentation.",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Image & Presence",
    desc: "Strengthen how you present yourself through confidence, communication, and appearance.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Personal Branding",
    desc: "Align your image with the message you want the world to see.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
  }
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-40 px-6 lg:px-12 bg-[#FFFFFF]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-40"
        >
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase font-light text-charcoal/50 block mb-8">
            VALUE PROPOSITION
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-charcoal font-light mb-8 tracking-tight">
            Signature Styling Experiences
          </h2>
          <p className="font-sans text-sm md:text-base text-charcoal/70 leading-loose max-w-2xl mx-auto font-light">
            Looking good is only one part of the equation. True transformation happens when your appearance, confidence, personality, and goals work together.
          </p>
        </motion.div>

        <div className="flex flex-col gap-40 lg:gap-56">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index} 
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center group"
              >
                {/* Image */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative w-full aspect-[3/4] overflow-hidden ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  {/* Subtle thin border around image for editorial feel */}
                  <div className="absolute inset-4 border border-white/20 z-10 pointer-events-none mix-blend-overlay"></div>
                </motion.div>

                {/* Text Content */}
                <div className={`flex flex-col justify-center ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-sans text-[10px] tracking-[0.3em] font-light text-charcoal/30 mb-8 block">
                      NO. 0{index + 1}
                    </span>
                    <h3 className="font-serif text-4xl md:text-6xl text-charcoal mb-8 font-light tracking-tight">
                      {service.title}
                    </h3>
                    <div className="w-12 h-[1px] bg-charcoal/20 mb-8"></div>
                    <p className="font-sans text-sm text-charcoal/70 leading-loose mb-12 max-w-md font-light">
                      {service.desc}
                    </p>
                    
                    <Link href="/connect" className="inline-flex items-center gap-4 group/btn">
                      <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-charcoal group-hover/btn:text-gold transition-colors duration-300">
                        Discover
                      </span>
                      <span className="w-8 h-[1px] bg-charcoal group-hover/btn:w-12 group-hover/btn:bg-gold transition-all duration-300"></span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
