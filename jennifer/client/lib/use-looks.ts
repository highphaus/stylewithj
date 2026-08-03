'use client';
// lib/use-looks.ts
// Client hook — manages looks via localStorage, seeded with static data

import { useState, useEffect, useCallback } from 'react';
import { Look, seedLooks } from './looks-data';

const STORAGE_KEY = 'swj_looks';

export function useLooks() {
  const [looks, setLooks] = useState<Look[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setLooks(JSON.parse(stored));
      } else {
        setLooks(seedLooks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedLooks));
      }
    } catch {
      setLooks(seedLooks);
    }
    setIsLoaded(true);
  }, []);

  const save = useCallback((updated: Look[]) => {
    setLooks(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch { /* ignore quota errors */ }
  }, []);

  const addLook = useCallback((look: Omit<Look, 'id' | 'num'>) => {
    setLooks(prev => {
      const id = `look-${Date.now()}`;
      const num = String(prev.length + 1).padStart(2, '0');
      const updated = [...prev, { ...look, id, num }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateLook = useCallback((id: string, changes: Partial<Look>) => {
    setLooks(prev => {
      const updated = prev.map(l => l.id === id ? { ...l, ...changes } : l);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteLook = useCallback((id: string) => {
    setLooks(prev => {
      const updated = prev.filter(l => l.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getLook = useCallback((id: string): Look | undefined => {
    return looks.find(l => l.id === id);
  }, [looks]);

  const resetToSeed = useCallback(() => {
    save(seedLooks);
  }, [save]);

  return { looks, isLoaded, addLook, updateLook, deleteLook, getLook, resetToSeed };
}
