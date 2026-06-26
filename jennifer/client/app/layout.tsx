// jennifer/client/app/layout.tsx
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