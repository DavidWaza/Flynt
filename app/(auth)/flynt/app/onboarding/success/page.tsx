import React from "react";
import Link from "next/link";
import SyncAnimation from "../../../components/SyncAnimation";
import SyncProgress from "../../../components/SyncProgress";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-primary">
      <h1 className="text-2xl font-bold text-text-primary mb-4">Success!</h1>
      <p className="text-lg text-text-secondary mb-6">
        Your card has been successfully connected and is syncing.
      </p>
      <SyncAnimation />
      <SyncProgress />
      <div className="mt-6">
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-green-primary text-white rounded-lg">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;