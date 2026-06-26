import React from 'react';
import { motion } from 'framer-motion';

const audiences = [
  { title: "Working Professionals", desc: "Build confidence and executive presence in your everyday professional life." },
  { title: "Founders & Entrepreneurs", desc: "Create a memorable personal brand that aligns with your vision and leadership." },
  { title: "Executives & Leaders", desc: "Command respect, authority, and influence through a refined personal image." },
  { title: "Students & Job Seekers", desc: "Make stronger first impressions and stand out in competitive environments." },
  { title: "Creators & Influencers", desc: "Develop a distinctive image that supports your personal brand and audience growth." },
  { title: "Individuals Seeking Transformation", desc: "Reinvent your style, confidence, and self-image with expert guidance." }
];

export default function AudienceGrid() {
  return (
    <section className="py-40 px-6 lg:px-12 bg-cream text-charcoal overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
        {/* Left: Editorial Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[3/4] order-2 lg:order-1"
        >
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80" 
            alt="Fashion Editorial" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right: Typography List */}
        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-sans text-[9px] tracking-[0.4em] uppercase font-light text-charcoal/50 block mb-8">
              WHO WE HELP
            </span>
            <h2 className="font-serif text-5xl md:text-7xl text-charcoal mb-8 leading-[1.1] font-light tracking-tight">
              Who I Work With
            </h2>
            <p className="font-sans text-sm md:text-base text-charcoal/70 leading-loose mb-20 max-w-lg font-light">
              Whether you're preparing for a promotion, launching a business, building a personal brand, entering the workforce, or simply looking to reinvent yourself, your image should reflect who you are becoming.
            </p>
          </motion.div>

          <div className="space-y-12">
            {audiences.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-8 group"
              >
                <span className="font-serif text-3xl italic text-charcoal/20 pt-1 group-hover:text-gold transition-colors duration-500 font-light">
                  0{i + 1}
                </span>
                <div className="border-b border-charcoal/10 pb-6 w-full">
                  <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase font-light text-charcoal mb-3 group-hover:text-gold transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-charcoal/60 leading-loose font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
