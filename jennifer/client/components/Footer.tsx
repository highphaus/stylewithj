import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream pt-32 pb-10 px-6 lg:px-12 border-t border-cream/10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Massive Logo */}
        <div className="mb-24 text-center md:text-left">
          <span className="font-serif text-[80px] md:text-[150px] lg:text-[200px] leading-none tracking-tighter block font-light text-cream/90 hover:text-white transition-colors duration-700">
            JENNY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-32">
          {/* Bio Column */}
          <div className="md:col-span-4 lg:col-span-3">
            <span className="font-sans text-[9px] tracking-[0.4em] uppercase font-light text-cream/50 mb-8 block leading-relaxed">
              Personal Stylist<br/>Image Consultant<br/>Brand Strategist
            </span>
            <p className="font-sans text-xs text-cream/70 leading-loose font-light pr-4">
              Helping ambitious individuals transform their image, build confidence, and create lasting impressions globally.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 lg:col-span-2">
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase font-light text-cream/40 block mb-8">
              EXPLORE
            </span>
            <ul className="space-y-4 font-sans text-xs text-cream/70 font-light">
              <li><Link href="/about" className="hover:text-gold hover:pl-2 transition-all duration-300">The Vision</Link></li>
              <li><Link href="/programs" className="hover:text-gold hover:pl-2 transition-all duration-300">Experiences</Link></li>
              <li><Link href="/portfolio" className="hover:text-gold hover:pl-2 transition-all duration-300">Selected Works</Link></li>
              <li><Link href="/transformations" className="hover:text-gold hover:pl-2 transition-all duration-300">The Journey</Link></li>
              <li><Link href="/insights" className="hover:text-gold hover:pl-2 transition-all duration-300">Insights</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase font-light text-cream/40 block mb-8">
              JOIN THE INNER CIRCLE
            </span>
            <p className="font-sans text-xs text-cream/70 leading-loose font-light mb-8">
              Subscribe to receive exclusive insights on style, personal branding, and access to private masterclasses.
            </p>
            <form className="relative flex items-center border-b border-cream/30 pb-2 group">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent w-full font-sans text-[10px] tracking-[0.2em] text-cream placeholder-cream/30 focus:outline-none focus:ring-0"
              />
              <button type="submit" className="font-sans text-[10px] tracking-[0.3em] uppercase text-cream group-hover:text-gold transition-colors duration-300">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-cream/40 font-light">
            &copy; {new Date().getFullYear()} JENNY. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-8 font-sans text-[9px] tracking-[0.3em] uppercase text-cream/40 font-light">
            <a href="#" className="hover:text-gold transition-colors duration-300">INSTAGRAM</a>
            <a href="#" className="hover:text-gold transition-colors duration-300">LINKEDIN</a>
            <a href="#" className="hover:text-gold transition-colors duration-300">PINTEREST</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
