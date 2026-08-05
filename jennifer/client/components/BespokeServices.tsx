'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BespokeServices() {
  const services = [
    {
      num: '01',
      title: "Bespoke Bridal Lehengas",
      desc: "Work directly with master karigars to architect a one-of-a-kind royal lehenga, completely hand-embroidered with Zardosi tailored to your vision.",
      timeline: "4-8 Months",
      img: "/images/CIT09345.jpg"
    },
    {
      num: '02',
      title: "Sangeet & Trousseau",
      desc: "A collaborative journey to design your complete wedding wardrobe, from pre-wedding festive looks to your heritage heirloom trousseau trunks.",
      timeline: "3-6 Months",
      img: "/images/DSC04682.jpg"
    },
    {
      num: '03',
      title: "Red Carpet & Sarees",
      desc: "Complete visual styling and custom saree draping creations for high-profile public appearances and elite social events.",
      timeline: "4-8 Weeks",
      img: "/images/DSC07159.jpg"
    }
  ];

  return (
    <section className="py-20 sm:py-32 bg-[#FAF9F6] border-t border-black/15 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-black/10">
          <div>
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/50 block mb-3 font-semibold">
              ✦ CLIENT COMMISSIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-tight leading-tight">
              Work With The Atelier
            </h2>
          </div>
          <p className="font-serif text-sm sm:text-base text-black/60 font-light italic leading-relaxed max-w-md">
            Strictly limited private clients each season to ensure absolute dedication to every bespoke garment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {services.map((svc) => (
            <div 
              key={svc.num} 
              className="bg-[#FAF8F3] border border-black/10 hover:border-black/30 group transition-all duration-500 flex flex-col justify-between overflow-hidden rounded-xs shadow-xs"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0D0D0D]">
                <Image 
                  src={svc.img} 
                  alt={svc.title} 
                  fill
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 font-mono text-[9px] font-bold text-white bg-black/75 backdrop-blur-sm px-2.5 py-1 border border-white/10 rounded-xs">
                  /{svc.num}
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
                <div>
                  <h3 className="font-serif text-2xl font-light text-[#1A1A1A] mb-3 leading-snug">{svc.title}</h3>
                  <p className="font-sans text-xs text-black/70 font-light leading-relaxed">{svc.desc}</p>
                </div>
                <div className="border-t border-black/10 pt-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-widest text-black/40 uppercase">Timeline: {svc.timeline}</span>
                  <Link
                    href="/connect"
                    className="font-mono text-[9px] tracking-[0.2em] uppercase font-semibold text-black hover:opacity-60 transition-opacity"
                  >
                    Inquire →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/connect"
            className="bg-[#1A1A1A] text-white hover:bg-black transition-all duration-300 px-10 py-4.5 text-[10px] font-mono tracking-[0.25em] uppercase shadow-md cursor-pointer inline-block rounded-xs"
          >
            Request Private Consultation →
          </Link>
        </div>

      </div>
    </section>
  );
}

