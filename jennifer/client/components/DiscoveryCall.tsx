import React from 'react';
import Link from 'next/link';

export default function DiscoveryCall() {
  return (
    <section className="py-24 md:py-40 px-6 lg:px-12 bg-black text-white text-center border-t border-gray-900">
      <div className="max-w-[800px] mx-auto">
        <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight mb-8">
          Location & Hours
        </h2>
        <div className="w-16 h-[1px] bg-white mx-auto mb-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-16">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-sans text-lg uppercase tracking-widest font-bold mb-4">Visit Us</h3>
            <p className="font-sans text-gray-400 font-light leading-loose text-center md:text-left">
              DLF Emporio, Vasant Kunj<br />
              New Delhi, Delhi 110070<br />
              +91 11 4609 8200<br />
              hello@stylewithj.com
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-sans text-lg uppercase tracking-widest font-bold mb-4">Opening Hours</h3>
            <p className="font-sans text-gray-400 font-light leading-loose text-center md:text-left">
              Monday - Friday: 9am - 8pm<br />
              Saturday: 10am - 6pm<br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <Link href="/connect" className="inline-block px-12 py-4 bg-white text-black text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors duration-300">
          Get In Touch
        </Link>
      </div>
    </section>
  );
}
