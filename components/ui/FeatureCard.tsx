"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-emerald-500/10",
        className,
      )}
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/20" />

      <div className="relative z-10">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-300">
          {icon}
        </div>

        <h3 className="mb-3 text-xl font-semibold text-white tracking-tight">
          {title}
        </h3>

        <p className="text-gray-400 leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}
