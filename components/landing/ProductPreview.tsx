"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  CreditCard, 
  Cpu, 
  Activity, 
  Terminal,
  Zap
} from "lucide-react";

const layers = [
  {
    id: "dashboard",
    title: "Unified Liquidity",
    subtitle: "Aggregation: Zenith • UBA • Access",
    value: "₦4,820,340.22",
    label: "Total Liquid Position",
    icon: <LayoutDashboard className="w-4 h-4 text-emerald-500" />,
    color: "emerald"
  },
  {
    id: "card",
    title: "Control Protocol",
    subtitle: "Active Spend Governance",
    value: "LOCKED",
    label: "Policy: Budget Integrity",
    icon: <CreditCard className="w-4 h-4 text-blue-500" />,
    color: "blue"
  },
  {
    id: "insights",
    title: "Neural Action",
    subtitle: "Logic: Optimization Loop",
    value: "PAUSE DSTV",
    label: "Redirection: Palantir (PLTR)",
    icon: <Cpu className="w-4 h-4 text-amber-500" />,
    color: "amber"
  },
  {
    id: "health",
    title: "Fiscal Health",
    subtitle: "Governance Scoring",
    value: "A+ / 94.2",
    label: "Institutional Grade",
    icon: <Activity className="w-4 h-4 text-indigo-500" />,
    color: "indigo"
  },
];

export default function ProductPreview() {
  return (
    <section className="bg-white dark:bg-[#0A0D27] py-24 lg:py-32 border-t border-slate-100 dark:border-white/5">
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* SECTION HEADER */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <div>
            <div className="flex items-center gap-2 mb-4 text-emerald-500">
              <Terminal className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">
                Live OS Preview
              </span>
            </div>
            <h3 className="text-4xl font-medium tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Fragmented data, <br />
              <span className="text-slate-400 font-light italic">unified intelligence.</span>
            </h3>
          </div>
          <div className="lg:text-right">
            <p className="text-xs font-mono text-slate-500 dark:text-slate-500 uppercase tracking-widest leading-loose">
              System: Stable <br />
              Node: Lagos_Central_01 <br />
              Uptime: 99.998%
            </p>
          </div>
        </div>

        {/* INTERFACE GRID */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {layers.map((layer, idx) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex flex-col rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1131]/40 overflow-hidden"
            >
              {/* TOP: "Screen" Area */}
              <div className="relative p-6 pt-8 flex flex-col items-center justify-center border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                {/* Visual Pips */}
                <div className="absolute top-3 left-3 flex gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500/20" />
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500/20" />
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/20" />
                </div>
                
                <div className={`mb-6 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                  {layer.icon}
                </div>

                <div className="text-center space-y-1">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter italic">
                    {layer.subtitle}
                  </div>
                  <div className="text-xl font-mono font-bold text-slate-900 dark:text-white tracking-tight">
                    {layer.value}
                  </div>
                </div>

                {/* Cyber-Security Scan Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent h-1/2 w-full"
                  animate={{ top: ['-50%', '100%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* BOTTOM: Meta Area */}
              <div className="p-5 bg-white dark:bg-transparent flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{layer.title}</span>
                  <Zap className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 tracking-tight">
                  {layer.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* TECHNICAL DISCLAIMER */}
        <div className="mt-16 flex items-center justify-center gap-6 opacity-30">
          <div className="h-px flex-1 bg-slate-400 dark:bg-slate-800" />
          <div className="flex items-center gap-3 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-[0.4em]">
            <span>End-to-End Encryption</span>
            <div className="h-1 w-1 rounded-full bg-slate-500" />
            <span>Non-Custodial Logic</span>
          </div>
          <div className="h-px flex-1 bg-slate-400 dark:bg-slate-800" />
        </div>
      </div>
    </section>
  );
}