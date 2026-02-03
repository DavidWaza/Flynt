"use client";

import React from "react";

export default function BackgroundAnimation({ className = "" }: { className?: string }) {
  return (
    <svg
      className={"pointer-events-none absolute inset-0 -z-10 h-full w-full " + className}
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(15,157,104,0.06)" />
          <stop offset="100%" stopColor="rgba(15,157,104,0.02)" />
        </linearGradient>
      </defs>

      {/* subtle data-flow lines */}
      <g opacity="0.9">
        <path
          d="M50 480 C200 380, 350 260, 600 300 S1000 360, 1150 220"
          stroke="url(#g1)"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.6"
        />
        <path
          d="M30 360 C180 300, 420 200, 640 240 S980 300, 1150 180"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* soft radial glow */}
      <circle cx="920" cy="140" r="180" fill="rgba(15,157,104,0.06)" />

      {/* small animated dots (reduced-motion friendly via CSS) */}
      <g className="animate-[pulse-slow]">
        <circle cx="620" cy="260" r="3" fill="rgba(15,157,104,0.9)" />
        <circle cx="540" cy="210" r="2" fill="rgba(255,255,255,0.6)" />
        <circle cx="700" cy="320" r="2" fill="rgba(255,255,255,0.4)" />
      </g>
    </svg>
  );
}
