'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Services',   href: '/services'  },
  { label: 'Gallery',    href: '/portfolio'  },
  { label: 'About',      href: '/about'      },
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // --- colour tokens ---
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
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-black/[0.06]'
            : 'bg-transparent',
          isLight ? 'text-[#1A1A1A]' : 'text-white',
        ].join(' ')}
      >
        <div className="w-full px-8 lg:px-16 flex items-center justify-between h-[72px]">

          {/* --- LEFT: logo --- */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center hover:opacity-70 transition-opacity duration-300"
          >
            <Image
              src="/images/style with j.png"
              alt="Style With J"
              // Removed 'fill' and gave it explicit larger pixel dimensions
              width={260}
              height={80}
              // Tailwind classes control display scale responsiveness smoothly here
              className={`w-[180px] h-auto md:w-[260px] mt-8 transition-all duration-300 ${isLight ? '' : 'invert'}`}
              priority
              unoptimized
            />
          </Link>

          {/* --- RIGHT: desktop links --- */}
          <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'relative text-[10px] tracking-[0.22em] uppercase font-light',
                    'after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0',
                    'after:transition-all after:duration-300',
                    isLight
                      ? 'after:bg-[#1A1A1A] hover:opacity-60'
                      : 'after:bg-white   hover:opacity-60',
                    'hover:after:w-full transition-opacity duration-200',
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* --- RIGHT (mobile): hamburger --- */}
          <button
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-[5px] p-2 group"
          >
            <span className={`block w-6 h-[1px] bg-current transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-6 h-[1px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-[1px] bg-current transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>

        </div>
      </nav>

      {/* --- MOBILE FULL-SCREEN OVERLAY --- */}
      <div
        className={[
          'fixed inset-0 z-40 bg-[#FAF9F6] flex flex-col items-center justify-center gap-10',
          'transition-all duration-500 ease-in-out',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#1A1A1A] text-2xl font-serif font-light tracking-widest uppercase hover:opacity-40 transition-opacity duration-200"
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}