import React from 'react';
import Link from 'next/link';

export default function AboutSection({ hideButton = false }: { hideButton?: boolean }) {
  return (
    <section id="about" className="py-32 px-6 lg:px-12 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left: Image & Stats Box */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80" 
            alt="Jenny consulting" 
            className="w-full h-[600px] object-cover"
          />
          {/* Stats Box overlay */}
          <div className="absolute -bottom-10 -left-6 lg:-left-12 bg-[#5D4037] text-[#FFFFFF] p-10 lg:p-12 shadow-2xl max-w-sm">
            <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-[#FFFFFF]/50 block mb-8">
              WHY WORK WITH JENNY?
            </span>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <span className="text-[#A1887F] text-lg">✓</span>
                <span className="font-sans text-[10px] tracking-widest uppercase font-bold">PERSONALIZED CONSULTATIONS</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-[#A1887F] text-lg">✓</span>
                <span className="font-sans text-[10px] tracking-widest uppercase font-bold">TAILORED TRANSFORMATION PLANS</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-[#A1887F] text-lg">✓</span>
                <span className="font-sans text-[10px] tracking-widest uppercase font-bold">CONFIDENTIAL & JUDGMENT-FREE PROCESS</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-[#A1887F] text-lg">✓</span>
                <span className="font-sans text-[10px] tracking-widest uppercase font-bold">LONG-TERM STYLE SOLUTIONS</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-col items-start mt-16 lg:mt-0 lg:pl-12">
          <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-[#5D4037]/50 block mb-6">
            ABOUT JENNY
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#5D4037] mb-8 font-medium leading-[1.2]">
            It's Not About Clothes.<br />
            It's About Confidence.
          </h2>
          <div className="font-sans text-sm text-[#5D4037]/70 leading-relaxed mb-10 max-w-lg space-y-4">
            <p>
              Your image is often the first thing people notice and remember.
            </p>
            <p>
              I believe personal styling is about far more than fashion. It's about helping people align how they present themselves with who they truly are and who they aspire to become.
            </p>
            <p>
              Through a personalized approach to styling, grooming, wardrobe strategy, and image consulting, I help individuals unlock greater confidence, credibility, and presence in every area of their lives.
            </p>
          </div>
          {!hideButton && (
            <Link href="/about" className="bg-[#5D4037] text-[#FFFFFF] px-8 py-4 flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase hover:bg-[#5D4037]/80 transition-colors w-max">
              MEET JENNY
              <span className="text-lg leading-none">&rarr;</span>
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}
