"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Cpu, BarChart3, Zap } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Secure Aggregation",
    desc: "Seamless integration of institutional data, liabilities, and liquid assets via encrypted API protocols.",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
  },
  {
    id: "02",
    title: "Neural Analytics",
    desc: "Proprietary AI models run multi-vector stress tests and liquidity forecasting in sub-millisecond cycles.",
    icon: <Cpu className="w-5 h-5 text-blue-500" />,
  },
  {
    id: "03",
    title: "Strategic Oversight",
    desc: "The decision engine evaluates transaction risk against pre-defined fiscal governance and growth goals.",
    icon: <BarChart3 className="w-5 h-5 text-amber-500" />,
  },
  {
    id: "04",
    title: "Automated Execution",
    desc: "Instantaneous card authorization and capital deployment based on real-time solvency metrics.",
    icon: <Zap className="w-5 h-5 text-indigo-500" />,
  },
];

export default function FinanceWorkflow() {
  return (
    <section className="py-24 text-slate-900">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase">
              Operational Framework
            </span>
            <h2 className="mt-2 text-4xl font-light tracking-tight text-slate-900 dark:text-white md:text-5xl ">
              The Protocol of <span className="font-semibold text-slate-950 dark:text-slate-300">Precision.</span>
            </h2>
          </div>
          <p className="max-w-md text-slate-500 text-sm leading-relaxed dark:text-slate-300">
            Our multi-layered engine transforms raw fiscal data into actionable capital 
            intelligence, ensuring every dollar aligns with your long-term mandate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 overflow-hidden rounded-xl">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="group relative bg-white p-8 transition-all hover:bg-slate-50"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-slate-400">
                  [{step.id}]
                </span>
                <div className="p-2 bg-slate-50 rounded-md group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3 text-slate-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 mb-6">
                {step.desc}
              </p>

              {/* Decorative Finance Element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-emerald-500 transition-colors" />
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          System Status: Active & Encrypted
        </div>
      </div>
    </section>
  );
}