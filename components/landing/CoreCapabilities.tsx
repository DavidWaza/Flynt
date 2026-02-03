"use client";

import React from "react";
import { 
  ShieldAlert, 
  Layers, 
  Repeat, 
  LineChart, 
  ArrowRight 
} from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  {
    id: "predictive",
    title: "Predictive Enforcement",
    desc: "Pre-emptive intervention that blocks transactions before budget thresholds are breached.",
    icon: <ShieldAlert className="w-5 h-5" />,
    status: "Active Protection",
  },
  {
    id: "debt",
    title: "Debt-Aware Logic",
    desc: "Spending decisions are dynamically weighted against outstanding liabilities and interest cycles.",
    icon: <Layers className="w-5 h-5" />,
    status: "Priority: High",
  },
  {
    id: "subscriptions",
    title: "Leak Mitigation",
    desc: "Real-time detection of redundant recurring drains with automated 'Pause/Cancel' protocols.",
    icon: <Repeat className="w-5 h-5" />,
    status: "Scanning...",
  },
  {
    id: "insights",
    title: "Fiscal Forecasting",
    desc: "Neural-driven balance projections that visualize your liquid position 30, 60, and 90 days out.",
    icon: <LineChart className="w-5 h-5" />,
    status: "99.2% Accuracy",
  },
];

export default function CoreCapabilities() {
  return (
    <section className="bg-white dark:bg-[#0A0D27] py-24 border-t border-slate-100 dark:border-white/5">
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500 mb-4">
              System Modules
            </h2>
            <h3 className="text-4xl font-medium tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Advanced <span className="text-slate-400 font-light italic">Fiscal Protocols.</span>
            </h3>
          </div>
          <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
            Deploying institutional-grade logic to manage private capital.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid gap-px bg-slate-200 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden">
          {capabilities.map((cap) => (
            <div 
              key={cap.id} 
              className="group relative bg-white dark:bg-[#0D1131] p-8 transition-all hover:bg-slate-50 dark:hover:bg-[#121841]"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-slate-100 dark:bg-white/5 rounded text-slate-900 dark:text-emerald-500 group-hover:scale-110 transition-transform">
                  {cap.icon}
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                  {cap.status}
                </span>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
                  {cap.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed min-h-[60px]">
                  {cap.desc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2 group-hover:text-emerald-500 transition-colors">
                  View Protocol <ArrowRight className="w-3 h-3" />
                </button>
                {/* Decorative Sparkline element for dark mode */}
                <div className="h-4 w-16 opacity-20 dark:opacity-40">
                   <svg viewBox="0 0 100 20" className="w-full h-full stroke-emerald-500 fill-none">
                      <path d="M0,15 Q25,5 50,15 T100,5" strokeWidth="2" />
                   </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Footer System Status */}
        <div className="mt-12 flex items-center justify-center gap-4 py-4 border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] rounded">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            Integrity Check: Verified
          </span>
          <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">
            End-to-End Encryption Active
          </span>
        </div>
      </div>
    </section>
  );
}