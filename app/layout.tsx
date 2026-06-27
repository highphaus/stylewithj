// app/layout.tsx
import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const serif = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500'],
  variable: '--font-serif' 
});

const sans = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
});

export const metadata: Metadata = {
  title: 'Atelier | Extraordinary Haute Couture',
  description: 'A curated digital exhibition of high-end fashion silhouettes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-[#FAF9F6] text-[#1A1A1A] antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}