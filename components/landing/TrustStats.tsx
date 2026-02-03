"use client";

import Image from "next/image";
import React from "react";
import { ShieldCheck, ArrowRight, Zap, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustStats() {
  return (
    <section className="relative bg-white dark:bg-[#0A0D27] py-24 lg:py-32">
      <div className="container mx-auto max-w-5xl px-6">
        
        {/* LOGO NETWORK BAR */}
        <div className="mb-20 text-center">
          <p className="mb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600">
            Institutional Network Integration
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 grayscale opacity-60 transition-all hover:grayscale-0">
            <div className="h-6 w-28 relative">
              <Image src="/banks/zenith.png" alt="Zenith" fill className="object-contain" />
            </div>
            <div className="h-6 w-28 relative">
              <Image src="/banks/access.png" alt="Access" fill className="object-contain" />
            </div>
            <div className="h-6 w-28 relative">
              <Image src="/banks/gtb.png" alt="GTBank" fill className="object-contain" />
            </div>
          </div>
        </div>

        {/* STATS TERMINAL */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden shadow-2xl">
          {[
            { label: "Compliance Rate", value: "85%", icon: <ShieldCheck className="w-3 h-3" /> },
            { label: "Avg. Optimized/Mo", value: "₦60,000", icon: <Zap className="w-3 h-3" /> },
            { label: "Decision Latency", value: "<2ms", icon: <Lock className="w-3 h-3" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#0D1131] p-10 text-center group">
              <div className="mb-3 flex justify-center text-emerald-500">
                {stat.icon}
              </div>
              <div className="mb-2 text-5xl font-mono font-medium tracking-tighter text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* FINAL CALL TO ACTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-slate-950 dark:border-emerald-500/30 bg-slate-950 dark:bg-[#0E1233] p-12 text-center shadow-2xl"
        >
          {/* Decorative pattern for the CTA box */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="mb-4 text-3xl font-medium tracking-tight text-white md:text-4xl">
              Ready to deploy <span className="text-emerald-400 italic font-light font-serif">Flynt?</span>
            </h3>
            <p className="mb-10 text-slate-400 text-sm leading-relaxed uppercase tracking-wider">
              Request access to the autonomous financial operating system. 
              Limited slots available for the Beta Governance Protocol.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/waitlist" 
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-sm bg-emerald-500 px-10 py-4 text-xs font-black uppercase tracking-[0.15em] text-[#0A0D27] transition-all hover:bg-emerald-400"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="/demo" 
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-sm border border-white/10 bg-white/5 px-10 py-4 text-xs font-black uppercase tracking-[0.15em] text-white transition hover:bg-white/10"
              >
                Request Demo
              </a>
            </div>
            
            <p className="mt-8 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
              Secured by bank-grade encryption protocols
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}