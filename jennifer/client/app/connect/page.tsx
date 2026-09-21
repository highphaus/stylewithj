'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';

function ConnectContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  const bookingParam = searchParams.get('booking');
  const inquiryParam = searchParams.get('inquiry');
  const isMakeover = bookingParam === 'makeover' || serviceParam === 'Full Transformation';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(
    serviceParam || (bookingParam === 'makeover' ? 'Full Transformation' : '')
  );
  const [message, setMessage] = useState(
    inquiryParam || (isMakeover ? 'I would like to book a Complete Style Makeover consultation with Jennifer.' : '')
  );

  // Sync with searchParams if they change
  useEffect(() => {
    if (serviceParam) {
      setService(serviceParam);
    } else if (bookingParam === 'makeover') {
      setService('Full Transformation');
    }

    if (inquiryParam) {
      setMessage(inquiryParam);
    } else if (bookingParam === 'makeover' || serviceParam === 'Full Transformation') {
      setMessage((prev) => prev || 'I would like to book a Complete Style Makeover consultation with Jennifer.');
    }
  }, [serviceParam, bookingParam, inquiryParam]);

  // Location detection state
  const [locationStatus, setLocationStatus] = useState<'detecting' | 'success' | 'permission_denied' | 'error'>('detecting');
  const [locationText, setLocationText] = useState('Detecting your location for priority concierge response...');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-detect browser location on component mount for fast response
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoords({ lat, lng });

          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2500);
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
              { signal: controller.signal }
            );
            clearTimeout(timeoutId);
            const data = await res.json();
            const city = data.city || data.locality || data.principalSubdivision || 'Local Area';
            const country = data.countryName || 'India';
            setLocationText(`📍 Priority Location: ${city}, ${country}`);
            setLocationStatus('success');
          } catch {
            setLocationText(`📍 Location Coordinates: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`);
            setLocationStatus('success');
          }
        },
        (error) => {
          setLocationText('📍 Location: Regional Concierge (Optional)');
          setLocationStatus('permission_denied');
        },
        { timeout: 3000, enableHighAccuracy: false, maximumAge: 300000 }
      );
    } else {
      setLocationText('📍 Location: Concierge Regional Service');
      setLocationStatus('error');
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
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
          service,
          message,
          locationText,
          coords
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send enquiry');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error('Submission error:', err);
      const errMsg = err instanceof Error ? err.message : 'Failed to send enquiry. Please try again.';
      setErrorMessage(errMsg);
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-8 max-w-[1000px] mx-auto">
      <div className="text-center mb-10 sm:mb-16">
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-3 font-semibold">
          ✦ STYLING CONSULTATION
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#1A1A1A]">
          Let&apos;s Connect
        </h1>
      </div>
      
      {/* ── SEND MESSAGE SECTION ── */}
      <div id="book-makeover" className="w-full bg-[#FAF8F3] border border-black/10 p-6 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.02)] rounded-sm mb-16 relative scroll-mt-28">
        
        {/* VIP Makeover Reservation Banner */}
        {isMakeover && (
          <div className="mb-8 p-5 sm:p-6 bg-[#1A1A1A] text-white rounded-xs border border-white/10 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5 max-w-xl">
              <div className="flex items-center gap-2 font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.3em] uppercase text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                MAKEOVER PRIORITY RESERVATION ACTIVE
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-white leading-snug">
                Complete Style Makeover Package Selected
              </h3>
              <p className="font-sans text-xs text-white/75 font-light leading-relaxed">
                Your 1-on-1 wardrobe and silhouette transformation is ready to be scheduled. Complete the form below, and Jennifer will contact you directly to confirm your consultation timeline.
              </p>
            </div>
            <div className="px-3.5 py-2 bg-white/10 border border-white/15 rounded-xs font-mono text-[9px] uppercase tracking-wider text-white/90 flex-shrink-0">
              ✦ Direct Atelier Dispatch
            </div>
          </div>
        )}

        {/* Dynamic Location Badge */}
        <div className="mb-8 p-3.5 bg-[#EFECE6] border-l-2 border-[#1A1A1A] text-[9px] sm:text-[10px] font-mono tracking-wider text-black/75 flex items-center justify-between flex-wrap gap-2 rounded-xs">
          <span>{locationText}</span>
          <span className="text-[8px] uppercase font-bold text-black/60 px-2.5 py-1 bg-white rounded-xs border border-black/10">
            {locationStatus === 'success' ? 'GPS Active 📍' : 'Location Optional'}
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-light mb-8 text-[#1A1A1A]">Send Us a Message</h2>

        {submitted ? (
          <div className="p-8 sm:p-12 bg-[#EFECE6] border-2 border-black text-center flex flex-col items-center gap-5 rounded-xs shadow-md">
            <div className="w-14 h-14 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-2xl shadow-sm">
              ✓
            </div>

            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/50 font-bold">
              CONFIRMATION RECEIPT
            </span>

            <h3 className="font-serif text-2xl sm:text-4xl font-light text-[#1A1A1A]">
              Message Sent Successfully!
            </h3>

            <p className="font-sans text-xs sm:text-sm text-black/80 max-w-lg leading-relaxed font-light">
              Thank you, <strong className="font-semibold text-black">{firstName}</strong>! Your consultation request, contact details, and location context have been transmitted directly to Jennifer at <strong className="font-semibold text-black">jennifer@stylewithj.in</strong>.
            </p>

            <div className="p-4 bg-white/90 border border-black/10 text-left w-full max-w-md font-mono text-[9px] text-black/80 rounded-xs space-y-1.5 shadow-xs">
              <p><strong>Client Name:</strong> {firstName} {lastName}</p>
              <p><strong>Phone Number:</strong> {phone}</p>
              <p><strong>Email Address:</strong> {email}</p>
              <p><strong>Selected Service:</strong> {service || 'General Inquiry'}</p>
              <p><strong>Detected Location:</strong> {locationText.replace('📍 ', '')}</p>
              {coords && (
                <p><strong>GPS Coordinates:</strong> {coords.lat.toFixed(4)}°, {coords.lng.toFixed(4)}°</p>
              )}
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
                setMessage('');
                setService('');
              }}
              className="mt-2 px-8 py-3.5 bg-[#1A1A1A] hover:bg-black text-white text-[9px] font-mono uppercase tracking-[0.25em] font-semibold cursor-pointer rounded-xs transition-colors shadow-sm"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {errorMessage && (
              <div className="p-4 bg-red-100 border border-red-300 text-red-800 text-xs font-mono rounded-xs">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-light tracking-wider text-black/60 uppercase">First Name *</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="bg-transparent border-b border-black/30 pb-2 font-sans focus:border-black focus:outline-none transition-colors" 
                  required 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-light tracking-wider text-black/60 uppercase">Last Name *</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="bg-transparent border-b border-black/30 pb-2 font-sans focus:border-black focus:outline-none transition-colors" 
                  required 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-light tracking-wider text-black/60 uppercase">Email *</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-transparent border-b border-black/30 pb-2 font-sans focus:border-black focus:outline-none transition-colors" 
                  required 
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-light tracking-wider text-black/60 uppercase">Phone Number *</label>
                <input 
                  type="tel" 
                  value={phone}
                  placeholder="Enter your phone number (e.g., +91 80783 41747)"
                  onChange={e => setPhone(e.target.value)}
                  className="bg-transparent border-b border-black/30 pb-2 font-sans focus:border-black focus:outline-none transition-colors text-black placeholder:text-black/35" 
                  required 
                />
              </div>
            </div>

            {/* HIGH-FASHION DESIGNER VIBE DROPDOWN HEADING */}
            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs font-light tracking-wider text-black/60 uppercase">
                SELECT YOUR STYLING CURATION *
              </label>
              <select 
                value={service}
                onChange={e => setService(e.target.value)}
                className="bg-transparent border-b border-black/30 pb-2 font-sans focus:border-black focus:outline-none transition-colors text-black/90 cursor-pointer"
                required
              >
                <option value="" disabled className="bg-[#FAF8F3] text-black/50">Choose Your Desired Styling Service...</option>
                <option value="Personal Styling" className="bg-[#FAF8F3] text-black">Personal Styling</option>
                <option value="Wardrobe Styling" className="bg-[#FAF8F3] text-black">Wardrobe Styling</option>
                <option value="Personal Shopping" className="bg-[#FAF8F3] text-black">Personal Shopping</option>
                <option value="Occasion Styling" className="bg-[#FAF8F3] text-black">Occasion Styling</option>
                <option value="Workwear Styling" className="bg-[#FAF8F3] text-black">Workwear Styling</option>
                <option value="Full Transformation" className="bg-[#FAF8F3] text-black">Full Style Transformation</option>
                <option value="Bespoke Consultation" className="bg-[#FAF8F3] text-black">Bespoke Consultation</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs font-light tracking-wider text-black/60 uppercase">Message *</label>
              <textarea 
                rows={4} 
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="bg-transparent border-b border-black/30 pb-2 font-sans focus:border-black focus:outline-none resize-none transition-colors" 
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto self-start px-10 py-4 bg-black text-white font-sans text-xs font-medium uppercase tracking-[0.25em] hover:bg-black/85 transition-colors shadow-sm rounded-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Transmitting Email...' : 'Submit Message →'}
            </button>
          </form>
        )}
      </div>

      {/* ── LOCATION, CONTACT & HOURS DETAILS (UNDER SEND MESSAGE SECTION) ── */}
      <div className="pt-12 border-t border-black/10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 font-sans text-base font-light text-black/80">
          <div className="bg-[#FAF8F3] border border-black/10 p-6 sm:p-8 rounded-sm">
            <h3 className="font-serif text-lg font-normal mb-3 text-[#1A1A1A]">Location</h3>
            <p className="leading-relaxed text-sm text-black/75">DLF Emporio, Vasant Kunj<br />New Delhi, Delhi 110070</p>
          </div>
          
          <div className="bg-[#FAF8F3] border border-black/10 p-6 sm:p-8 rounded-sm">
            <h3 className="font-serif text-lg font-normal mb-3 text-[#1A1A1A]">Contact</h3>
            <p className="leading-relaxed text-sm text-black/75">
              <a href="mailto:jennifer@stylewithj.in" className="hover:text-black hover:underline transition-colors block">jennifer@stylewithj.in</a>
              <a href="tel:+918078341747" className="hover:text-black transition-colors block mt-1">+91 80783 41747</a>
            </p>
          </div>
          
          <div className="bg-[#FAF8F3] border border-black/10 p-6 sm:p-8 rounded-sm">
            <h3 className="font-serif text-lg font-normal mb-3 text-[#1A1A1A]">Hours</h3>
            <p className="leading-relaxed text-sm text-black/75">Mon - Fri: 9am - 6pm<br />Sat: 10am - 4pm<br />Sun: Closed</p>
          </div>
        </div>
      </div>

    </main>
  );
}

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />
      <Suspense fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/40 animate-pulse">
            Loading Concierge Form...
          </div>
        </div>
      }>
        <ConnectContent />
      </Suspense>
      <AtelierFooter />
    </div>
  );
}
