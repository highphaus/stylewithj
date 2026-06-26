import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md px-8 py-5 text-charcoal border-b border-charcoal/10 transition-all duration-500">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        {/* Left: Minimal Logo */}
        <Link href="/" className="flex flex-col items-start leading-none group">
          <span className="font-serif text-2xl tracking-[0.15em] uppercase font-light">JENNY</span>
          <span className="font-sans text-[7px] tracking-[0.4em] uppercase text-charcoal/60 mt-2 transition-colors group-hover:text-charcoal">PARIS • NEW YORK</span>
        </Link>

        {/* Right: Delicate Links */}
        <div className="hidden md:flex gap-12 text-[10px] font-light tracking-[0.25em] uppercase items-center">
          <Link href="/portfolio" className="hover:text-gold transition-colors duration-500">Selected Works</Link>
          <Link href="/transformations" className="hover:text-gold transition-colors duration-500">The Journey</Link>
          <Link href="/programs" className="hover:text-gold transition-colors duration-500">Experiences</Link>
          <Link href="/about" className="hover:text-gold transition-colors duration-500">The Vision</Link>
          
          <Link href="/connect" className="ml-4 border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-all duration-500">
            Let's Create
          </Link>
        </div>
      </div>
    </nav>
  );
}