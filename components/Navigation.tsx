import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-[#FFFFFF] px-8 py-4 text-[#5D4037] border-b border-[#5D4037]/10">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        {/* Left: Minimal Logo */}
        <Link href="/" className="flex flex-col items-start leading-none group">
          <span className="font-serif text-xl tracking-[0.2em] uppercase font-light">STYLE WITH J</span>
          <span className="font-sans text-[7px] tracking-[0.3em] uppercase text-[#5D4037]/60 mt-1 transition-colors group-hover:text-[#5D4037]">BY JENNIFER</span>
        </Link>

        {/* Right: Delicate Links */}
        <div className="hidden md:flex gap-10 text-[9px] font-medium tracking-[0.25em] uppercase items-center">
          <Link href="/portfolio" className="hover:opacity-60 transition-opacity">Portfolio</Link>
          <Link href="/transformations" className="hover:opacity-60 transition-opacity">Transformations</Link>
          <Link href="/programs" className="hover:opacity-60 transition-opacity">Programs</Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">Meet Jennifer</Link>
          
          {/* Subtle line separator */}
          <div className="w-[1px] h-3 bg-[#5D4037]/30 mx-2"></div>
          
          <Link href="/connect" className="bg-[#5D4037] text-[#FFFFFF] px-6 py-2 rounded-full font-sans text-[9px] tracking-widest uppercase hover:bg-[#5D4037]/80 transition-colors">
            Connect With Us
          </Link>
        </div>
      </div>
    </nav>
  );
}