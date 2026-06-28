// src/components/sections/AtelierFooter.tsx
'use client';

import Link from 'next/link';

export default function AtelierFooter() {
  return (
    <footer className="bg-[#0D0D0C] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Branding Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 pb-20 border-b border-white/10">
          <div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 block mb-4 font-mono">EST. 2016 · STUDIO PRIVÉ</span>
            <h2 className="text-4xl font-sans tracking-[0.15em] lowercase text-white">stylewithj</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-12">
            <p className="text-xs text-white/40 leading-relaxed font-light max-w-xs">
              Private design assemblies and material commissions arranged strictly by invitation or digital inquiry.
            </p>
            <Link href="mailto:studio@stylewithj.com" className="border border-white/20 text-center px-8 py-4 text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-white hover:text-black transition-all duration-400">
              Initiate Inquiry ↗
            </Link>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-xs border-b border-white/10">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6 font-medium">Philosophy</h4>
            <p className="text-white/40 leading-relaxed font-light max-w-xs">Minimalist design paths mapped out to emphasize structural textile craftsmanship and fine custom geometries.</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6 font-medium">Collections</h4>
            <ul className="flex flex-col gap-3 text-white/50 font-light">
              <li><Link href="#collections" className="hover:text-white transition-colors">Autumn / Winter</Link></li>
              <li><Link href="#collections" className="hover:text-white transition-colors">Archive Silhouettes</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6 font-medium">Studio Atelier</h4>
            <address className="text-white/50 font-light not-italic leading-relaxed">
              Private Design Suite,<br />
              Metropolitan Craft Zone,<br />
              By Appointment Only.
            </address>
          </div>
        </div>

        {/* Legal Signoff */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest uppercase text-white/25 font-mono">
          <p>© 2026 stylewithj. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}