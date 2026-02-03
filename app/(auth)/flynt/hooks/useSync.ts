'use client';
import { useState } from 'react';
import { startSync, checkSyncProgress } from '../../../../lib/sync'

const useSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const startSynchronization = async () => {
    setIsSyncing(true);
    setProgress(0);
    setError(null);
    setIsSuccess(false);

    try {
      await startSync();

      const interval = setInterval(async () => {
        const currentProgress = await checkSyncProgress();
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsSuccess(true);
          setIsSyncing(false);
        }
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setIsSyncing(false);
    }
  };

  return {
    isSyncing,
    progress,
    error,
    startSync,
    isSuccess,
    startSynchronization,
  };
};

export default useSync;