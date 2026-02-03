"use client";

import useSync from "../hooks/useSync";
import React from "react";


const SyncProgress: React.FC = () => {
  const { progress, isSyncing, error } = useSync();

  return (
    <div className="sync-progress-container">
      {isSyncing && (
        <>
          <div className="sync-progress-bar" style={{ width: `${progress}%` }} />
          <p className="sync-progress-text">{`Syncing... ${progress}%`}</p>
        </>
      )}
      {error && <p className="sync-error-text">Error: {error.message}</p>}
      {!isSyncing && progress === 100 && (
        <p className="sync-success-text">Sync complete!</p>
      )}
    </div>
  );
};

export default SyncProgress;