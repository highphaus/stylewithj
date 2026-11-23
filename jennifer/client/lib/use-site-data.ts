'use client';
// lib/use-site-data.ts
// Comprehensive hook managing all site content & text blocks for home page, about page, meet section, hero section, contact info, testimonials, services, clientele, journal, transformations, CTA banner, and responsive device controls.

import { useState, useEffect, useCallback } from 'react';
import { 
  HeroContent, seedHeroContent,
  AboutContentData, seedAboutContent,
  MeetContentData, seedMeetContent,
  ContactContentData, seedContactContent,
  TestimonialItem, seedTestimonials,
  ServiceItem, seedServices, 
  AudienceItem, seedAudiences, 
  JournalArticle, seedArticles,
  TransformationItem, seedTransformations,
  CtaBannerContent, seedCtaBanner,
  ResponsiveConfig, seedResponsiveConfig
} from './site-data';

const HERO_KEY = 'swj_hero';
const ABOUT_KEY = 'swj_about';
const MEET_KEY = 'swj_meet';
const CONTACT_KEY = 'swj_contact';
const TESTIMONIALS_KEY = 'swj_testimonials';
const SERVICES_KEY = 'swj_services_v2';
const AUDIENCES_KEY = 'swj_audiences';
const ARTICLES_KEY = 'swj_articles';
const TRANSFORMATIONS_KEY = 'swj_transformations';
const CTA_BANNER_KEY = 'swj_cta_banner';
const RESPONSIVE_KEY = 'swj_responsive';

function safeSetItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.warn(`[useSiteData] Storage quota exceeded or disabled for key "${key}"`, err);
  }
}

function syncToServer(key: string, data: any) {
  if (typeof window === 'undefined') return;
  fetch('/api/site-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, data }),
  }).catch(err => console.warn(`[useSiteData] Failed to sync ${key} to server:`, err));
}

export function useSiteData() {
  const [hero, setHero] = useState<HeroContent>(seedHeroContent);
  const [about, setAbout] = useState<AboutContentData>(seedAboutContent);
  const [meet, setMeet] = useState<MeetContentData>(seedMeetContent);
  const [contact, setContact] = useState<ContactContentData>(seedContactContent);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(seedTestimonials);
  const [services, setServices] = useState<ServiceItem[]>(seedServices);
  const [audiences, setAudiences] = useState<AudienceItem[]>(seedAudiences);
  const [articles, setArticles] = useState<JournalArticle[]>(seedArticles);
  const [transformations, setTransformations] = useState<TransformationItem[]>(seedTransformations);
  const [ctaBanner, setCtaBanner] = useState<CtaBannerContent>(seedCtaBanner);
  const [responsive, setResponsive] = useState<ResponsiveConfig>(seedResponsiveConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Instant local read for zero-delay initial render
    try {
      const storedHero = localStorage.getItem(HERO_KEY);
      if (storedHero) {
        const parsed = JSON.parse(storedHero);
        setHero({
          ...seedHeroContent,
          ...parsed,
          desktopImagePosition: parsed.desktopImagePosition || seedHeroContent.desktopImagePosition || 'center 50%',
          mobileImagePosition: parsed.mobileImagePosition || seedHeroContent.mobileImagePosition || 'center 15%',
        });
      }

      const storedAbout = localStorage.getItem(ABOUT_KEY);
      if (storedAbout) setAbout(JSON.parse(storedAbout));

      const storedMeet = localStorage.getItem(MEET_KEY);
      if (storedMeet) setMeet(JSON.parse(storedMeet));

      const storedContact = localStorage.getItem(CONTACT_KEY);
      if (storedContact) setContact(JSON.parse(storedContact));

      const storedTestimonials = localStorage.getItem(TESTIMONIALS_KEY);
      if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));

      const storedServices = localStorage.getItem(SERVICES_KEY);
      if (storedServices) {
        try {
          const parsed = JSON.parse(storedServices);
          if (Array.isArray(parsed) && parsed.length >= seedServices.length) {
            setServices(parsed);
          } else {
            setServices(seedServices);
            safeSetItem(SERVICES_KEY, JSON.stringify(seedServices));
          }
        } catch {
          setServices(seedServices);
        }
      } else {
        setServices(seedServices);
        safeSetItem(SERVICES_KEY, JSON.stringify(seedServices));
      }

      const storedAudiences = localStorage.getItem(AUDIENCES_KEY);
      if (storedAudiences) setAudiences(JSON.parse(storedAudiences));

      const storedArticles = localStorage.getItem(ARTICLES_KEY);
      if (storedArticles) setArticles(JSON.parse(storedArticles));

      const storedTransformations = localStorage.getItem(TRANSFORMATIONS_KEY);
      if (storedTransformations) {
        try {
          const parsed = JSON.parse(storedTransformations);
          if (Array.isArray(parsed)) {
            const merged = [...parsed];
            seedTransformations.forEach(seed => {
              if (!merged.some(m => m.id === seed.id)) {
                merged.push(seed);
              }
            });
            setTransformations(merged);
          }
        } catch {
          setTransformations(seedTransformations);
        }
      }

      const storedCta = localStorage.getItem(CTA_BANNER_KEY);
      if (storedCta) setCtaBanner(JSON.parse(storedCta));

      const storedResp = localStorage.getItem(RESPONSIVE_KEY);
      if (storedResp) setResponsive({ ...seedResponsiveConfig, ...JSON.parse(storedResp) });
    } catch {
      // Fallback to defaults
    }
    setIsLoaded(true);

    // 2. Fetch global synced data from server so all devices see updates
    fetch('/api/site-data')
      .then(res => res.json())
      .then(json => {
        if (json?.success && json?.data) {
          const d = json.data;
          if (d.hero) {
            setHero(prev => ({ ...prev, ...d.hero }));
            safeSetItem(HERO_KEY, JSON.stringify(d.hero));
          }
          if (d.about) {
            setAbout(prev => ({ ...prev, ...d.about }));
            safeSetItem(ABOUT_KEY, JSON.stringify(d.about));
          }
          if (d.meet) {
            setMeet(prev => ({ ...prev, ...d.meet }));
            safeSetItem(MEET_KEY, JSON.stringify(d.meet));
          }
          if (d.contact) {
            setContact(prev => ({ ...prev, ...d.contact }));
            safeSetItem(CONTACT_KEY, JSON.stringify(d.contact));
          }
          if (d.testimonials && Array.isArray(d.testimonials)) {
            setTestimonials(d.testimonials);
            safeSetItem(TESTIMONIALS_KEY, JSON.stringify(d.testimonials));
          }
          if (d.services && Array.isArray(d.services) && d.services.length >= seedServices.length) {
            setServices(d.services);
            safeSetItem(SERVICES_KEY, JSON.stringify(d.services));
          }
          if (d.audiences && Array.isArray(d.audiences)) {
            setAudiences(d.audiences);
            safeSetItem(AUDIENCES_KEY, JSON.stringify(d.audiences));
          }
          if (d.articles && Array.isArray(d.articles)) {
            setArticles(d.articles);
            safeSetItem(ARTICLES_KEY, JSON.stringify(d.articles));
          }
          if (d.transformations && Array.isArray(d.transformations)) {
            setTransformations(d.transformations);
            safeSetItem(TRANSFORMATIONS_KEY, JSON.stringify(d.transformations));
          }
          if (d.ctaBanner) {
            setCtaBanner(prev => ({ ...prev, ...d.ctaBanner }));
            safeSetItem(CTA_BANNER_KEY, JSON.stringify(d.ctaBanner));
          }
          if (d.responsive) {
            setResponsive(prev => ({ ...prev, ...d.responsive }));
            safeSetItem(RESPONSIVE_KEY, JSON.stringify(d.responsive));
          }
        }
      })
      .catch(err => console.warn('[useSiteData] Server sync fetch failed:', err));
  }, []);

  // ── HERO SECTION UPDATER ──
  const updateHero = useCallback((changes: Partial<HeroContent>) => {
    setHero(prev => {
      const updated = { ...prev, ...changes };
      safeSetItem(HERO_KEY, JSON.stringify(updated));
      syncToServer('hero', updated);
      return updated;
    });
  }, []);

  // ── ABOUT SECTION UPDATER ──
  const updateAbout = useCallback((changes: Partial<AboutContentData>) => {
    setAbout(prev => {
      const updated = { ...prev, ...changes };
      safeSetItem(ABOUT_KEY, JSON.stringify(updated));
      syncToServer('about', updated);
      return updated;
    });
  }, []);

  // ── MEET SECTION UPDATER ──
  const updateMeet = useCallback((changes: Partial<MeetContentData>) => {
    setMeet(prev => {
      const updated = { ...prev, ...changes };
      safeSetItem(MEET_KEY, JSON.stringify(updated));
      syncToServer('meet', updated);
      return updated;
    });
  }, []);

  // ── CONTACT SECTION UPDATER ──
  const updateContact = useCallback((changes: Partial<ContactContentData>) => {
    setContact(prev => {
      const updated = { ...prev, ...changes };
      safeSetItem(CONTACT_KEY, JSON.stringify(updated));
      syncToServer('contact', updated);
      return updated;
    });
  }, []);

  // ── CTA BANNER UPDATER ──
  const updateCtaBanner = useCallback((changes: Partial<CtaBannerContent>) => {
    setCtaBanner(prev => {
      const updated = { ...prev, ...changes };
      safeSetItem(CTA_BANNER_KEY, JSON.stringify(updated));
      syncToServer('ctaBanner', updated);
      return updated;
    });
  }, []);

  // ── RESPONSIVE CONFIG UPDATER ──
  const updateResponsive = useCallback((changes: Partial<ResponsiveConfig>) => {
    setResponsive(prev => {
      const updated = { ...prev, ...changes };
      safeSetItem(RESPONSIVE_KEY, JSON.stringify(updated));
      syncToServer('responsive', updated);
      return updated;
    });
  }, []);

  // ── TESTIMONIALS CRUD ──
  const addTestimonial = useCallback((item: Omit<TestimonialItem, 'id'>) => {
    setTestimonials(prev => {
      const id = `test-${Date.now()}`;
      const updated = [...prev, { ...item, id }];
      safeSetItem(TESTIMONIALS_KEY, JSON.stringify(updated));
      syncToServer('testimonials', updated);
      return updated;
    });
  }, []);

  const updateTestimonial = useCallback((id: string, changes: Partial<TestimonialItem>) => {
    setTestimonials(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, ...changes } : t);
      safeSetItem(TESTIMONIALS_KEY, JSON.stringify(updated));
      syncToServer('testimonials', updated);
      return updated;
    });
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setTestimonials(prev => {
      const updated = prev.filter(t => t.id !== id);
      safeSetItem(TESTIMONIALS_KEY, JSON.stringify(updated));
      syncToServer('testimonials', updated);
      return updated;
    });
  }, []);

  // ── SERVICES CRUD ──
  const addService = useCallback((service: Omit<ServiceItem, 'id' | 'num'>) => {
    setServices(prev => {
      const id = `service-${Date.now()}`;
      const num = String(prev.length + 1).padStart(2, '0');
      const updated = [...prev, { ...service, id, num }];
      safeSetItem(SERVICES_KEY, JSON.stringify(updated));
      syncToServer('services', updated);
      return updated;
    });
  }, []);

  const updateService = useCallback((id: string, changes: Partial<ServiceItem>) => {
    setServices(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, ...changes } : s);
      safeSetItem(SERVICES_KEY, JSON.stringify(updated));
      syncToServer('services', updated);
      return updated;
    });
  }, []);

  const deleteService = useCallback((id: string) => {
    setServices(prev => {
      const updated = prev.filter(s => s.id !== id);
      safeSetItem(SERVICES_KEY, JSON.stringify(updated));
      syncToServer('services', updated);
      return updated;
    });
  }, []);

  // ── AUDIENCES CRUD ──
  const addAudience = useCallback((audience: Omit<AudienceItem, 'id'>) => {
    setAudiences(prev => {
      const id = `aud-${Date.now()}`;
      const updated = [...prev, { ...audience, id }];
      safeSetItem(AUDIENCES_KEY, JSON.stringify(updated));
      syncToServer('audiences', updated);
      return updated;
    });
  }, []);

  const updateAudience = useCallback((id: string, changes: Partial<AudienceItem>) => {
    setAudiences(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...changes } : a);
      safeSetItem(AUDIENCES_KEY, JSON.stringify(updated));
      syncToServer('audiences', updated);
      return updated;
    });
  }, []);

  const deleteAudience = useCallback((id: string) => {
    setAudiences(prev => {
      const updated = prev.filter(a => a.id !== id);
      safeSetItem(AUDIENCES_KEY, JSON.stringify(updated));
      syncToServer('audiences', updated);
      return updated;
    });
  }, []);

  // ── ARTICLES CRUD ──
  const addArticle = useCallback((article: Omit<JournalArticle, 'id' | 'num'>) => {
    setArticles(prev => {
      const id = `art-${Date.now()}`;
      const num = String(prev.length + 1).padStart(2, '0');
      const updated = [...prev, { ...article, id, num }];
      safeSetItem(ARTICLES_KEY, JSON.stringify(updated));
      syncToServer('articles', updated);
      return updated;
    });
  }, []);

  const updateArticle = useCallback((id: string, changes: Partial<JournalArticle>) => {
    setArticles(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...changes } : a);
      safeSetItem(ARTICLES_KEY, JSON.stringify(updated));
      syncToServer('articles', updated);
      return updated;
    });
  }, []);

  const deleteArticle = useCallback((id: string) => {
    setArticles(prev => {
      const updated = prev.filter(a => a.id !== id);
      safeSetItem(ARTICLES_KEY, JSON.stringify(updated));
      syncToServer('articles', updated);
      return updated;
    });
  }, []);

  // ── TRANSFORMATIONS CRUD ──
  const addTransformation = useCallback((item: Omit<TransformationItem, 'id'>) => {
    setTransformations(prev => {
      const id = String(prev.length + 1).padStart(2, '0');
      const updated = [...prev, { ...item, id }];
      safeSetItem(TRANSFORMATIONS_KEY, JSON.stringify(updated));
      syncToServer('transformations', updated);
      return updated;
    });
  }, []);

  const updateTransformation = useCallback((id: string, changes: Partial<TransformationItem>) => {
    setTransformations(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, ...changes } : t);
      safeSetItem(TRANSFORMATIONS_KEY, JSON.stringify(updated));
      syncToServer('transformations', updated);
      return updated;
    });
  }, []);

  const deleteTransformation = useCallback((id: string) => {
    setTransformations(prev => {
      const updated = prev.filter(t => t.id !== id);
      safeSetItem(TRANSFORMATIONS_KEY, JSON.stringify(updated));
      syncToServer('transformations', updated);
      return updated;
    });
  }, []);

  // ── RESET ALL ──
  const resetAllSiteData = useCallback(() => {
    setHero(seedHeroContent);
    setAbout(seedAboutContent);
    setMeet(seedMeetContent);
    setContact(seedContactContent);
    setTestimonials(seedTestimonials);
    setServices(seedServices);
    setAudiences(seedAudiences);
    setArticles(seedArticles);
    setTransformations(seedTransformations);
    setCtaBanner(seedCtaBanner);
    setResponsive(seedResponsiveConfig);

    safeSetItem(HERO_KEY, JSON.stringify(seedHeroContent));
    safeSetItem(ABOUT_KEY, JSON.stringify(seedAboutContent));
    safeSetItem(MEET_KEY, JSON.stringify(seedMeetContent));
    safeSetItem(CONTACT_KEY, JSON.stringify(seedContactContent));
    safeSetItem(TESTIMONIALS_KEY, JSON.stringify(seedTestimonials));
    safeSetItem(SERVICES_KEY, JSON.stringify(seedServices));
    safeSetItem(AUDIENCES_KEY, JSON.stringify(seedAudiences));
    safeSetItem(ARTICLES_KEY, JSON.stringify(seedArticles));
    safeSetItem(TRANSFORMATIONS_KEY, JSON.stringify(seedTransformations));
    safeSetItem(CTA_BANNER_KEY, JSON.stringify(seedCtaBanner));
    safeSetItem(RESPONSIVE_KEY, JSON.stringify(seedResponsiveConfig));

    syncToServer('all', {
      hero: seedHeroContent,
      about: seedAboutContent,
      meet: seedMeetContent,
      contact: seedContactContent,
      testimonials: seedTestimonials,
      services: seedServices,
      audiences: seedAudiences,
      articles: seedArticles,
      transformations: seedTransformations,
      ctaBanner: seedCtaBanner,
      responsive: seedResponsiveConfig,
    });
  }, []);

  return {
    hero, updateHero,
    about, updateAbout,
    meet, updateMeet,
    contact, updateContact,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    services, addService, updateService, deleteService,
    audiences, addAudience, updateAudience, deleteAudience,
    articles, addArticle, updateArticle, deleteArticle,
    transformations, addTransformation, updateTransformation, deleteTransformation,
    ctaBanner, updateCtaBanner,
    responsive, updateResponsive,
    isLoaded, resetAllSiteData
  };
}
