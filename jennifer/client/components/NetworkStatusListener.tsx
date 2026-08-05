'use client';

import { useEffect } from 'react';

export default function NetworkStatusListener() {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleNetworkResumption = () => {
      // Handles recovery when computer wakes up from sleep (ERR_NETWORK_IO_SUSPENDED)
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (typeof window !== 'undefined' && navigator.onLine) {
          // Re-verify network socket health silently
          fetch(window.location.href, { method: 'HEAD', cache: 'no-store' })
            .then((res) => {
              if (res.ok) {
                // Connection successfully restored
              }
            })
            .catch(() => {
              // Silently retry connection
            });
        }
      }, 800);
    };

    window.addEventListener('online', handleNetworkResumption);
    window.addEventListener('focus', handleNetworkResumption);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('online', handleNetworkResumption);
      window.removeEventListener('focus', handleNetworkResumption);
    };
  }, []);

  return null;
}
