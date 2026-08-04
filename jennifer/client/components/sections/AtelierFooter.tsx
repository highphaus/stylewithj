// src/components/sections/AtelierFooter.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function AtelierFooter() {
  return (
    <footer className="bg-[#0D0D0C] text-white pt-14 sm:pt-24 pb-10 sm:pb-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        
        {/* Top Branding Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-10 pb-10 sm:pb-16 border-b border-white/10">
          <div className="w-full sm:w-auto flex justify-between items-center sm:block">
            <Image
              src="/images/style with j.png"
              alt="Style With J"
              width={160}
              height={50}
              className="w-32 sm:w-44 h-auto object-contain brightness-0 invert"
            />
          </div>
          
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-8 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-mono">DIRECT INQUIRIES</span>
              <a href="mailto:info@stylewithj.com" className="text-xs sm:text-sm font-sans font-light text-white/90 hover:text-white transition-colors">
                info@stylewithj.com
              </a>
            </div>
            <Link 
              href="mailto:info@stylewithj.com" 
              className="w-full sm:w-auto border border-white/20 text-center px-5 py-3 text-[9px] uppercase tracking-[0.25em] font-medium hover:bg-white hover:text-black transition-all duration-300 rounded-xs"
            >
              Initiate Inquiry ↗
            </Link>
          </div>
        </div>

        {/* Directory Grid - Ultra-responsive 2-column mobile / 4-column desktop layout */}
        <div className="py-10 sm:py-16 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-12 text-xs border-b border-white/10">
          
          {/* Col 1: Navigation Directory 1 */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 font-mono font-medium">Navigation</h4>
            <ul className="flex flex-col gap-2.5 text-white/60 font-light text-xs">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Me</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/lookbook" className="hover:text-white transition-colors">Lookbook</Link></li>
              <li><Link href="/transformations" className="hover:text-white transition-colors">Transformations</Link></li>
            </ul>
          </div>

          {/* Col 2: Navigation Directory 2 */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 font-mono font-medium">Explore</h4>
            <ul className="flex flex-col gap-2.5 text-white/60 font-light text-xs">
              <li><Link href="/services#categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/journal" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/insights" className="hover:text-white transition-colors">Insights</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Programs</Link></li>
              <li><Link href="/connect" className="hover:text-white transition-colors">Connect</Link></li>
            </ul>
          </div>

          {/* Col 3: Studio Location */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 font-mono font-medium">Studio Address</h4>
            <address className="text-white/60 font-light not-italic leading-relaxed">
              DLF Emporio, Vasant Kunj<br />
              New Delhi, Delhi 110070<br />
              India
            </address>
          </div>

          {/* Col 4: Social & Direct Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 font-mono font-medium">Social & Direct</h4>
            <div className="flex flex-row sm:flex-col gap-6 sm:gap-3.5 text-white/60 font-light">
              <a 
                href="https://instagram.com/stylewithj" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>

              <a 
                href="mailto:info@stylewithj.com" 
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>Email</span>
              </a>
            </div>
          </div>

        </div>

        {/* Legal Signoff */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-[9px] tracking-widest uppercase text-white/30 font-mono text-center sm:text-left">
          <p>© 2026 Style With J. All Rights Reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}