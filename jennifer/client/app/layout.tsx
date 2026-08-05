import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { LightboxProvider } from '@/components/ImageLightbox';

const manrope = Manrope({ 
  subsets: ['latin'], 
  variable: '--font-manrope' 
});

export const metadata: Metadata = {
  title: 'Personal Stylist & Image Consultant in Bangalore | Style with J',
  description: 'Premier Personal Stylist & Image Consultant in Bangalore. Specializing in executive workwear, wardrobe audits, personal shopping, and bridal trousseau styling in Indiranagar, Koramangala & Whitefield.',
  keywords: [
    'personal stylist in bangalore',
    'best personal stylist bangalore',
    'personal shopper in bangalore',
    'image consultant bangalore',
    'wardrobe stylist bangalore',
    'executive image consultant bangalore',
    'workwear capsule wardrobe bangalore',
    'bridal personal stylist bangalore',
    'fashion consultant near me',
    'virtual wardrobe consultant',
    'tech executive style bangalore',
  ],
  authors: [{ name: 'Jennifer (J)' }],
  creator: 'Style with J',
  metadataBase: new URL('https://stylewithj.com'),
  openGraph: {
    title: 'Personal Stylist & Image Consultant in Bangalore | Style with J',
    description: 'Elevate your personal image with Bangalore’s top personal stylist and image consultant. Tailored wardrobe audits, executive styling, and personal shopping.',
    url: 'https://stylewithj.com',
    siteName: 'Style with J',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero/hero%20image%20desktop.png',
        width: 1200,
        height: 630,
        alt: 'Style with J - Personal Stylist Bangalore',
      },
    ],
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
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://stylewithj.com/#organization',
      name: 'Style with J',
      alternateName: ['Style with J Bangalore', 'Style with J Personal Stylist'],
      url: 'https://stylewithj.com',
      logo: 'https://stylewithj.com/images/style%20with%20j.png',
      image: 'https://stylewithj.com/images/hero/hero%20image%20desktop.png',
      description: 'Premier Personal Stylist, Wardrobe Audit, Personal Shopper, and Corporate Image Consultant in Bangalore. Specialized in executive workwear, capsule wardrobes, and bridal trousseau styling.',
      telephone: '+919000000000',
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
      serviceType: 'Personal Styling & Image Consulting',
      provider: {
        '@id': 'https://stylewithj.com/#organization',
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
    <html lang="en" className={`${manrope.className} ${manrope.variable} overflow-x-clip w-full max-w-[100vw]`}>
      <head>
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
          {children}
        </LightboxProvider>
      </body>
    </html>
  );
}