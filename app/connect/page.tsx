'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ConnectPage() {
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out, Jennifer will review your request within 24 business hours!");
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#5D4037] font-sans antialiased selection:bg-[#A1887F] selection:text-[#FFFFFF] scroll-smooth flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-32 px-6 lg:px-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#FFFFFF] rounded-3xl p-8 relative shadow-2xl border border-[#5D4037]/20">
          <h1 className="font-serif text-4xl text-[#5D4037] mb-4 text-center">Connect With Us</h1>
          <p className="text-sm text-[#5D4037]/80 mb-10 text-center">Let's map out your bespoke wardrobe timeline configuration.</p>
          
          <form onSubmit={handleSubmission} className="space-y-6">
            <div>
              <input type="text" placeholder="First Name" required className="w-full bg-[#FFFFFF] border border-[#5D4037]/20 rounded-xl p-4 text-base text-[#5D4037] placeholder:text-[#5D4037]/40 focus:outline-none focus:border-[#5D4037]" />
            </div>
            <div>
              <input type="email" placeholder="Email Address" required className="w-full bg-[#FFFFFF] border border-[#5D4037]/20 rounded-xl p-4 text-base text-[#5D4037] placeholder:text-[#5D4037]/40 focus:outline-none focus:border-[#5D4037]" />
            </div>
            <div>
              <select required defaultValue="" className="w-full bg-[#FFFFFF] border border-[#5D4037]/20 rounded-xl p-4 text-base text-[#5D4037] focus:outline-none focus:border-[#5D4037] appearance-none cursor-pointer">
                <option value="" disabled>Select Service Interest</option>
                <option value="styling">Personal Styling</option>
                <option value="closet">Closet Audit</option>
                <option value="shopping">Personal Shopping</option>
                <option value="events">Event Styling</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-[#5D4037] text-[#FFFFFF] rounded-xl p-5 text-sm font-bold tracking-widest uppercase hover:bg-[#5D4037]/80 transition-colors mt-4">
              Submit Request
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
