'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section className="w-full bg-thalina-bg text-thalina-text py-24 lg:py-32 border-t border-gray-300/40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <h2 className="font-sans text-4xl md:text-5xl lg:text-[50px] font-light tracking-tight mb-16">
              Contact Us
            </h2>
            
            <div className="flex flex-col gap-12 font-sans text-lg font-light">
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
          </motion.div>

          {/* Right Column - Map/Image Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full h-[400px] md:h-full min-h-[400px] relative overflow-hidden"
          >
            {/* For a true map, you'd use an iframe or map component. Using a sleek image as placeholder for now. */}
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" 
              alt="Studio Location" 
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
