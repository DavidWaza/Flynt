"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  AlertTriangle,
  TrendingDown,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

interface InsightItem {
  id: string;
  type: "optimization" | "warning" | "positive";
  title: string;
  description: string;
  actionText?: string;
}

const insights: InsightItem[] = [
  {
    id: "1",
    type: "optimization",
    title: "Save ₦5,840/month",
    description:
      "We found 2 subscriptions you might not be using. Canceling them could save you money each month.",
    actionText: "Take action",
  },
  {
    id: "2",
    type: "warning",
    title: "Transport spending up 18%",
    description:
      "Your transport costs have increased significantly this month compared to your 3-month average.",
    actionText: "Take action",
  },
  {
    id: "3",
    type: "positive",
    title: "Food spending down 12%",
    description:
      "Great job! You've reduced your food & dining expenses compared to last month.",
  },
];

export default function FlyntInsights() {
  const getStyles = (type: InsightItem["type"]) => {
    switch (type) {
      case "optimization":
        return {
          bg: "bg-emerald-50/50 dark:bg-emerald-500/5",
          border: "border-emerald-100 dark:border-emerald-500/20",
          iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
          iconColor: "text-emerald-600 dark:text-emerald-400",
          icon: <Lightbulb className="w-4 h-4" />,
        };
      case "warning":
        return {
          bg: "bg-amber-50/50 dark:bg-amber-500/5",
          border: "border-amber-100 dark:border-amber-500/20",
          iconBg: "bg-amber-100 dark:bg-amber-500/20",
          iconColor: "text-amber-600 dark:text-amber-400",
          icon: <AlertTriangle className="w-4 h-4" />,
        };
      case "positive":
        return {
          bg: "bg-blue-50/50 dark:bg-blue-500/5",
          border: "border-blue-100 dark:border-blue-500/20",
          iconBg: "bg-blue-100 dark:bg-blue-500/20",
          iconColor: "text-blue-600 dark:text-blue-400",
          icon: <TrendingDown className="w-4 h-4" />,
        };
    }
  };

  return (
    <div className="w-full h-96 rounded-2xl border border-slate-200 dark:border-white/10 bg-bg-secondary dark:bg-[#0D1131] shadow-xl flex flex-col">
      {/* Fixed Header */}
      <div className="flex items-center justify-between mb-6 p-6 border-b border-slate-100 dark:border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-semibold tracking-tight text-text-secondary dark:text-white">
            Flynt Insights
          </h3>
          <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
            {insights.length} insights
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">
          AI-Powered
        </span>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6">
        {/* Insight List */}
        <div className="space-y-4 pb-4">
          {insights.map((item) => {
            const styles = getStyles(item.type);
            return (
              <motion.div
                key={item.id}
                whileHover={{ x: 4 }}
                className={`group p-4 rounded-xl border ${styles.bg} ${styles.border} transition-all`}
              >
                <div className="flex gap-4">
                  <div
                    className={`mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-lg ${styles.iconBg} ${styles.iconColor}`}
                  >
                    {styles.icon}
                  </div>

                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-bold text-text-primary dark:text-white tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-text-secondary dark:text-slate-400">
                      {item.description}
                    </p>

                    {item.actionText && (
                      <button className="pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:gap-2 transition-all">
                        {item.actionText}
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="px-6 py-4 border-t border-slate-100 dark:border-white/5 shrink-0">
        <p className="text-[9px] font-mono text-center text-slate-400 dark:text-slate-600 uppercase tracking-widest">
          Analysis based on 90-day fiscal history
        </p>
      </div>
    </div>
  );
}
