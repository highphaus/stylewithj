'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'About Me',           href: '/about'     },
  { label: 'What We Do',         href: '/services'  },
  { label: 'Categories',         href: '/categories'},
  { label: 'Lookbook',           href: '/lookbook'  },
  { label: 'Transformations',    href: '/transformations' },
  { label: 'Blog',               href: '/blog'            },
  { label: 'Connect',            href: '/connect'         },
];

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 100);
      
      // Scrolling up or down always hides the navigation bar
      // except when we are at the absolute top of the page.
      if (y <= 100) {
        setVisible(true);
      } else {
        setVisible(false);
        setMobileMenuOpen(false); // Auto close mobile dropdown on scroll
      }
      lastScrollY.current = y;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Force close/hide nav bar on route change
  useEffect(() => {
    if (window.scrollY > 100) {
      setVisible(false);
    }
    setMobileMenuOpen(false);
  }, [pathname]);

  const isLight = scrolled || !isHome || (isMobile && mobileMenuOpen);

  const handleToggle = () => {
    if (isMobile) {
      setMobileMenuOpen(prev => {
        const next = !prev;
        if (next) {
          setVisible(true); // make sure parent nav is visible
        }
        return next;
      });
    } else {
      setVisible(prev => !prev);
    }
  };

  const isButtonActive = isMobile ? mobileMenuOpen : visible;

  return (
    <>
      {/* ── MAIN TOP BAR / HEADER NAVIGATION ── */}
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-40',
          'transition-all duration-500 ease-in-out',
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none',
          scrolled || (isMobile && mobileMenuOpen)
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-black/[0.04]'
            : 'bg-transparent',
          isLight ? 'text-[#1A1A1A]' : 'text-white/90',
        ].join(' ')}
      >
        {/* Main Flex Bar */}
        <div className="w-full px-6 sm:px-8 lg:px-16 flex items-center justify-between h-[88px]">

          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center hover:opacity-75 transition-opacity duration-300"
          >
            <Image
              src="/images/style with j.png"
              alt="Style With J"
              width={240}
              height={70}
              className={`w-[140px] md:w-[190px] h-auto object-contain transition-all duration-300 ${isLight ? '' : 'invert'}`}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Links (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-12 pr-24">
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

        </div>

        {/* Mobile Dropdown Panel (Shown when navigation bar is active and visible on mobile) */}
        {isMobile && mobileMenuOpen && (
          <div className="md:hidden w-full bg-[#FAF9F6] border-t border-black/[0.04] flex flex-col px-6 py-6 gap-3 shadow-lg">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setVisible(false);
                }}
                className="text-[#1A1A1A] text-[13px] font-sans font-light tracking-[0.2em] uppercase py-2.5 border-b border-black/[0.02] last:border-b-0"
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* ── DYNAMIC SINGLE BUTTON CONTROLLER (Menu Badge / Hide Trigger) ── */}
      <div className="fixed right-3.5 sm:right-6 top-[16px] sm:top-[18px] z-50 flex items-center h-[44px] sm:h-[52px]">
        <button
          onClick={handleToggle}
          className={[
            'group flex items-center justify-center gap-2 sm:gap-3 px-3.5 py-2 sm:px-5 sm:py-3 rounded-full border transition-all duration-500 ease-out shadow-sm',
            isButtonActive 
              ? `bg-[#FAF9F6]/90 border-black/10 text-[#1A1A1A] hover:border-black/30` 
              : 'bg-black/90 hover:bg-black border-white/10 text-white shadow-2xl hover:scale-105'
          ].join(' ')}
        >
          {isButtonActive ? (
            /* "Hide" morph structure when navigation bar is visible */
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.35em] uppercase font-light text-[#1A1A1A]/70 group-hover:text-black">
                Hide
              </span>
              <span className="font-sans text-[10px] sm:text-xs font-light text-[#1A1A1A]/70 group-hover:text-black transition-transform duration-500 group-hover:rotate-90 inline-block">
                ✕
              </span>
            </div>
          ) : (
            /* "Menu" morph structure when navigation bar is hidden */
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <div className="flex flex-col gap-[3px] sm:gap-[4px] w-3.5 sm:w-4">
                <span className="w-full h-[1px] bg-white transition-transform duration-300 group-hover:scale-x-75 group-hover:-translate-x-0.5" />
                <span className="w-full h-[1px] bg-white transition-transform duration-300 group-hover:translate-x-0.5" />
                <span className="w-full h-[1px] bg-white transition-transform duration-300 group-hover:scale-x-50 group-hover:-translate-x-1" />
              </div>
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.35em] uppercase font-light pl-0.5">
                Menu
              </span>
            </div>
          )}
        </button>
      </div>
    </>
  );
}