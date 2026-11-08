'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSiteData } from '@/lib/use-site-data';

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
  const { ctaBanner, contact } = useSiteData();
  const currentPath = usePathname() || '/';
  const effectivePath = sourcePage || currentPath;
  const isHome = effectivePath === '/';

  // Form states for Home page direct message form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [selectedService, setSelectedService] = useState('Full Transformation');
  const [message, setMessage] = useState('I would like to book a Complete Style Makeover consultation with Jennifer.');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const homeKicker = isHome ? (ctaBanner?.kicker || matchedConfig.kicker) : matchedConfig.kicker;
  const homeTitle = isHome ? (ctaBanner?.title || matchedConfig.title) : matchedConfig.title;
  const homeSubtitle = isHome ? (ctaBanner?.subtitle || matchedConfig.subtitle) : matchedConfig.subtitle;
  const homeButtonText = isHome ? (ctaBanner?.buttonText || matchedConfig.buttonText) : matchedConfig.buttonText;

  const kicker = overrideKicker || homeKicker;
  const title = overrideTitle || homeTitle;
  const subtitle = overrideSubtitle || homeSubtitle;
  const buttonText = overrideButtonText || homeButtonText;
  const service = overrideService || matchedConfig.service;
  const booking = matchedConfig.booking;

  const targetHref = `/connect?service=${encodeURIComponent(service)}&booking=${encodeURIComponent(booking)}#book-makeover`;
  const cleanPhone = contact?.whatsappPhone || '918078341747';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi Jennifer, I would like to inquire about ${title} (${service}).`)}`;

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          location,
          service: selectedService,
          message,
          locationText: 'Home Page Direct Inquiry'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send inquiry. Please try again.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error('Submission error:', err);
      const errMsg = err instanceof Error ? err.message : 'Failed to send inquiry. Please try again.';
      setErrorMessage(errMsg);
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section 
      aria-label={title}
      className={`w-full border-t border-black/10 bg-[#FAF9F6] text-[#1A1A1A] py-14 sm:py-20 px-4 sm:px-8 lg:px-12 ${className}`}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Section Header (Hidden on Home Page as requested) */}
        {!isHome && (
          <div className="flex flex-col items-start gap-3 pb-6 border-b border-black/10">
            <span className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.35em] uppercase text-black/45 block font-semibold">
              ✦ {kicker}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1A1A1A] leading-snug">
              {title}
            </h2>
            <p className="font-sans text-xs sm:text-sm font-light text-black/65 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          </div>
        )}

        {/* ON HOME PAGE: Embedded Direct Connect / Mail Form */}
        {isHome ? (
          <div className="w-full bg-[#FAF8F3] border border-black/10 p-6 sm:p-10 md:p-12 rounded-xs shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
            <div className="mb-8">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-black/50 block mb-2 font-semibold">
                ✦ STYLING INQUIRY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
                Send Us a Message
              </h2>
            </div>
            {submitted ? (
              <div className="py-8 px-4 text-center flex flex-col items-center gap-4 bg-[#EFECE6] border border-black/10 rounded-xs">
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xl shadow-sm">
                  ✓
                </div>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/50 font-bold">
                  CONFIRMATION RECEIPT
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
                  Message Sent Successfully!
                </h3>
                <p className="font-sans text-xs sm:text-sm text-black/80 max-w-md leading-relaxed font-light">
                  Thank you, <strong className="font-semibold text-black">{firstName}</strong>! Your style makeover inquiry has been sent directly to Jennifer. We will connect with you shortly via phone.
                </p>
                <div className="mt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFirstName('');
                      setLastName('');
                      setPhone('');
                      setLocation('');
                      setMessage('I would like to book a Complete Style Makeover consultation with Jennifer.');
                    }}
                    className="px-6 py-3 bg-[#1A1A1A] hover:bg-black text-white text-[9px] font-mono uppercase tracking-[0.22em] font-semibold rounded-xs transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 sm:gap-8">
                {errorMessage && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-mono rounded-xs">
                    {errorMessage}
                  </div>
                )}

                {/* Row 1: First Name & Last Name (Pure Placeholders, No Labels) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="First Name *"
                    className="bg-transparent border-b border-black/30 pb-3 font-sans text-sm focus:border-black focus:outline-none transition-colors text-black placeholder:text-black/45" 
                    required 
                  />
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Last Name *"
                    className="bg-transparent border-b border-black/30 pb-3 font-sans text-sm focus:border-black focus:outline-none transition-colors text-black placeholder:text-black/45" 
                    required 
                  />
                </div>

                {/* Row 2: Phone Number & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className="bg-transparent border-b border-black/30 pb-3 font-sans text-sm focus:border-black focus:outline-none transition-colors text-black placeholder:text-black/45" 
                    required 
                  />
                  <input 
                    type="text" 
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Location / City *"
                    className="bg-transparent border-b border-black/30 pb-3 font-sans text-sm focus:border-black focus:outline-none transition-colors text-black placeholder:text-black/45" 
                    required 
                  />
                </div>

                {/* Row 3: Service Selection Dropdown */}
                <div>
                  <select 
                    value={selectedService}
                    onChange={e => setSelectedService(e.target.value)}
                    className="w-full bg-transparent border-b border-black/30 pb-3 font-sans text-sm focus:border-black focus:outline-none transition-colors text-black/90 cursor-pointer"
                    required
                  >
                    <option value="Full Transformation" className="bg-[#FAF8F3] text-black">Complete Style Makeover / Full Transformation</option>
                    <option value="Personal Styling" className="bg-[#FAF8F3] text-black">Personal Styling & Silhouette Discovery</option>
                    <option value="Wardrobe Styling" className="bg-[#FAF8F3] text-black">Wardrobe Styling & Closet Audit</option>
                    <option value="Personal Shopping" className="bg-[#FAF8F3] text-black">Personal Shopping (Curated Itineraries)</option>
                    <option value="Occasion Styling" className="bg-[#FAF8F3] text-black">Occasion & Bridal Styling</option>
                    <option value="Workwear Styling" className="bg-[#FAF8F3] text-black">Workwear & Leadership Presence</option>
                    <option value="Bespoke Consultation" className="bg-[#FAF8F3] text-black">Bespoke 1-on-1 Consultation</option>
                  </select>
                </div>

                {/* Row 4: Message Textarea */}
                <textarea 
                  rows={3} 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Your Message / Styling Goals *"
                  className="bg-transparent border-b border-black/30 pb-3 font-sans text-sm focus:border-black focus:outline-none resize-none transition-colors text-black placeholder:text-black/45" 
                  required
                />

                {/* Submit Action Button & WhatsApp in one horizontal line on mobile */}
                <div className="pt-2 flex flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-3 px-3 min-[360px]:px-5 sm:px-8 py-3.5 sm:py-4 bg-[#1A1A1A] hover:bg-black text-white text-[8.5px] min-[360px]:text-[9.5px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.25em] uppercase font-mono font-medium transition-all shadow-sm rounded-xs disabled:opacity-50 cursor-pointer text-center whitespace-nowrap"
                  >
                    <span>{isSubmitting ? 'Transmitting...' : 'Submit Message →'}</span>
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 min-[360px]:px-4 sm:px-6 py-3.5 sm:py-4 border border-black/15 hover:border-black text-[#1A1A1A] text-[8.5px] min-[360px]:text-[9.5px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.2em] uppercase font-mono font-medium transition-colors rounded-xs text-center whitespace-nowrap"
                  >
                    <span>WhatsApp</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* ON INNER PAGES: Clean Minimal Banner with Dual Action Buttons (single horizontal line on mobile) */
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-2">
            <div className="flex flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Link
                href={targetHref}
                className="flex-1 sm:flex-initial group inline-flex items-center justify-center gap-1.5 sm:gap-3 px-3 min-[360px]:px-5 sm:px-8 py-3.5 sm:py-4 bg-[#1A1A1A] hover:bg-black text-white text-[8.5px] min-[360px]:text-[9.5px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.25em] uppercase font-mono font-medium transition-all duration-300 shadow-sm hover:shadow-md rounded-xs border border-white/10 active:scale-98 text-center whitespace-nowrap"
              >
                <span>{buttonText}</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform text-xs">→</span>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 min-[360px]:px-4 sm:px-6 py-3.5 sm:py-4 border border-black/15 hover:border-black text-[#1A1A1A] text-[8.5px] min-[360px]:text-[9.5px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.2em] uppercase font-mono font-medium transition-colors rounded-xs text-center whitespace-nowrap"
              >
                <span>WhatsApp</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
            <div className="flex items-center gap-3 text-xs text-black/50 font-light font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider">Concierge Responds Within 4 Hours</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
