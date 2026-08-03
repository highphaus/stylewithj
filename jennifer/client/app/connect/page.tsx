import React from 'react';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';

export function ConnectContent() {
  return (
    <main className="pt-32 sm:pt-40 pb-20 sm:pb-28 px-6 lg:px-12 max-w-[1000px] mx-auto">
      <h1 className="font-serif text-4xl sm:text-6xl font-light mb-12 sm:mb-16 text-center tracking-tight text-[#1A1A1A]">Let's Connect</h1>
      
      {/* ── SEND MESSAGE SECTION ── */}
      <div className="w-full bg-[#FAF8F3] border border-black/10 p-6 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.02)] rounded-sm mb-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-light mb-8 text-[#1A1A1A]">Send Us a Message</h2>
        <form className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs font-light tracking-wider text-black/60 uppercase">First Name *</label>
              <input type="text" className="bg-transparent border-b border-black/30 pb-2 font-sans focus:border-black focus:outline-none transition-colors" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs font-light tracking-wider text-black/60 uppercase">Last Name *</label>
              <input type="text" className="bg-transparent border-b border-black/30 pb-2 font-sans focus:border-black focus:outline-none transition-colors" required />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-light tracking-wider text-black/60 uppercase">Email *</label>
            <input type="email" className="bg-transparent border-b border-black/30 pb-2 font-sans focus:border-black focus:outline-none transition-colors" required />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-light tracking-wider text-black/60 uppercase">Choose What You Want *</label>
            <select 
              className="bg-transparent border-b border-black/30 pb-2 font-sans focus:border-black focus:outline-none transition-colors text-black/90 cursor-pointer"
              required
              defaultValue=""
            >
              <option value="" disabled className="bg-[#FAF8F3] text-black/50">Choose What You Want...</option>
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
            <textarea rows={4} className="bg-transparent border-b border-black/30 pb-2 font-sans focus:border-black focus:outline-none resize-none transition-colors" required></textarea>
          </div>
          
          <button type="submit" className="w-full sm:w-auto self-start px-10 py-4 bg-black text-white font-sans text-xs font-medium uppercase tracking-[0.25em] hover:bg-black/85 transition-colors shadow-sm rounded-xs">
            Send Message
          </button>
        </form>
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
