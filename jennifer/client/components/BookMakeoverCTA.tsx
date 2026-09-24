'use client';

import React, { useState } from 'react';
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
  const isHome = effectivePath === '/';

  // Form states for Home page direct message form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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

  const kicker = overrideKicker || matchedConfig.kicker;
  const title = overrideTitle || matchedConfig.title;
  const subtitle = overrideSubtitle || matchedConfig.subtitle;
  const buttonText = overrideButtonText || matchedConfig.buttonText;
  const service = overrideService || matchedConfig.service;
  const booking = matchedConfig.booking;

  const targetHref = `/connect?service=${encodeURIComponent(service)}&booking=${encodeURIComponent(booking)}#book-makeover`;
  const whatsappUrl = `https://wa.me/918078341747?text=${encodeURIComponent(`Hi Jennifer, I would like to inquire about ${title} (${service}).`)}`;

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
          email,
          phone,
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
                  Thank you, <strong className="font-semibold text-black">{firstName}</strong>! Your style makeover inquiry has been sent directly to Jennifer. We will connect with you shortly.
                </p>
                <div className="mt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFirstName('');
                      setLastName('');
                      setEmail('');
                      setPhone('');
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

                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] font-light tracking-wider text-black/60 uppercase">
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="e.g. Maya"
                      className="bg-transparent border-b border-black/30 pb-2 font-sans text-sm focus:border-black focus:outline-none transition-colors placeholder:text-black/30" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] font-light tracking-wider text-black/60 uppercase">
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="e.g. Sen"
                      className="bg-transparent border-b border-black/30 pb-2 font-sans text-sm focus:border-black focus:outline-none transition-colors placeholder:text-black/30" 
                      required 
                    />
                  </div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] font-light tracking-wider text-black/60 uppercase">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. maya@example.com"
                      className="bg-transparent border-b border-black/30 pb-2 font-sans text-sm focus:border-black focus:outline-none transition-colors placeholder:text-black/30" 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] font-light tracking-wider text-black/60 uppercase">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 80783 41747"
                      className="bg-transparent border-b border-black/30 pb-2 font-sans text-sm focus:border-black focus:outline-none transition-colors placeholder:text-black/30" 
                      required 
                    />
                  </div>
                </div>

                {/* Service Selection Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[11px] font-light tracking-wider text-black/60 uppercase">
                    Select Your Styling Curation *
                  </label>
                  <select 
                    value={selectedService}
                    onChange={e => setSelectedService(e.target.value)}
                    className="bg-transparent border-b border-black/30 pb-2 font-sans text-sm focus:border-black focus:outline-none transition-colors text-black/90 cursor-pointer"
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

                {/* Message Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[11px] font-light tracking-wider text-black/60 uppercase">
                    Tell Jennifer About Your Style Goals *
                  </label>
                  <textarea 
                    rows={3} 
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="bg-transparent border-b border-black/30 pb-2 font-sans text-sm focus:border-black focus:outline-none resize-none transition-colors" 
                    required
                  />
                </div>

                {/* Submit Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-4 bg-[#1A1A1A] hover:bg-black text-white font-mono text-[9.5px] sm:text-[10px] font-medium uppercase tracking-[0.25em] transition-colors shadow-sm rounded-xs cursor-pointer disabled:opacity-50 text-center"
                  >
                    {isSubmitting ? 'Transmitting Email...' : 'Send Message →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* ON OTHER PAGES: Compact Banner with CTA and WhatsApp */
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 self-start">
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
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-black/60 hover:text-black text-[9px] font-mono uppercase tracking-[0.2em] font-medium border border-black/10 hover:border-black/30 transition-all duration-200 rounded-xs bg-white/60"
            >
              <span>WhatsApp Concierge</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
