'use client';
import { useState } from "react";
import SyncAnimation from "../../components/SyncAnimation";
import SyncProgress from "../../components/SyncProgress";
import useSync from "../../hooks/useSync";

export default function OnboardingPage() {
  const { isSyncing, startSync } = useSync();
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectCard = async () => {
    setIsConnected(true);
    await startSync();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-primary">
      <h1 className="text-2xl font-bold text-text-primary mb-4">Connect Your Card</h1>
      <button
        onClick={handleConnectCard}
        className="px-4 py-2 bg-green-primary text-white rounded-lg"
        disabled={isSyncing}
      >
        {isSyncing ? "Connecting..." : "Connect Card"}
      </button>

      {isConnected && (
        <div className="mt-6">
          {isSyncing ? (
            <>
              <SyncAnimation />
              <SyncProgress  />
            </>
          ) : (
            <p className="text-green-primary">Card connected successfully!</p>
          )}
        </div>
      )}
    </div>
  );
}