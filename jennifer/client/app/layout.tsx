// app/layout.tsx
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { LightboxProvider } from '@/components/ImageLightbox';

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
    <html lang="en" className={`${manrope.className} ${manrope.variable} overflow-x-clip w-full max-w-[100vw]`}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&f[]=general-sans@300,400,500,600,700&display=swap"
        />
      </head>
      <body className="bg-[#FAF9F6] text-[#1A1A1A] antialiased selection:bg-black selection:text-white min-h-screen overflow-x-clip relative w-full max-w-[100vw]">
        <LightboxProvider>
          {children}
        </LightboxProvider>
      </body>
    </html>
  );
}