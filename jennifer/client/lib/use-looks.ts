'use client';
// lib/use-looks.ts
// Client hook — manages looks via localStorage, seeded with static data

import { useState, useEffect, useCallback } from 'react';
import { Look, seedLooks } from './looks-data';

const STORAGE_KEY = 'swj_looks_v3';

function syncLooksToServer(updated: Look[]) {
  if (typeof window === 'undefined') return;
  fetch('/api/site-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'looks', data: updated }),
  }).catch(err => console.warn('[useLooks] Failed to sync looks to server:', err));
}

export function useLooks() {
  const [looks, setLooks] = useState<Look[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Initial local load
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Look[] = JSON.parse(stored);
        if (parsed.length < seedLooks.length) {
          setLooks(seedLooks);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(seedLooks));
        } else {
          setLooks(parsed);
        }
      } else {
        setLooks(seedLooks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedLooks));
      }
    } catch {
      setLooks(seedLooks);
    }
    setIsLoaded(true);

    // 2. Fetch global synced looks
    fetch('/api/site-data')
      .then(res => res.json())
      .then(json => {
        if (json?.success && json?.data?.looks && Array.isArray(json.data.looks)) {
          setLooks(json.data.looks);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data.looks));
          } catch { /* ignore quota */ }
        }
      })
      .catch(err => console.warn('[useLooks] Server sync fetch failed:', err));
  }, []);

  const save = useCallback((updated: Look[]) => {
    setLooks(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch { /* ignore quota errors */ }
    syncLooksToServer(updated);
  }, []);

  const addLook = useCallback((look: Omit<Look, 'id' | 'num'>) => {
    setLooks(prev => {
      const id = `look-${Date.now()}`;
      const num = String(prev.length + 1).padStart(2, '0');
      const updated = [...prev, { ...look, id, num }];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch { /* ignore quota */ }
      syncLooksToServer(updated);
      return updated;
    });
  }, []);

  const updateLook = useCallback((id: string, changes: Partial<Look>) => {
    setLooks(prev => {
      const updated = prev.map(l => l.id === id ? { ...l, ...changes } : l);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch { /* ignore quota */ }
      syncLooksToServer(updated);
      return updated;
    });
  }, []);

  const deleteLook = useCallback((id: string) => {
    setLooks(prev => {
      const updated = prev.filter(l => l.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch { /* ignore quota */ }
      syncLooksToServer(updated);
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
