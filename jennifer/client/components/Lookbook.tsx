import React from 'react';
import Link from 'next/link';

const lookbookItems = [
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop",
    title: "Corporate Chic",
    span: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop",
    title: "Weekend Casual",
    span: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    image: "https://images.unsplash.com/photo-1550614000-4b95d4ed79ea?w=600&h=400&fit=crop",
    title: "Evening Gala",
    span: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop",
    title: "Minimalist Essentials",
    span: "col-span-1 md:col-span-2 row-span-1"
  },
  {
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&h=800&fit=crop",
    title: "Power Suiting",
    span: "col-span-1 md:col-span-1 row-span-2"
  },
  {
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=600&h=400&fit=crop",
    title: "Resort Wear",
    span: "col-span-1 md:col-span-1 row-span-1"
  }
];

export default function Lookbook({ hideButton = false }: { hideButton?: boolean }) {
  return (
    <section id="lookbook" className="py-32 px-6 lg:px-12 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-[#5D4037]/50 block mb-6">
            WHAT IN ME IS INSIDE
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#5D4037] font-medium">
            Portfolio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-3 gap-4 h-auto md:h-[900px]">
          {lookbookItems.map((item, i) => (
            <div 
              key={i} 
              className={`relative group overflow-hidden ${item.span} h-[300px] md:h-auto`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#5D4037]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-[#FFFFFF] font-sans text-xs tracking-widest uppercase font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {!hideButton && (
          <div className="text-center mt-16">
            <Link href="/portfolio" className="border border-[#5D4037]/30 text-[#5D4037] px-8 py-4 text-[10px] font-bold tracking-widest uppercase hover:bg-[#5D4037] hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-4">
              VIEW FULL PORTFOLIO
              <span className="text-lg leading-none">&rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
