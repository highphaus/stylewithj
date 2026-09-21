'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PageCtaConfig {
  kicker: string;
  title: string;
  subtitle: string;
  buttonText: string;
  service: string;
  booking: string;
}

const PAGE_CONFIGS: Record<string, PageCtaConfig> = {
  '/': {
    kicker: 'BESPOKE STYLING',
    title: 'Ready for Your Complete Style Makeover?',
    subtitle: 'Discover an intentional wardrobe designed around your silhouette and authentic presence.',
    buttonText: 'Book The Makeover',
    service: 'Full Transformation',
    booking: 'makeover',
  },
  '/about': {
    kicker: 'BESPOKE CONSULTATION',
    title: 'Begin Your Style Story With Jennifer',
    subtitle: 'Experience personal styling grounded in confidence, comfort, and timeless elegance.',
    buttonText: 'Book Your Consultation',
    service: 'Personal Styling',
    booking: 'consultation',
  },
  '/services': {
    kicker: 'ATELIER CURATION',
    title: 'Choose Your Wardrobe Evolution',
    subtitle: 'From corporate workwear to complete style overhauls, select the experience tailored for you.',
    buttonText: 'Book The Makeover',
    service: 'Full Transformation',
    booking: 'makeover',
  },
  '/transformations': {
    kicker: 'SILHOUETTE TRANSFORMATION',
    title: 'Ready To See Your Own Transformation?',
    subtitle: 'Step into tailored silhouette balancing, posture alignment, and complete wardrobe elevation.',
    buttonText: 'Book Your Transformation',
    service: 'Full Transformation',
    booking: 'makeover',
  },
  '/lookbook': {
    kicker: 'EDITORIAL ARCHIVE',
    title: 'Bring These Silhouettes Into Your Wardrobe',
    subtitle: 'Custom-curated styling sessions translating editorial aesthetics to your real-life occasions.',
    buttonText: 'Book Your Style Curation',
    service: 'Occasion Styling',
    booking: 'curation',
  },
  '/categories': {
    kicker: 'CURATED OCCASIONS',
    title: 'Find Your Signature Occasion Look',
    subtitle: 'Personalized styling for executive boardrooms, destination celebrations, and milestone events.',
    buttonText: 'Book The Makeover',
    service: 'Full Transformation',
    booking: 'makeover',
  },
  '/blog': {
    kicker: 'THE JOURNAL',
    title: 'Turn Style Insights Into A Signature Image',
    subtitle: 'Translate styling theory into an effortless everyday wardrobe with 1-on-1 guidance.',
    buttonText: 'Book The Makeover',
    service: 'Full Transformation',
    booking: 'makeover',
  },
};

const DEFAULT_CONFIG: PageCtaConfig = {
  kicker: 'ATELIER CONSULTATION',
  title: 'Curate Your Signature Presence',
  subtitle: 'Bespoke personal styling and wardrobe consultation with Jennifer.',
  buttonText: 'Book The Makeover',
  service: 'Full Transformation',
  booking: 'makeover',
};

interface BookMakeoverCTAProps {
  className?: string;
  sourcePage?: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  service?: string;
}

export default function BookMakeoverCTA({
  className = '',
  sourcePage,
  kicker: overrideKicker,
  title: overrideTitle,
  subtitle: overrideSubtitle,
  buttonText: overrideButtonText,
  service: overrideService,
}: BookMakeoverCTAProps) {
  const currentPath = usePathname() || '/';
  const effectivePath = sourcePage || currentPath;

  // Exact match or blog subpage matching
  let matchedConfig = PAGE_CONFIGS[effectivePath];
  if (!matchedConfig) {
    if (effectivePath.startsWith('/blog/')) {
      matchedConfig = {
        kicker: 'PERSONAL IMAGE CONSULTING',
        title: 'Apply This Guide To Your Personal Wardrobe',
        subtitle: 'Work directly with Jennifer to build an elevated, personalized aesthetic.',
        buttonText: 'Book The Makeover',
        service: 'Full Transformation',
        booking: 'makeover',
      };
    } else if (effectivePath.startsWith('/lookbook/')) {
      matchedConfig = {
        kicker: 'BESPOKE SILHOUETTE',
        title: 'Inquire About This Bespoke Styling',
        subtitle: 'Book a personal consultation to adapt this silhouette to your measurements and lifestyle.',
        buttonText: 'Book The Makeover',
        service: 'Occasion Styling',
        booking: 'makeover',
      };
    } else {
      matchedConfig = DEFAULT_CONFIG;
    }
  }

  const kicker = overrideKicker || matchedConfig.kicker;
  const title = overrideTitle || matchedConfig.title;
  const subtitle = overrideSubtitle || matchedConfig.subtitle;
  const buttonText = overrideButtonText || matchedConfig.buttonText;
  const service = overrideService || matchedConfig.service;
  const booking = matchedConfig.booking;

  const targetHref = `/connect?service=${encodeURIComponent(service)}&booking=${encodeURIComponent(booking)}#book-makeover`;

  return (
    <section 
      aria-label={title}
      className={`w-full border-t border-black/10 bg-[#FAF9F6] text-[#1A1A1A] py-12 sm:py-16 px-4 sm:px-8 lg:px-12 ${className}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
        
        {/* Left: Minimal Typographic Messaging */}
        <div className="max-w-2xl">
          <span className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.35em] uppercase text-black/45 block mb-2 font-semibold">
            ✦ {kicker}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#1A1A1A] leading-snug">
            {title}
          </h2>
          <p className="font-sans text-xs sm:text-sm font-light text-black/65 mt-2 leading-relaxed max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* Right: Minimal Refined Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto flex-shrink-0">
          <Link
            href={targetHref}
            className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#1A1A1A] hover:bg-black text-white text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.25em] font-medium transition-all duration-200 rounded-xs shadow-xs"
          >
            <span>{buttonText}</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-200 text-xs">
              →
            </span>
          </Link>

          <a
            href={`https://wa.me/918078341747?text=${encodeURIComponent(`Hi Jennifer, I would like to inquire about ${title} (${service}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-black/60 hover:text-black text-[9px] font-mono uppercase tracking-[0.2em] font-medium border border-black/10 hover:border-black/30 transition-all duration-200 rounded-xs bg-white/60"
          >
            <span>WhatsApp Concierge</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>

      </div>
    </section>
  );
}
