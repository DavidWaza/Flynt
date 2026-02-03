"use client";

import React from "react";
import useSync from "@/hooks/useSync";

export default function SyncCard({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const { progress, stage } = useSync(onComplete);

  // circle progress math
  const size = 72;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (progress / 100) * circumference;

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="relative rounded-xl bg-bg-secondary/60 border border-border-primary p-6 shadow-lg">
        {/* animated chip card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/2 p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-12 rounded-sm bg-gradient-to-tr from-[#D6FCE4] to-[#4AD9A3] text-xs font-bold flex items-center justify-center text-white">
                FLY
              </div>
              <p className="mt-3 text-sm text-text-muted">Card •••• 1234</p>
            </div>

            <div className="flex items-center gap-3">
              {/* circular progress */}
              <div className="relative">
                <svg width={size} height={size} className="block">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#4ad9a3" />
                      <stop offset="100%" stopColor="#00c2ff" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#11182720"
                    strokeWidth={stroke}
                    fill="none"
                  />
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#g1)"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={circumference - dash}
                    fill="none"
                    style={{ transition: "stroke-dashoffset 300ms linear" }}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm font-semibold">
                      {Math.round(progress)}%
                    </div>
                    <div className="text-[11px] text-text-muted -mt-0.5 capitalize">
                      {stage}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* moving shimmer / sync waves */}
          <div className="pointer-events-none mt-4">
            <div className="relative h-2 overflow-hidden rounded-full bg-white/6">
              <div
                className="absolute -left-24 top-0 h-full w-24 bg-gradient-to-r from-transparent via-green-primary/60 to-transparent animate-sync"
                style={{ animationDuration: "1.6s" }}
              />
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-green-primary" />
              Syncing with bank
            </div>
          </div>

          {/* animated dots floating above */}
          <div className="absolute right-3 -top-3 flex space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-green-primary/80 animate-bounce-slow" />
            <span className="h-2 w-2 rounded-full bg-green-primary/60 animate-bounce-slower" />
            <span className="h-2 w-2 rounded-full bg-green-primary/40 animate-bounce-slowest" />
          </div>
        </div>

        {/* progress details */}
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-bg-elevated">
            <div
              className="h-2 rounded-full bg-green-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-text-muted">
            <div>{stage === "done" ? "Synced" : "Securely syncing transactions"}</div>
            <div>{Math.round(progress)}%</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.animate-sync) {
          animation-name: sync-shimmer;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes sync-shimmer {
          0% {
            transform: translateX(-140%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateX(140%);
            opacity: 0;
          }
        }
        :global(.animate-bounce-slow) {
          animation: bounce 1.2s infinite ease-in-out;
        }
        :global(.animate-bounce-slower) {
          animation: bounce 1.6s infinite ease-in-out;
        }
        :global(.animate-bounce-slowest) {
          animation: bounce 2s infinite ease-in-out;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.9;
          }
          50% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}