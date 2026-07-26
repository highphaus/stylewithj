// app/layout.tsx
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ 
  subsets: ['latin'], 
  variable: '--font-manrope' 
});

export const metadata: Metadata = {
  title: 'Style with J',
  description: 'A curated digital exhibition of high-end fashion silhouettes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.className} ${manrope.variable} overflow-x-hidden w-full max-w-[100vw]`}>
      <body className="bg-[#FAF9F6] text-[#1A1A1A] antialiased selection:bg-black selection:text-white min-h-screen overflow-x-hidden relative w-full max-w-[100vw]">
        {children}
      </body>
    </html>
  );
}