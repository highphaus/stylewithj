// lib/looks-data.ts
// Shared types + seed data for all lookbook looks

export interface Look {
  id: string;
  num: string;
  title: string;
  category: string;
  tag: string;
  concept: string;
  fabric: string;
  story: string;
  occasion: string;
  image: string;
}

export const seedLooks: Look[] = [
  {
    id: 'look-01',
    num: '01',
    title: 'The Staircase Polka Dot Silk Slip',
    category: 'CONTEMPORARY WESTERN',
    tag: 'WESTERN',
    concept: 'Monochrome Fluidity',
    fabric: 'Bias-Cut Polka Dot Silk Crepe',
    story: 'A striking polka dot slip dress tailored with fluid drape, paired with lace-up heels and a sleek shoulder bag. The staircase setting amplifies the elongated silhouette — an editorial moment rooted in effortless movement.',
    occasion: 'Contemporary Workwear, Dinners & Daily Elegance',
    image: '/images/includes/B4A2A5F7-FFA5-4B7A-9B0F-5EA8653D623E.JPG.jpeg',
  },
  {
    id: 'look-02',
    num: '02',
    title: 'Poolside Peplum Evening Column',
    category: 'EDITORIAL EVENING',
    tag: 'EVENING',
    concept: 'Architectural Waistlines',
    fabric: 'Structured Felted Peplum Gown',
    story: 'Strapless corset peplum gown offering razor-sharp posture for luxury evening affairs and red carpet moments. The clean poolside backdrop accentuates the structural silhouette — form without compromise.',
    occasion: 'Galas, High Fashion Affairs & Red Carpet Events',
    image: '/images/includes/IMG_8709.JPG.jpeg',
  },
  {
    id: 'look-03',
    num: '03',
    title: 'Sunlit Meadow Halter Curation',
    category: 'CONTEMPORARY WESTERN',
    tag: 'WESTERN',
    concept: 'Natural Proportions',
    fabric: 'Sand-Washed Linen Halter & Leather',
    story: 'Clean white halter dress accessorized with an artisanal brown leather disc waist belt in open golden fields. The natural landscape grounds the look in warmth and intentionality.',
    occasion: 'Contemporary Workwear, Dinners & Daily Elegance',
    image: '/images/includes/IMG_9051.JPG.jpeg',
  },
  {
    id: 'look-04',
    num: '04',
    title: 'Coastal Backless Halter Gown',
    category: 'RESORT & DESTINATION',
    tag: 'RESORT',
    concept: 'Ocean Breeze Movement',
    fabric: 'Liquid Black Charmeuse Silk',
    story: 'Deep backless halter maxi silhouette capturing effortless movement against open sea horizons. Every detail — the fabric, the cut, the stance — speaks to destination dressing at its most refined.',
    occasion: 'Vacation Edits, Coastal Resort & Romantic Dates',
    image: '/images/includes/IMG_3112.JPG.jpeg',
  },
  {
    id: 'look-05',
    num: '05',
    title: 'Boho Lakeshore Floral Dress',
    category: 'RESORT & DESTINATION',
    tag: 'RESORT',
    concept: 'Romantic Textures',
    fabric: 'Spun Cotton Floral & Leather',
    story: 'Soft white floral midi dress paired with rustic leather boots and relaxed lakeside styling. A romantic edit that bridges bohemian freedom with considered personal expression.',
    occasion: 'Vacation Edits, Coastal Resort & Romantic Dates',
    image: '/images/includes/IMG_9135.JPG.jpeg',
  },
  {
    id: 'look-06',
    num: '06',
    title: 'Midnight Off-Shoulder Evening Drape',
    category: 'EDITORIAL EVENING',
    tag: 'EVENING',
    concept: 'Sculpted Glamour',
    fabric: 'Gathered Ruched Jersey & Gold Accents',
    story: 'Sleek off-shoulder dark navy column dress featuring ruched waist detailing, statement gold cuffs, and dark sunglasses. A high-fashion silhouette built for the woman who commands every room she enters.',
    occasion: 'Galas, High Fashion Affairs & Red Carpet Events',
    image: '/images/includes/IMG_8826.JPG.jpeg',
  },
  {
    id: 'look-07',
    num: '07',
    title: 'Sculpted High-Waist Tailored Ensemble',
    category: 'BESPOKE CONSULTATIONS',
    tag: 'BESPOKE',
    concept: 'Proportion & Balance',
    fabric: 'Heavy Crepe & Structured Tailoring',
    story: 'Bespoke tailoring built around natural shoulder drops and waist-accentuating architectural cuts. This is the essence of the Jennifer method — understanding your body\'s natural lines and dressing to honour them.',
    occasion: 'Bespoke Consultation & Personal Image Transformation',
    image: '/images/includes/IMG_0267.JPG.jpeg',
  },
  {
    id: 'look-08',
    num: '08',
    title: 'Resort Silhouette & Pleated Drape',
    category: 'RESORT & DESTINATION',
    tag: 'RESORT',
    concept: 'Fluid Resort Motion',
    fabric: 'Pleated Chiffon & Natural Tonal Weave',
    story: 'Intentional holiday capsule edit designed for effortless transition from afternoon beachside to evening dining. The pleated drape captures air and light — movement as architecture.',
    occasion: 'Vacation Edits, Coastal Resort & Romantic Dates',
    image: '/images/includes/IMG_8771.JPG.jpeg',
  },
];
