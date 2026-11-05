import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';
import { LightboxProvider } from '@/components/ImageLightbox';
import NetworkStatusListener from '@/components/NetworkStatusListener';

const manrope = Manrope({ 
  subsets: ['latin'], 
  variable: '--font-manrope',
  display: 'swap' 
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Personal Stylist | Style with J',
  description: 'Bespoke Personal Stylist by Jennifer. Tailored wardrobe audits, executive workwear, personal shopping, and luxury bridal styling in Bangalore & virtually worldwide.',
  keywords: [
    'personal stylist',
    'personal stylist bangalore',
    'style with j',
    'personal shopper in bangalore',
    'wardrobe stylist bangalore',
    'executive wardrobe stylist bangalore',
    'workwear capsule wardrobe bangalore',
    'bridal personal stylist bangalore',
    'virtual wardrobe consultant',
  ],
  authors: [{ name: 'Jennifer (J)' }],
  creator: 'Style with J',
  metadataBase: new URL('https://www.stylewithj.in'),
  alternates: {
    canonical: 'https://www.stylewithj.in',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/logo/style-with-j.png', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192.png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Personal Stylist | Style with J',
    description: 'Bespoke Personal Stylist by Jennifer. Tailored wardrobe audits, executive workwear, personal shopping, and luxury bridal styling in Bangalore & virtually worldwide.',
    url: 'https://www.stylewithj.in',
    siteName: 'Style with J',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.stylewithj.in/og-image.jpg',
        secureUrl: 'https://www.stylewithj.in/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Personal Stylist | Style with J',
      },
      {
        url: 'https://www.stylewithj.in/icon-512.png',
        secureUrl: 'https://www.stylewithj.in/icon-512.png',
        width: 512,
        height: 512,
        type: 'image/png',
        alt: 'Style with J Luxury Monogram Icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Stylist | Style with J',
    description: 'Bespoke Personal Stylist by Jennifer. Tailored wardrobe audits, executive workwear, personal shopping, and luxury styling.',
    images: ['https://www.stylewithj.in/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'googleaebd360ea7714ac7',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.stylewithj.in/#organization',
      name: 'Style with J',
      alternateName: ['Style with J Bangalore', 'Style with J Personal Stylist'],
      url: 'https://www.stylewithj.in',
      logo: 'https://www.stylewithj.in/icon-512.png',
      image: 'https://www.stylewithj.in/og-image.jpg',
      description: 'Premier Personal Stylist, Wardrobe Audit, Personal Shopper, and Executive Wardrobe Stylist in Bangalore. Specialized in executive workwear, capsule wardrobes, and bridal trousseau styling.',
      telephone: '+918078341747',
      priceRange: '₹5,000 - ₹50,000',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560038',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 12.9716,
        longitude: 77.5946,
      },
      areaServed: [
        'Bangalore',
        'Indiranagar',
        'Koramangala',
        'Whitefield',
        'HSR Layout',
        'UB City',
        'Lavelle Road',
        'Jayanagar',
        'JP Nagar',
        'Electronic City',
        'MG Road',
      ],
      knowsAbout: [
        'Personal Styling',
        'Wardrobe Audit',
        'Personal Shopping',
        'Executive Workwear Styling',
        'Bridal Trousseau Styling',
        'Capsule Wardrobes',
        'Image Consulting',
      ],
    },
    {
      '@type': 'Service',
      serviceType: 'Personal Styling',
      provider: {
        '@id': 'https://www.stylewithj.in/#organization',
      },
      areaServed: 'Bangalore, India',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Personal Styling Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Style Discovery & Personal Styling',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Wardrobe Audit & Closet Evolution',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Personal Shopping Bangalore',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Executive & Corporate Workwear Styling',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Bridal & Occasion Styling',
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.className} ${manrope.variable} ${playfair.variable} overflow-x-clip w-full max-w-[100vw]`}>
      <head>
        <meta name="theme-color" content="#111111" />
        <meta name="apple-mobile-web-app-title" content="Style with J" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* WhatsApp & Social Media OpenGraph Meta Tags */}
        <meta property="og:title" content="Personal Stylist | Style with J" />
        <meta property="og:description" content="Bespoke Personal Stylist by Jennifer. Tailored wardrobe audits, executive workwear, personal shopping, and luxury bridal styling in Bangalore & virtually worldwide." />
        <meta property="og:image" content="https://www.stylewithj.in/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://www.stylewithj.in/og-image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Personal Stylist | Style with J" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.stylewithj.in" />
        <meta property="og:site_name" content="Style with J" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Personal Stylist | Style with J" />
        <meta name="twitter:description" content="Bespoke Personal Stylist by Jennifer. Tailored wardrobe audits, executive workwear, personal shopping, and luxury styling." />
        <meta name="twitter:image" content="https://www.stylewithj.in/og-image.jpg" />

        {/* Favicons & Browser Tab Icons (Google Search & Social Compliant) */}
        <link rel="icon" href="/favicon.ico?v=4" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=4" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png?v=4" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png?v=4" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=4" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=4" />
        <link rel="shortcut icon" href="/favicon.ico?v=4" />
        <link rel="apple-touch-icon" href="/icon-192.png?v=4" />
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&f[]=general-sans@300,400,500,600,700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-[#FAF9F6] text-[#1A1A1A] antialiased selection:bg-black selection:text-white min-h-screen overflow-x-clip relative w-full max-w-[100vw]">
        <LightboxProvider>
          <NetworkStatusListener />
          {children}
        </LightboxProvider>
      </body>
    </html>
  );
}
