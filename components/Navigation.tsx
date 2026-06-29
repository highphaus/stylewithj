'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Visual Storyteller', href: '/about'     },
  { label: 'What We Do',         href: '/services'  },
  { label: 'Lookbook',           href: '/portfolio'       },
  { label: 'Gallery',            href: '/gallery'         },
  { label: 'Transformations',    href: '/transformations' },
  { label: 'Journal',            href: '/journal'         },
  { label: 'Connect',            href: '/connect'         },
];

export default function Navigation() {
  const pathname  = usePathname();
  const isHome    = pathname === '/';

  const [scrolled,        setScrolled]        = useState(false);
  const [visible,         setVisible]         = useState(true);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y <= 60) {
        setVisible(true);
      } else if (y > lastScrollY.current) {
        setVisible(false);   // scrolling down -> hide
      } else {
        setVisible(true);    // scrolling up -> reveal
      }
      lastScrollY.current = y;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --- colour tokens ---
  // Matches the transparent dark-mode feel on the hero, switches to a creamy white on scroll
  const isLight = scrolled || !isHome;

  return (
    <>
      {/* --- MAIN BAR --- */}
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500 ease-in-out',
          visible ? 'translate-y-0' : '-translate-y-full',
          scrolled
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-black/[0.04]'
            : 'bg-transparent',
          isLight ? 'text-[#1A1A1A]' : 'text-white/90',
        ].join(' ')}
      >
        <div className="w-full px-8 lg:px-16 flex items-center justify-between h-[88px]">

          {/* --- LEFT: Style with J Logo --- */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center hover:opacity-70 transition-opacity duration-300"
          >
            <Image
              src="/images/style with j.png"
              alt="Style With J"
              width={240}
              height={70}
              className={`w-[150px] md:w-[190px] h-auto object-contain transition-all duration-300 ${isLight ? '' : 'invert'}`}
              priority
              unoptimized
            />
          </Link>

          {/* --- RIGHT: Minimalist Premium Links --- */}
          <div className="hidden md:flex items-center gap-12">
            <ul className="flex items-center gap-10 list-none m-0 p-0">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[10px] tracking-[0.28em] uppercase font-light relative py-2 transition-opacity duration-300 hover:opacity-50"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- RIGHT (mobile): Sleek Multi-line Hamburger --- */}
          <button
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-[6px] p-2 z-50 mix-blend-difference"
          >
            <span className={`block w-6 h-[1px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-4 h-[1px] bg-white transition-all duration-300 ml-auto ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-[1px] bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>

        </div>
      </nav>

      {/* --- MOBILE FULL-SCREEN OVERLAY --- */}
      <div
        className={[
          'fixed inset-0 z-40 bg-[#111111] flex flex-col items-center justify-center gap-12',
          'transition-all duration-500 ease-in-out',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/80 text-xl font-serif font-light tracking-[0.25em] uppercase hover:text-white transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}