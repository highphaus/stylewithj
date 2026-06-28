import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const services = [
    { title: "Personal Styling Session", description: "A one-on-one session to revamp your wardrobe and build a look that perfectly matches your lifestyle and goals.", price: "From ₹15,000", duration: "1 hr" },
    { title: "Wardrobe Strategy", description: "Comprehensive closet edit, identifying missing staples and planning a seasonal capsule wardrobe.", price: "From ₹25,000", duration: "2 hrs" },
    { title: "Special Event Styling", description: "Red carpet, wedding, or gala styling. We source, fit, and tailor the perfect look for your big night.", price: "From ₹20,000", duration: "1.5 hrs" },
    { title: "Personal Branding Audit", description: "Reviewing your professional image across all platforms and providing actionable styling advice to elevate your career presence.", price: "From ₹30,000", duration: "2 hrs" },
    { title: "Color Analysis", description: "Determine your ideal color palette to ensure you always wear shades that complement your natural features.", price: "From ₹12,000", duration: "1 hr" }
  ];

  return (
    <div className="min-h-screen bg-thalina-bg text-thalina-text">
      <Navigation />
      
      <main className="pt-40 pb-24 px-6 lg:px-12 max-w-[1000px] mx-auto">
        <h1 className="font-sans text-5xl md:text-6xl font-light mb-20 text-center tracking-tight">Services</h1>
        
        <div className="flex flex-col gap-12">
          {services.map((svc, i) => (
            <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-gray-300/40 gap-8">
              <div className="flex-1">
                <h2 className="font-sans text-2xl font-medium mb-4">{svc.title}</h2>
                <p className="font-sans text-thalina-text/70 font-light leading-relaxed max-w-lg">{svc.description}</p>
                <span className="block mt-4 font-sans text-sm font-light text-thalina-text/60">{svc.duration}</span>
              </div>
              
              <div className="flex flex-col items-end gap-6 w-full md:w-auto">
                <span className="font-sans text-xl font-light">{svc.price}</span>
                <button className="w-full md:w-auto px-8 py-3 border border-thalina-text font-sans text-sm font-medium uppercase tracking-widest hover:bg-thalina-text hover:text-white transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
