'use client';
// lib/use-site-data.ts
// Comprehensive hook managing all site content & text blocks for home page, about page, meet section, hero section, contact info, testimonials, services, clientele, and journal.

import { useState, useEffect, useCallback } from 'react';
import { 
  HeroContent, seedHeroContent,
  AboutContentData, seedAboutContent,
  MeetContentData, seedMeetContent,
  ContactContentData, seedContactContent,
  TestimonialItem, seedTestimonials,
  ServiceItem, seedServices, 
  AudienceItem, seedAudiences, 
  JournalArticle, seedArticles 
} from './site-data';

const HERO_KEY = 'swj_hero';
const ABOUT_KEY = 'swj_about';
const MEET_KEY = 'swj_meet';
const CONTACT_KEY = 'swj_contact';
const TESTIMONIALS_KEY = 'swj_testimonials';
const SERVICES_KEY = 'swj_services';
const AUDIENCES_KEY = 'swj_audiences';
const ARTICLES_KEY = 'swj_articles';

export function useSiteData() {
  const [hero, setHero] = useState<HeroContent>(seedHeroContent);
  const [about, setAbout] = useState<AboutContentData>(seedAboutContent);
  const [meet, setMeet] = useState<MeetContentData>(seedMeetContent);
  const [contact, setContact] = useState<ContactContentData>(seedContactContent);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(seedTestimonials);
  const [services, setServices] = useState<ServiceItem[]>(seedServices);
  const [audiences, setAudiences] = useState<AudienceItem[]>(seedAudiences);
  const [articles, setArticles] = useState<JournalArticle[]>(seedArticles);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedHero = localStorage.getItem(HERO_KEY);
      if (storedHero) setHero(JSON.parse(storedHero));

      const storedAbout = localStorage.getItem(ABOUT_KEY);
      if (storedAbout) setAbout(JSON.parse(storedAbout));

      const storedMeet = localStorage.getItem(MEET_KEY);
      if (storedMeet) setMeet(JSON.parse(storedMeet));

      const storedContact = localStorage.getItem(CONTACT_KEY);
      if (storedContact) setContact(JSON.parse(storedContact));

      const storedTestimonials = localStorage.getItem(TESTIMONIALS_KEY);
      if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));

      const storedServices = localStorage.getItem(SERVICES_KEY);
      if (storedServices) setServices(JSON.parse(storedServices));

      const storedAudiences = localStorage.getItem(AUDIENCES_KEY);
      if (storedAudiences) setAudiences(JSON.parse(storedAudiences));

      const storedArticles = localStorage.getItem(ARTICLES_KEY);
      if (storedArticles) setArticles(JSON.parse(storedArticles));
    } catch {
      // Fallbacks to seeds on error
    }
    setIsLoaded(true);
  }, []);

  // ── HERO SECTION UPDATER ──
  const updateHero = useCallback((changes: Partial<HeroContent>) => {
    setHero(prev => {
      const updated = { ...prev, ...changes };
      localStorage.setItem(HERO_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ── ABOUT SECTION UPDATER ──
  const updateAbout = useCallback((changes: Partial<AboutContentData>) => {
    setAbout(prev => {
      const updated = { ...prev, ...changes };
      localStorage.setItem(ABOUT_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ── MEET SECTION UPDATER ──
  const updateMeet = useCallback((changes: Partial<MeetContentData>) => {
    setMeet(prev => {
      const updated = { ...prev, ...changes };
      localStorage.setItem(MEET_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ── CONTACT SECTION UPDATER ──
  const updateContact = useCallback((changes: Partial<ContactContentData>) => {
    setContact(prev => {
      const updated = { ...prev, ...changes };
      localStorage.setItem(CONTACT_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ── TESTIMONIALS CRUD ──
  const addTestimonial = useCallback((item: Omit<TestimonialItem, 'id'>) => {
    setTestimonials(prev => {
      const id = `test-${Date.now()}`;
      const updated = [...prev, { ...item, id }];
      localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateTestimonial = useCallback((id: string, changes: Partial<TestimonialItem>) => {
    setTestimonials(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, ...changes } : t);
      localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setTestimonials(prev => {
      const updated = prev.filter(t => t.id !== id);
      localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ── SERVICES CRUD ──
  const addService = useCallback((service: Omit<ServiceItem, 'id' | 'num'>) => {
    setServices(prev => {
      const id = `service-${Date.now()}`;
      const num = String(prev.length + 1).padStart(2, '0');
      const updated = [...prev, { ...service, id, num }];
      localStorage.setItem(SERVICES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateService = useCallback((id: string, changes: Partial<ServiceItem>) => {
    setServices(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, ...changes } : s);
      localStorage.setItem(SERVICES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteService = useCallback((id: string) => {
    setServices(prev => {
      const updated = prev.filter(s => s.id !== id);
      localStorage.setItem(SERVICES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ── AUDIENCES CRUD ──
  const addAudience = useCallback((audience: Omit<AudienceItem, 'id'>) => {
    setAudiences(prev => {
      const id = `aud-${Date.now()}`;
      const updated = [...prev, { ...audience, id }];
      localStorage.setItem(AUDIENCES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateAudience = useCallback((id: string, changes: Partial<AudienceItem>) => {
    setAudiences(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...changes } : a);
      localStorage.setItem(AUDIENCES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteAudience = useCallback((id: string) => {
    setAudiences(prev => {
      const updated = prev.filter(a => a.id !== id);
      localStorage.setItem(AUDIENCES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ── ARTICLES CRUD ──
  const addArticle = useCallback((article: Omit<JournalArticle, 'id' | 'num'>) => {
    setArticles(prev => {
      const id = `art-${Date.now()}`;
      const num = String(prev.length + 1).padStart(2, '0');
      const updated = [...prev, { ...article, id, num }];
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateArticle = useCallback((id: string, changes: Partial<JournalArticle>) => {
    setArticles(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...changes } : a);
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteArticle = useCallback((id: string) => {
    setArticles(prev => {
      const updated = prev.filter(a => a.id !== id);
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(updated));
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

    localStorage.setItem(HERO_KEY, JSON.stringify(seedHeroContent));
    localStorage.setItem(ABOUT_KEY, JSON.stringify(seedAboutContent));
    localStorage.setItem(MEET_KEY, JSON.stringify(seedMeetContent));
    localStorage.setItem(CONTACT_KEY, JSON.stringify(seedContactContent));
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(seedTestimonials));
    localStorage.setItem(SERVICES_KEY, JSON.stringify(seedServices));
    localStorage.setItem(AUDIENCES_KEY, JSON.stringify(seedAudiences));
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(seedArticles));
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
    isLoaded, resetAllSiteData
  };
}
