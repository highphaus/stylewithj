import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-thalina-bg text-thalina-text pt-24 pb-12 px-6 lg:px-12 border-t border-gray-300/40">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Brand Left */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start leading-none group">
            <span className="text-[10px] uppercase tracking-[0.25em] font-light text-thalina-text/60 mb-1">style with</span>
            <span className="text-4xl font-bold tracking-tight leading-none font-serif">J</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-light text-thalina-text/70 mt-1">by jennifer</span>
          </div>

          {/* Center Links 1 */}
          <div className="md:col-span-2 lg:col-span-2">
            <ul className="space-y-3 font-sans text-lg text-thalina-text font-light flex flex-col items-start">
              <li><Link href="/services" className="relative group inline-block">
                <span>Services</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-thalina-text transition-all duration-300 group-hover:w-full"></span>
              </Link></li>
              <li><Link href="/portfolio" className="relative group inline-block">
                <span>Gallery</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-thalina-text transition-all duration-300 group-hover:w-full"></span>
              </Link></li>
              <li><Link href="/about" className="relative group inline-block">
                <span>About</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-thalina-text transition-all duration-300 group-hover:w-full"></span>
              </Link></li>
              <li><Link href="/connect" className="relative group inline-block text-thalina-text/60">
                <span>Contact</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-thalina-text/60 transition-all duration-300 group-hover:w-full"></span>
              </Link></li>
            </ul>
          </div>

          {/* Center Links 2 */}
          <div className="md:col-span-2 lg:col-span-2">
            <ul className="space-y-3 font-sans text-lg text-thalina-text font-light flex flex-col items-start">
              <li><Link href="/faq" className="hover:opacity-70 transition-opacity">FAQ</Link></li>
              <li><Link href="/terms" className="hover:opacity-70 transition-opacity">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:opacity-70 transition-opacity">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:opacity-70 transition-opacity">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 lg:col-span-3">
            <span className="font-sans text-lg font-light mb-6 block">
              Don't Miss an Update
            </span>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-light">Email *</label>
                <div className="relative flex items-center border-b border-thalina-text pb-2 group">
                  <input 
                    type="email" 
                    className="bg-transparent w-full font-sans text-base text-thalina-text placeholder-thalina-text/30 focus:outline-none focus:ring-0 peer"
                    required
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-thalina-text transition-all duration-500 peer-focus:w-full"></div>
                </div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-1">
                  <input type="checkbox" className="w-4 h-4 appearance-none border border-thalina-text checked:bg-thalina-text transition-colors cursor-pointer" required />
                  <svg className="absolute w-3 h-3 text-thalina-bg pointer-events-none opacity-0 left-0.5 top-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="font-sans text-sm text-thalina-text leading-relaxed">
                  Yes, subscribe me to your newsletter.
                </span>
              </label>
              <style dangerouslySetInnerHTML={{__html: `input[type="checkbox"]:checked + svg { opacity: 1; }`}} />
              
              <button type="submit" className="relative overflow-hidden group font-sans text-sm font-medium uppercase tracking-widest text-thalina-text border border-thalina-text py-3 transition-colors">
                <span className="absolute inset-0 bg-thalina-text translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Submit</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-end items-end gap-16">
          <div className="flex flex-col gap-2 font-sans text-lg font-light">
            <span className="font-medium mb-2">Follow Us</span>
            <a href="#" className="relative group inline-block w-fit">
              <span>Instagram</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-thalina-text transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group inline-block w-fit">
              <span>Facebook</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-thalina-text transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group inline-block w-fit">
              <span>Pinterest</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-thalina-text transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          <div className="flex flex-col text-sm font-sans text-thalina-text/80 font-light mt-12 md:mt-0">
            <span>&copy; {new Date().getFullYear()} by Style with J by Jennifer.</span>
            <span>Made with <a href="#" className="underline hover:opacity-70 transition-opacity">Antigravity</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
