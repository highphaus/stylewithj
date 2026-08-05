'use client';

import { useEffect } from 'react';

export default function NetworkStatusListener() {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleWakeupRecovery = () => {
      clearTimeout(timeoutId);
      // Wait 1.2s for OS network interfaces (Wi-Fi/LAN) to re-initialize after sleep
      timeoutId = setTimeout(() => {
        if (typeof window !== 'undefined' && navigator.onLine) {
          fetch(window.location.href, { method: 'HEAD', cache: 'no-store' })
            .then((res) => {
              if (!res.ok) {
                window.location.reload();
              }
            })
            .catch(() => {
              // ERR_NETWORK_IO_SUSPENDED occurs when sockets break after sleep.
              // Perform a clean reload to immediately re-establish fresh sockets.
              window.location.reload();
            });
        }
      }, 1200);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleWakeupRecovery();
      }
    };

    window.addEventListener('online', handleWakeupRecovery);
    window.addEventListener('focus', handleWakeupRecovery);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('online', handleWakeupRecovery);
      window.removeEventListener('focus', handleWakeupRecovery);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}
