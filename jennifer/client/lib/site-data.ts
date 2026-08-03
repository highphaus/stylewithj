// lib/site-data.ts
// Shared types + seed data for all dynamic site content (Hero, About, Meet, Contact, Services, Clientele, Journal, Lookbook, Testimonials)

export interface HeroContent {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleItalic: string;
  subtitleLine1: string;
  subtitleLine2: string;
  ctaText: string;
  ctaUrl: string;
  desktopImage: string;
  mobileImage: string;
  sideText: string;
}

export interface AboutContentData {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  philosophyQuote: string;
  goalQuote: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyParagraph3: string;
  creativeDirectorTitle: string;
  creativeDirectorName: string;
  creativeDirectorImage: string;
}

export interface MeetContentData {
  eyebrow: string;
  title: string;
  subtitle: string;
  bioText: string;
  quote: string;
  accentTitle: string;
  accentText: string;
  image: string;
}

export interface ContactContentData {
  heading: string;
  address: string;
  email: string;
  phone: string;
  hours: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  avatar?: string;
}

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

// ── SEED DATA DEFAULTS ──

export const seedHeroContent: HeroContent = {
  eyebrow: "Personal Stylist",
  titleLine1: "Style that",
  titleLine2: "reflects who",
  titleItalic: "you are.",
  subtitleLine1: "Intentional wardrobes.",
  subtitleLine2: "Timeless confidence.",
  ctaText: "Connect",
  ctaUrl: "/connect",
  desktopImage: "/images/hero/hero image desktop.png",
  mobileImage: "/images/hero/hero image.jpeg",
  sideText: "Editorial approach. Personal touch.",
};

export const seedAboutContent: AboutContentData = {
  eyebrow: "About Me",
  titleLine1: "Clothes caught my eye.",
  titleLine2: "Style caught my heart.",
  philosophyQuote: "“Style is personal. It should fit you, your personality, your lifestyle, your comfort, and the way you want to show up in the world.”",
  goalQuote: "“My goal is simple: to help you find a style that feels like you, only better.”",
  storyParagraph1: "I've always believed that getting dressed should feel good, not like a rulebook you have to follow.",
  storyParagraph2: "My journey with styling started through modelling, where I found myself more fascinated by what happened behind the scenes: the outfits, the details, and the way the right look could change how someone carried themselves.",
  storyParagraph3: "As I explored my own style, I learned what made me feel comfortable, confident, and like the best version of myself. That journey led me to start styling friends and people around me, helping them discover what truly suited them.",
  creativeDirectorTitle: "CREATIVE DIRECTOR",
  creativeDirectorName: "Jennifer",
  creativeDirectorImage: "/images/includes/IMG_0267.JPG.jpeg",
};

export const seedMeetContent: MeetContentData = {
  eyebrow: "THE DESIGNER PROFILE",
  title: "Meet Jennifer.",
  subtitle: "FOUNDER & CREATIVE DIRECTOR",
  bioText: "Helping individuals discover, refine, and elevate their personal style with custom wardrobe curations built for real life, confidence, and quiet luxury.",
  quote: "“Style is a deeply personal expression of who you are. Every time you dress, you are telling the world how you want to show up.”",
  accentTitle: "PHILOSOPHY ACCENT",
  accentText: "An intentional approach focused on physical posture, silhouette proportions, and personal confidence over fleeting trends.",
  image: "/images/includes/052F83BA-6047-49C8-9BBF-37C6FFE2C106.JPG.jpeg",
};

export const seedContactContent: ContactContentData = {
  heading: "Let's Connect",
  address: "DLF Emporio, Vasant Kunj\nNew Delhi, Delhi 110070",
  email: "info@stylewithj.com",
  phone: "+91 98765 43210",
  hours: "Mon - Fri: 9am - 6pm\nSat: 10am - 4pm\nSun: Closed",
};

export const seedTestimonials: TestimonialItem[] = [
  {
    id: "test-01",
    name: "Ananya R.",
    role: "Founder & CEO",
    location: "New Delhi",
    text: "Jennifer completely transformed how I present myself for board meetings and investor presentations. My wardrobe finally reflects my leadership style.",
    avatar: "/images/includes/IMG_8846.JPG.jpeg"
  },
  {
    id: "test-02",
    name: "Meera K.",
    role: "Architect & Creative",
    location: "Mumbai",
    text: "Working with Style with J gave me clarity. I no longer panic when getting dressed for events or daily meetings. Every piece has purpose.",
    avatar: "/images/includes/IMG_0283.JPG.jpeg"
  },
  {
    id: "test-03",
    name: "Priya S.",
    role: "Bridesmaid & Guest",
    location: "Bengaluru",
    text: "The occasion curation for my sister's wedding week was flawless. Jennifer handled everything from heritage drapes to footwear pairing.",
    avatar: "/images/includes/IMG_8881.JPG.jpeg"
  }
];

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
