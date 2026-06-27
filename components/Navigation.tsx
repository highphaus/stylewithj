'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-thalina-bg shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="w-full px-6 lg:px-12 flex justify-between items-center text-thalina-text">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start leading-none group">
          <span className="text-[9px] uppercase tracking-[0.25em] font-light text-thalina-text/60 mb-0.5">style with</span>
          <span className="text-2xl font-bold tracking-tight leading-none group-hover:opacity-70 transition-opacity font-serif">J</span>
          <span className="text-[9px] uppercase tracking-[0.3em] font-light text-thalina-text/70 mt-0.5">by jennifer</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-sans font-light items-center">
          <Link href="/services" className="relative group">
            <span>Services</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-thalina-text transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/portfolio" className="relative group">
            <span>Gallery</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-thalina-text transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="relative group">
            <span>About</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-thalina-text transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/connect" className="relative group">
            <span>Contact</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-thalina-text transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <div className="flex items-center gap-2 ml-4 hover:opacity-70 transition-opacity cursor-pointer">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
            <span>Log In</span>
          </div>

          <Link href="/connect" className="ml-4 px-6 py-2 border border-thalina-text relative overflow-hidden group flex items-center gap-2">
            <span className="absolute inset-0 bg-thalina-text translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Book Now</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 relative z-10 group-hover:text-white transition-colors duration-300"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden z-50">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1.5 p-2 text-thalina-text"
          >
            <span className={`block w-6 h-[1px] bg-thalina-text transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-[1px] bg-thalina-text transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-[1px] bg-thalina-text transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-thalina-bg z-40 transition-transform duration-500 ease-in-out flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-sans font-light text-thalina-text hover:opacity-50">Services</Link>
        <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-sans font-light text-thalina-text hover:opacity-50">Gallery</Link>
        <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-sans font-light text-thalina-text hover:opacity-50">About</Link>
        <Link href="/connect" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-sans font-light text-thalina-text hover:opacity-50">Contact</Link>
        <Link href="/connect" onClick={() => setMobileMenuOpen(false)} className="mt-8 px-10 py-3 border border-thalina-text text-thalina-text hover:bg-thalina-text hover:text-white transition-colors">Book Now</Link>
      </div>
    </nav>
  );
}