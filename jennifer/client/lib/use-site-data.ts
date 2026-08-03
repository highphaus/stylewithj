'use client';
// lib/use-site-data.ts
// Client hook managing Services, Clientele, and Journal articles for the entire site & admin panel

import { useState, useEffect, useCallback } from 'react';
import { 
  ServiceItem, seedServices, 
  AudienceItem, seedAudiences, 
  JournalArticle, seedArticles 
} from './site-data';

const SERVICES_KEY = 'swj_services';
const AUDIENCES_KEY = 'swj_audiences';
const ARTICLES_KEY = 'swj_articles';

export function useSiteData() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [audiences, setAudiences] = useState<AudienceItem[]>([]);
  const [articles, setArticles] = useState<JournalArticle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedServices = localStorage.getItem(SERVICES_KEY);
      setServices(storedServices ? JSON.parse(storedServices) : seedServices);

      const storedAudiences = localStorage.getItem(AUDIENCES_KEY);
      setAudiences(storedAudiences ? JSON.parse(storedAudiences) : seedAudiences);

      const storedArticles = localStorage.getItem(ARTICLES_KEY);
      setArticles(storedArticles ? JSON.parse(storedArticles) : seedArticles);
    } catch {
      setServices(seedServices);
      setAudiences(seedAudiences);
      setArticles(seedArticles);
    }
    setIsLoaded(true);
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

  const resetAllSiteData = useCallback(() => {
    setServices(seedServices);
    setAudiences(seedAudiences);
    setArticles(seedArticles);
    localStorage.setItem(SERVICES_KEY, JSON.stringify(seedServices));
    localStorage.setItem(AUDIENCES_KEY, JSON.stringify(seedAudiences));
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(seedArticles));
  }, []);

  return {
    services, addService, updateService, deleteService,
    audiences, addAudience, updateAudience, deleteAudience,
    articles, addArticle, updateArticle, deleteArticle,
    isLoaded, resetAllSiteData
  };
}
