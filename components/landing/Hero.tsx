"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  ArrowUpRight, 
  BarChart3, 
  Wallet, 
  ShieldCheck, 
  TrendingUp 
} from "lucide-react";

export default function FlyntHero() {
  return (
    <section className="relative isolate overflow-hidden  py-24 lg:py-32 transition-colors duration-500">
      {/* Structural Grid Background */}
      {/* <div className="absolute inset-0 -z-10 h-full w-full opacity-[0.03] dark:opacity-[0.15] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white dark:via-transparent to-white dark:to-[#0A0D27]"></div>
      </div> */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* LEFT — STRATEGIC CONTENT */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-emerald-500/10 border border-slate-200 dark:border-emerald-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-emerald-400"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Unified Financial Operating System
            </motion.div>

            <h1 className="mb-6 text-5xl font-medium tracking-tight  md:text-7xl">
              Stop budgeting. <br />
              <span className="text-slate-400  font-light italic">Start Governing.</span>
            </h1>

            <p className="mb-10 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Flynt unifies your fragmented accounts—from Zenith to Access—into a single 
              intelligence layer. We translate your spending patterns into 
              <span className="font-semibold"> actionable wealth.</span>
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/waitlist"
                className="group rounded-xl inline-flex items-center justify-center bg-slate-950 dark:bg-emerald-500 px-8 py-4 text-sm font-bold text-white dark:text-[#0A0D27] transition-all hover:opacity-90"
              >
                Access Demo
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="flex -space-x-2">
                {/* Visual indicator of connected banks */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white dark:border-[#0A0D27] bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    {i === 1 ? "Z" : i === 2 ? "A" : "U"}
                  </div>
                ))}
                <div className="flex items-center ml-4 text-xs font-medium text-slate-500 dark:text-slate-500">
                  +12 Banks Connected
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — THE "REASONING" INTERFACE */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1233]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">AI Intelligence Layer</span>
                </div>
                <BarChart3 className="h-4 w-4 text-slate-300 dark:text-slate-600" />
              </div>

              {/* Terminal Content */}
              <div className="p-8">
                {/* Step 1: Aggregation */}
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase text-slate-400 mb-3 tracking-widest">Live Aggregation</p>
                  <div className="flex gap-2">
                    {["Zenith Bank", "Access", "UBA"].map((bank) => (
                      <div key={bank} className="flex-1 rounded border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20 p-2 text-center text-[10px] font-mono text-slate-600 dark:text-slate-400">
                        {bank}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: The Logic (THE CORE VALUE) */}
                <div className="relative space-y-4">
                  <div className="rounded-lg border border-slate-200 dark:border-white/10 p-5 bg-white dark:bg-white/[0.02]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded bg-amber-50 dark:bg-amber-500/10">
                        <Wallet className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Optimization Alert</span>
                    </div>
                    
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                      "International break detected. Pause <span className="font-bold text-slate-900 dark:text-white underline decoration-amber-500/50">DSTV Subscription</span> for 14 days?&quot;
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-4">
                      <span className="text-xs font-bold text-slate-400">Reallocating</span>
                      <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">₦20,000.00</span>
                    </div>
                  </div>

                  {/* Step 3: The Result */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4 rounded-lg bg-emerald-600 p-4 text-white shadow-lg"
                  >
                    <div className="h-10 w-10 rounded bg-white/20 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Portfolio Action</p>
                      <p className="text-sm font-bold">Acquired Fractional Palantir (PLTR)</p>
                    </div>
                    <ArrowUpRight className="ml-auto h-5 w-5 opacity-50" />
                  </motion.div>
                </div>
              </div>

              {/* System Footer */}
              <div className="border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 px-8 py-4 flex justify-between items-center">
                 <span className="text-[10px] font-mono text-slate-400 uppercase">Strategy: Growth_Focus</span>
                 <span className="text-[10px] font-mono text-emerald-500 font-bold">ACTIVE_SYNC</span>
              </div>
            </div>

            {/* Background Glows (Dark Mode Only) */}
            <div className="absolute -z-10 -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px] hidden dark:block" />
            <div className="absolute -z-10 -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px] hidden dark:block" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}