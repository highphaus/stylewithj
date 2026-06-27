import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-thalina-bg text-thalina-text">
      <Navigation />
      
      <main className="pt-40 pb-24 px-6 lg:px-12 max-w-[1200px] mx-auto">
        <h1 className="font-sans text-5xl md:text-6xl font-light mb-20 text-center tracking-tight">Let's Connect</h1>
        
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          <div className="w-full md:w-1/3 flex flex-col gap-12 font-sans text-lg font-light">
            <div>
              <h3 className="font-medium mb-4">Location</h3>
              <p>DLF Emporio, Vasant Kunj<br />New Delhi, Delhi 110070</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <p>info@stylewithj.com<br />+91 98765 43210</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Hours</h3>
              <p>Mon - Fri: 9am - 6pm<br />Sat: 10am - 4pm<br />Sun: Closed</p>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <form className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-xs font-light">First Name *</label>
                  <input type="text" className="bg-transparent border-b border-thalina-text pb-2 font-sans focus:outline-none" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-xs font-light">Last Name *</label>
                  <input type="text" className="bg-transparent border-b border-thalina-text pb-2 font-sans focus:outline-none" required />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-light">Email *</label>
                <input type="email" className="bg-transparent border-b border-thalina-text pb-2 font-sans focus:outline-none" required />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-light">Message *</label>
                <textarea rows={4} className="bg-transparent border-b border-thalina-text pb-2 font-sans focus:outline-none resize-none" required></textarea>
              </div>
              
              <button type="submit" className="w-full md:w-auto self-start px-12 py-4 border border-thalina-text font-sans text-sm font-medium uppercase tracking-widest hover:bg-thalina-text hover:text-white transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
