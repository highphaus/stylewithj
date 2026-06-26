import React from 'react';
import Link from 'next/link';

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

export default function InsightsSection() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
        {/* Left Header */}
        <div className="lg:w-1/3 flex flex-col items-start">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#5D4037]/50 block mb-6">
            LATEST ARTICLES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#5D4037] font-medium leading-tight mb-10">
            Insights on Style, Confidence & Personal Branding
          </h2>
          <Link href="#" className="border-b border-[#5D4037] text-[#5D4037] pb-1 text-[11px] font-bold tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-2">
            View All Articles
            <span className="text-lg leading-none">&rarr;</span>
          </Link>
        </div>

        {/* Right Articles List */}
        <div className="lg:w-2/3 flex flex-col">
          {articles.map((article, index) => (
            <Link 
              key={index} 
              href="#" 
              className="group py-8 border-t border-[#5D4037]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#5D4037] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#5D4037]/50 w-24">
                  {article.category}
                </span>
                <h3 className="font-serif text-2xl text-[#5D4037] group-hover:italic transition-all">
                  {article.title}
                </h3>
              </div>
              <span className="font-sans text-[10px] tracking-widest uppercase text-[#5D4037]/40 whitespace-nowrap">
                {article.date}
              </span>
            </Link>
          ))}
          <div className="border-t border-[#5D4037]/10 w-full"></div>
        </div>
      </div>
    </section>
  );
}
