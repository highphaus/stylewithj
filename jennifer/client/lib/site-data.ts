// lib/site-data.ts
// Shared types + seed data for all dynamic site content (Services, Clientele, Journal, Lookbook)

export interface ServiceItem {
  id: string;
  num: string;
  category: string;
  name: string;
  desc: string;
  image: string;
}

export interface AudienceItem {
  id: string;
  title: string;
  keyword: string;
  desc: string;
  image: string;
  slug: string;
}

export interface JournalArticle {
  id: string;
  num: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  date?: string;
}

export const seedServices: ServiceItem[] = [
  { 
    id: "service-01",
    num: "01",
    category: "Style Discovery",
    name: "Personal Styling", 
    desc: "Discover and define your personal style with looks tailored to your personality, lifestyle, comfort, preferences, and the way you want to show up in the world.",
    image: "/images/includes/IMG_0271.JPG.jpeg"
  },
  { 
    id: "service-02",
    num: "02",
    category: "Closet Evolution",
    name: "Wardrobe Styling", 
    desc: "Make your existing wardrobe work harder. Rediscover forgotten pieces, create fresh outfit combinations, identify what's missing, and build a versatile closet.",
    image: "/images/includes/IMG_1406.JPG.jpeg"
  },
  { 
    id: "service-03",
    num: "03",
    category: "Intentional Shopping",
    name: "Personal Shopping", 
    desc: "Shop with intention through curated recommendations tailored to your style, lifestyle, and budget. Spend less time searching and more time finding what works.",
    image: "/images/includes/IMG_1423.JPG.jpeg"
  },
  { 
    id: "service-04",
    num: "04",
    category: "Event & Celebration",
    name: "Occasion Styling", 
    desc: "Tell us where you're going, and we'll help you figure out what to wear. From weddings and parties to date nights and celebrations, curate the perfect look.",
    image: "/images/includes/IMG_1754.JPG.jpeg"
  },
  { 
    id: "service-05",
    num: "05",
    category: "Professional Identity",
    name: "Workwear Styling", 
    desc: "Build a work wardrobe that feels polished, confident, comfortable, and authentically yours. From everyday office looks to important executive presentations.",
    image: "/images/includes/IMG_8863.JPG.jpeg"
  }
];

export const seedAudiences: AudienceItem[] = [
  { 
    id: "aud-01",
    title: "Creators & Influencers", 
    keyword: "Distinction",
    desc: "Develop a distinctive image that supports your personal brand and audience growth.",
    image: "/images/includes/IMG_8846.JPG.jpeg",
    slug: "creators"
  },
  { 
    id: "aud-02",
    title: "Founders & Entrepreneurs", 
    keyword: "Identity",
    desc: "Create a memorable personal brand that aligns with your vision and leadership.",
    image: "/images/includes/IMG_0283.JPG.jpeg",
    slug: "founders"
  },
  { 
    id: "aud-03",
    title: "Executives & Leaders", 
    keyword: "Influence",
    desc: "Command respect, authority, and influence through a refined personal image.",
    image: "/images/includes/IMG_8881.JPG.jpeg",
    slug: "executives"
  },
  { 
    id: "aud-04",
    title: "Working Professionals", 
    keyword: "Presence",
    desc: "Build confidence and executive presence in your everyday professional life.",
    image: "/images/includes/IMG_9140.JPG.jpeg",
    slug: "professionals"
  },
  { 
    id: "aud-05",
    title: "Individuals Seeking Transformation", 
    keyword: "Genesis",
    desc: "Reinvent your style, confidence, and self-image with expert guidance.",
    image: "/images/includes/IMG_0332.JPG.jpeg",
    slug: "individuals"
  },
  { 
    id: "aud-06",
    title: "Students & Job Seekers", 
    keyword: "Impression",
    desc: "Make stronger first impressions and stand out in competitive environments.",
    image: "/images/includes/IMG_5321.JPG.jpeg",
    slug: "students"
  }
];

export const seedArticles: JournalArticle[] = [
  {
    id: "art-01",
    num: "01",
    title: "7 Styling Rules That Will Instantly Elevate Your Everyday Looks",
    category: "The Style Edit",
    image: "/images/includes/IMG_0330.JPG.jpeg",
    excerpt: "Discover the fundamental principles of proportion, fabric pairing, and intentional accessorizing that elevate simple everyday outfits into high-end statements."
  },
  {
    id: "art-02",
    num: "02",
    title: "You Don't Need More Clothes. You Need Better Outfits.",
    category: "The Wardrobe Edit",
    image: "/images/includes/IMG_8857.JPG.jpeg",
    excerpt: "Unlock the secret to capsule wardrobe versatility by learning how to recombine your existing silhouettes instead of constantly buying new garments."
  },
  {
    id: "art-03",
    num: "03",
    title: "How to Look Expensive Without Spending a Fortune",
    category: "The Expensive Edit",
    image: "/images/includes/IMG_9158.JPG.jpeg",
    excerpt: "Focusing on fit, monochrome tailoring, and polished grooming — actionable advice for looking luxurious on any budget."
  }
];
