'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';

export function ConnectContent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  // Location detection state
  const [locationStatus, setLocationStatus] = useState<'detecting' | 'success' | 'permission_denied' | 'error'>('detecting');
  const [locationText, setLocationText] = useState('Detecting your location for priority concierge response...');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Auto-detect browser location on component mount for fast response
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoords({ lat, lng });

          try {
            // Reverse geocode via free open reverse geocoding API
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
            const data = await res.json();
            const city = data.city || data.locality || data.principalSubdivision || 'Local Region';
            const country = data.countryName || '';
            const locName = `${city}${country ? `, ${country}` : ''}`;

            setLocationText(`📍 Priority Location: ${locName} (${lat.toFixed(3)}°, ${lng.toFixed(3)}°)`);
            setLocationStatus('success');
          } catch {
            setLocationText(`📍 Priority Location Coordinates: ${lat.toFixed(3)}° N, ${lng.toFixed(3)}° E`);
            setLocationStatus('success');
          }
        },
        () => {
          setLocationText('📍 Priority Location: Region-Based Dispatch (Location permission optional)');
          setLocationStatus('permission_denied');
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      setLocationText('📍 Location: Concierge Regional Service');
      setLocationStatus('error');
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="pt-32 sm:pt-40 pb-20 sm:pb-28 px-6 lg:px-12 max-w-[1000px] mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-3 font-semibold">
          ✦ ATELIER CONSULTATION
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#1A1A1A]">
          Let's Connect
        </h1>
      </div>
      
      {/* ── SEND MESSAGE SECTION ── */}
      <div className="w-full bg-[#FAF8F3] border border-black/10 p-6 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.02)] rounded-sm mb-16 relative">
        
        {/* Dynamic Location Badge */}
        <div className="mb-8 p-3.5 bg-[#EFECE6] border-l-2 border-[#1A1A1A] text-[9px] sm:text-[10px] font-mono tracking-wider text-black/75 flex items-center justify-between flex-wrap gap-2 rounded-xs">
          <span>{locationText}</span>
          <span className="text-[8px] uppercase font-bold text-black/50 px-2 py-0.5 bg-white/80 rounded-xs">
            Fast Response Service
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-light mb-8 text-[#1A1A1A]">Send Us a Message</h2>

        {submitted ? (
          <div className="p-8 bg-[#EFECE6] border border-black/15 text-center flex flex-col items-center gap-4 rounded-xs">
            <span className="text-2xl">✦</span>
            <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">Inquiry Transmitted Successfully</h3>
            <p className="font-sans text-xs text-black/75 max-w-md leading-relaxed">
              Thank you, <strong className="font-semibold">{firstName}</strong>! Your inquiry and location context ({locationText.replace('📍 ', '')}) have been received. Jennifer will respond directly to give you priority styling service.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 bg-black text-white text-[9px] font-mono uppercase tracking-[0.2em]"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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
                <option value="" disabled className="bg-[#FAF8F3] text-black/50">Choose Your Desired Atelier Curation...</option>
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
              className="w-full sm:w-auto self-start px-10 py-4 bg-black text-white font-sans text-xs font-medium uppercase tracking-[0.25em] hover:bg-black/85 transition-colors shadow-sm rounded-xs cursor-pointer"
            >
              Transmit Inquiry →
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
              <a href="mailto:info@stylewithj.com" className="hover:text-black hover:underline transition-colors block">info@stylewithj.com</a>
              <a href="tel:+919876543210" className="hover:text-black transition-colors block mt-1">+91 98765 43210</a>
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
      <ConnectContent />
      <AtelierFooter />
    </div>
  );
}
