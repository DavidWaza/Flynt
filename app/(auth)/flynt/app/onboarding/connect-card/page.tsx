'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import SyncAnimation from "../../../components/SyncAnimation";
import SyncProgress from "../../../components/SyncProgress";
import useSync from "../../../hooks/useSync";

export default function ConnectCardPage() {
  const router = useRouter();
  const { startSync, progress, isSyncing, isSuccess } = useSync();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectCard = async () => {
    setIsConnecting(true);
    await startSync();
    setIsConnecting(false);
    
    if (isSuccess) {
      router.push("/onboarding/success");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Connect Your Card</h1>
      <button
        onClick={handleConnectCard}
        disabled={isConnecting}
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        {isConnecting ? "Connecting..." : "Connect Card"}
      </button>

      {isSyncing && (
        <div className="mt-6 w-full max-w-md">
          <SyncAnimation />
          <SyncProgress  />
        </div>
      )}
    </div>
  );
}