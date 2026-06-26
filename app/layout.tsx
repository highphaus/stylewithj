// jennifer/client/app/layout.tsx
import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import CustomCursor from "@/components/CustomCursor";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Jenny | Personal Stylist & Image Consultant",
  description: "Helping professionals, entrepreneurs, creators, job seekers, and individuals seeking transformation build confidence and personal presence through styling, wardrobe strategy, grooming, and image consulting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="bg-[#FFFFFF] text-[#5D4037] font-sans antialiased selection:bg-[#A1887F] selection:text-[#5D4037]">
        {children}
      </body>
    </html>
  );
}