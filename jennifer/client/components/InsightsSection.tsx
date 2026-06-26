import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const articles = [
  {
    title: "How First Impressions Shape Opportunities",
    category: "PERSONAL BRANDING",
    date: "MAR 12"
  },
  {
    title: "Building Executive Presence Through Style",
    category: "STYLE & PRESENCE",
    date: "MAR 05"
  },
  {
    title: "The Psychology of Personal Appearance",
    category: "CONFIDENCE",
    date: "FEB 28"
  },
  {
    title: "Wardrobe Essentials Every Professional Should Own",
    category: "WARDROBE STRATEGY",
    date: "FEB 15"
  },
  {
    title: "How Personal Branding Starts With You",
    category: "PERSONAL BRANDING",
    date: "FEB 02"
  }
];

export default function InsightsSection({ hideButton = false }: { hideButton?: boolean }) {
  return (
    <section className="py-40 px-6 lg:px-12 bg-white text-charcoal">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-20 lg:gap-32">
        {/* Left Header */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/3 flex flex-col items-start"
        >
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase font-light text-charcoal/50 block mb-8">
            LATEST ARTICLES
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-charcoal font-light leading-[1.1] mb-12 tracking-tight">
            Insights on Style, Confidence & Personal Branding
          </h2>
          {!hideButton && (
            <Link href="/insights" className="group relative overflow-hidden border-b border-charcoal/30 pb-2 text-[10px] font-light tracking-[0.3em] uppercase text-charcoal hover:border-gold hover:text-gold transition-colors duration-500 inline-flex items-center gap-4">
              View All Articles
            </Link>
          )}
        </motion.div>

        {/* Right Articles List */}
        <div className="lg:w-2/3 flex flex-col">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link 
                href="#" 
                className="group py-10 border-t border-charcoal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-charcoal transition-colors duration-500"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-16">
                  <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-charcoal/40 w-32 group-hover:text-gold transition-colors duration-500">
                    {article.category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-charcoal group-hover:italic transition-all duration-500">
                    {article.title}
                  </h3>
                </div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-light text-charcoal/30 whitespace-nowrap">
                  {article.date}
                </span>
              </Link>
            </motion.div>
          ))}
          <div className="border-t border-charcoal/10 w-full"></div>
        </div>
      </div>
    </section>
  );
}
