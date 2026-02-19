"use client";

import React from 'react';
// import './sync.css';

const SyncAnimation = () => {
  return (
    <div className="sync-animation">
      <div className="sync-circle">
        <div className="sync-inner-circle"></div>
      </div>
      <div className="sync-text">Syncing your card...</div>
      <div className="sync-progress-bar">
        <div className="sync-progress"></div>
      </div>
    </div>
  );
};

export default SyncAnimation;