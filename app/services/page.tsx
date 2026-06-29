'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';

const audienceMap: Record<string, { label: string; headline: string; intro: string; services: string[] }> = {
  creators: {
    label: "Creators & Influencers",
    headline: "Build a visual identity as powerful as your content.",
    intro: "Your image is your brand. We help creators and influencers develop a distinctive signature style that makes every appearance — online and off — instantly recognizable.",
    services: ["Personal Styling Session", "Personal Branding Audit", "Special Event Styling"],
  },
  founders: {
    label: "Founders & Entrepreneurs",
    headline: "Lead with authority. Dress with intention.",
    intro: "As a founder, you are the face of your company. We help you build a wardrobe that projects confidence, leadership, and vision at every pitch, event, and meeting.",
    services: ["Personal Branding Audit", "Wardrobe Strategy", "Complete Transformation"],
  },
  executives: {
    label: "Executives & Leaders",
    headline: "Command every room you walk into.",
    intro: "For senior leaders, appearance is a strategic asset. We refine your executive presence so your image matches the caliber of your role and ambition.",
    services: ["Personal Branding Audit", "Wardrobe Strategy", "Color Analysis"],
  },
  professionals: {
    label: "Working Professionals",
    headline: "Dress for the position you're earning.",
    intro: "Whether you're climbing the corporate ladder or building your professional reputation, we help you put your best self forward every day — not just for the big moments.",
    services: ["Personal Styling Session", "Wardrobe Strategy", "Color Analysis"],
  },
  individuals: {
    label: "Individuals Seeking Transformation",
    headline: "A new chapter deserves a new image.",
    intro: "Life changes call for wardrobe changes. Whether you're reinventing yourself, bouncing back, or simply leveling up, we're here to help you start your next chapter with confidence.",
    services: ["Complete Transformation", "Personal Styling Session", "Color Analysis"],
  },
  students: {
    label: "Students & Job Seekers",
    headline: "Make a first impression that opens doors.",
    intro: "You have one chance to make a first impression in an interview, campus placement, or networking event. Let's make sure that impression counts.",
    services: ["Personal Styling Session", "Color Analysis", "Special Event Styling"],
  },
};

const allServices = [
  {
    title: "Personal Styling Session",
    description: "A bespoke one-on-one session to evaluate your lifestyle, goals, and personality — mapping out an elevated aesthetic blueprint that streamlines how you dress every day.",
    duration: "1 hr",
    image: "/images/img04.jpeg",
  },
  {
    title: "Wardrobe Strategy",
    description: "A comprehensive closet restructuring — identifying gaps, removing what no longer serves you, and building a functional, timeless capsule wardrobe tailored to your life.",
    duration: "2 hrs",
    image: "/images/img05.jpeg",
  },
  {
    title: "Special Event Styling",
    description: "Exclusive sartorial curation for red carpets, galas, weddings, or high-profile milestone events. We source, style, and refine every detail of your look.",
    duration: "1.5 hrs",
    image: "/images/img06.jpeg",
  },
  {
    title: "Personal Branding Audit",
    description: "Aligning your professional appearance with leadership authority, company values, and media optics. Ideal for executives, founders, and public figures.",
    duration: "2 hrs",
    image: "/images/img07.jpeg",
  },
  {
    title: "Color Analysis",
    description: "A precise tonal breakdown mapping your skin tone, eye color, and contrast points to identify the exact palette that makes you radiate confidence and vitality.",
    duration: "1 hr",
    image: "/images/img08.jpeg",
  },
  {
    title: "Complete Transformation",
    description: "The ultimate identity overhaul — a comprehensive, immersive consulting package that covers styling, wardrobe, branding, color, and long-term image strategy.",
    duration: "Custom",
    image: "/images/img09.jpeg",
  },
];

function ServicesContent() {
  const searchParams = useSearchParams();
  const forSlug = searchParams.get('for');
  const audience = forSlug ? audienceMap[forSlug] : null;

  const filteredServices = audience
    ? allServices.filter(s => audience.services.includes(s.title))
    : allServices;

  const otherServices = audience
    ? allServices.filter(s => !audience.services.includes(s.title))
    : [];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <Navigation />

      {/* ── HERO BANNER ── */}
      <div className="relative w-full h-[50vh] bg-[#111] overflow-hidden flex items-end">
        <Image
          src="/images/img02.jpeg"
          alt="What We Do"
          fill
          priority
          className="object-cover object-center opacity-55 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 pb-16">
          {audience ? (
            <>
              <span className="text-[10px] tracking-[0.5em] uppercase font-light text-white/50 block mb-3">
                Curated for — {audience.label}
              </span>
              <h1 className="font-sans text-4xl md:text-6xl font-light text-white tracking-tight leading-[1.1]">
                {audience.headline}
              </h1>
            </>
          ) : (
            <>
              <span className="text-[10px] tracking-[0.5em] uppercase font-light text-white/50 block mb-3">
                Services
              </span>
              <h1 className="font-sans text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.1]">
                What We Do
              </h1>
            </>
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 lg:px-16 py-24">

        {/* Audience-specific intro text */}
        {audience && (
          <div className="mb-20 max-w-2xl">
            <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed tracking-wide">
              {audience.intro}
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 mt-6 text-[10px] tracking-[0.3em] uppercase font-light text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors duration-300 border-b border-[#1A1A1A]/20 pb-0.5"
            >
              ← View all services
            </Link>
          </div>
        )}

        {/* Recommended / Primary Services */}
        {audience && (
          <p className="text-[9px] tracking-[0.5em] uppercase font-light text-[#1A1A1A]/40 mb-8">
            Recommended for you
          </p>
        )}

        <div className="flex flex-col divide-y divide-[#1A1A1A]/10">
          {filteredServices.map((svc, i) => (
            <div key={i} className="group grid grid-cols-1 lg:grid-cols-12 gap-0 py-12 lg:py-16 hover:bg-[#F5F3EF] -mx-8 px-8 transition-colors duration-300">
              <div className="lg:col-span-1 flex items-start pt-1">
                <span className="font-mono text-[10px] tracking-widest text-[#1A1A1A]/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center">
                <h2 className="font-sans text-2xl md:text-3xl font-light tracking-wide mb-4">
                  {svc.title}
                </h2>
                <p className="text-sm font-light text-[#1A1A1A]/60 leading-relaxed max-w-md">
                  {svc.description}
                </p>
                <span className="text-[9px] tracking-[0.3em] uppercase font-light text-[#1A1A1A]/30 mt-4">
                  {svc.duration}
                </span>
              </div>
              <div className="hidden lg:flex lg:col-span-4 lg:col-start-9 items-center justify-end">
                <div className="relative w-[180px] h-[220px] overflow-hidden bg-[#EFECE6] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Image src={svc.image} alt={svc.title} fill className="object-cover object-center" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other services if filtered view */}
        {otherServices.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#1A1A1A]/10">
            <p className="text-[9px] tracking-[0.5em] uppercase font-light text-[#1A1A1A]/40 mb-8">
              Other services
            </p>
            <div className="flex flex-col divide-y divide-[#1A1A1A]/10">
              {otherServices.map((svc, i) => (
                <div key={i} className="group grid grid-cols-1 lg:grid-cols-12 gap-0 py-10 hover:bg-[#F5F3EF] -mx-8 px-8 transition-colors duration-300">
                  <div className="lg:col-span-1 flex items-start pt-1">
                    <span className="font-mono text-[10px] tracking-widest text-[#1A1A1A]/20">
                      {String(filteredServices.length + i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <h2 className="font-sans text-xl md:text-2xl font-light tracking-wide mb-3 text-[#1A1A1A]/70">
                      {svc.title}
                    </h2>
                    <p className="text-sm font-light text-[#1A1A1A]/40 leading-relaxed max-w-md">
                      {svc.description}
                    </p>
                    <span className="text-[9px] tracking-[0.3em] uppercase font-light text-[#1A1A1A]/20 mt-4">
                      {svc.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-24 pt-16 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase font-light text-[#1A1A1A]/40 mb-2">
              Ready to begin?
            </p>
            <h3 className="font-sans text-2xl md:text-3xl font-light tracking-wide">
              Let's build your signature style.
            </h3>
          </div>
          <Link
            href="/connect"
            className="group flex items-center gap-10 px-8 py-4 border border-[#1A1A1A]/30 hover:border-[#1A1A1A] text-[10px] tracking-[0.25em] uppercase font-light transition-all duration-300"
          >
            Connect With Us
            <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>
      </main>

      <AtelierFooter />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-[10px] tracking-[0.4em] uppercase font-light text-[#1A1A1A]/40">Loading...</div>
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}
