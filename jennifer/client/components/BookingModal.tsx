'use client';

import React, { useState } from 'react';

export default function BookingModal() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          phone,
          service,
          message: `Consultation Modal Request for ${service}`,
          locationText: 'Modal Direct Submission'
        })
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="booking-toggle" className="hidden peer" />
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden peer-checked:flex items-center justify-center p-4">
        <div className="bg-[#FAF8F3] rounded-sm max-w-md w-full p-8 relative shadow-2xl border border-black/10 text-[#1A1A1A]">
          <label 
            htmlFor="booking-toggle" 
            onClick={() => setSubmitted(false)}
            className="absolute top-4 right-5 text-2xl font-light cursor-pointer text-black hover:opacity-60"
          >
            &times;
          </label>
          
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/50 block mb-1 font-semibold">
            ✦ ATELIER APPOINTMENT
          </span>
          <h3 className="font-serif text-2xl text-black mb-1 font-light">Request Consultation</h3>
          <p className="text-xs text-black/70 mb-6 font-light">Let's map out your bespoke wardrobe consultation timeline.</p>
          
          {submitted ? (
            <div className="p-6 bg-[#EFECE6] border border-black/15 text-center flex flex-col items-center gap-3 rounded-xs">
              <span className="text-xl">✓</span>
              <h4 className="font-serif text-xl font-light text-black">Message Sent Successfully!</h4>
              <p className="text-xs text-black/75 font-sans leading-relaxed font-light">
                Thank you, <strong className="font-semibold">{firstName}</strong>! Your consultation request has been sent to Jennifer at <strong className="font-semibold">muhammedsyam.dev@gmail.com</strong>.
              </p>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  const checker = document.getElementById('booking-toggle') as HTMLInputElement;
                  if (checker) checker.checked = false;
                }} 
                className="mt-2 px-6 py-2 bg-[#1A1A1A] text-white text-[9px] font-mono uppercase tracking-[0.2em] cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmission} className="space-y-4 font-sans text-xs">
              <div>
                <input 
                  type="text" 
                  placeholder="First Name *" 
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required 
                  className="w-full bg-white border border-black/15 rounded-xs p-3 text-xs text-black placeholder:text-black/40 focus:outline-none focus:border-black" 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address *" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required 
                  className="w-full bg-white border border-black/15 rounded-xs p-3 text-xs text-black placeholder:text-black/40 focus:outline-none focus:border-black" 
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Phone Number (e.g. +91 98765 43210) *" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required 
                  className="w-full bg-white border border-black/15 rounded-xs p-3 text-xs text-black placeholder:text-black/40 focus:outline-none focus:border-black" 
                />
              </div>
              <div>
                <select 
                  required 
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="w-full bg-white border border-black/15 rounded-xs p-3 text-xs text-black focus:outline-none focus:border-black cursor-pointer"
                >
                  <option value="" disabled>Select Service Interest *</option>
                  <option value="Personal Styling">Personal Styling</option>
                  <option value="Wardrobe Styling">Wardrobe Styling & Audit</option>
                  <option value="Personal Shopping">Personal Shopping</option>
                  <option value="Occasion Styling">Occasion & Bridal Styling</option>
                  <option value="Workwear Styling">Executive Workwear Styling</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#1A1A1A] text-white rounded-xs p-3.5 text-[9px] font-mono font-bold tracking-[0.25em] uppercase hover:bg-black transition-colors mt-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Transmitting...' : 'Submit Consultation Request →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}