/**
 * Initiates the synchronization process with the banking API
 */
export const startSync = async (): Promise<void> => {
  try {
    const response = await fetch('/api/sync/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to start sync');
    }

    return response.json();
  } catch (error) {
    console.error('Error starting sync:', error);
    throw error;
  }
};

/**
 * Checks the current progress of the ongoing sync
 */
export const checkSyncProgress = async (): Promise<number> => {
  try {
    const response = await fetch('/api/sync/progress', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to check sync progress');
    }

    const data = await response.json();
    return data.progress || 0;
  } catch (error) {
    console.error('Error checking sync progress:', error);
    throw error;
  }
};

/**
 * Cancels the ongoing sync
 */
export const cancelSync = async (): Promise<void> => {
  try {
    const response = await fetch('/api/sync/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to cancel sync');
    }

    return response.json();
  } catch (error) {
    console.error('Error canceling sync:', error);
    throw error;
  }
};