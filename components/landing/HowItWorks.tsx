"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Cpu, BarChart3, Zap } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Secure Account Connection",
    desc: "Flynt securely connects your bank accounts and cards, giving you one clear view of your money in real time.",
    icon: <ShieldCheck className="w-5 h-5 text-green-primary" />,
  },
  {
    id: "02",
    title: "Smart Spending Analysis",
    desc: "Our AI studies how you earn and spend, spotting patterns, risks, and opportunities to save or invest.",
    icon: <Cpu className="w-5 h-5 text-blue" />,
  },
  {
    id: "03",
    title: "Intelligent Decision Engine",
    desc: "Flynt evaluates every spending decision against your budgets, goals, and long-term financial plans.",
    icon: <BarChart3 className="w-5 h-5 text-orange" />,
  },
  {
    id: "04",
    title: "Automatic Money Control",
    desc: "Spending and transfers happen only when they fit your plan—using smart cards and real-time controls.",
    icon: <Zap className="w-5 h-5 text-purple" />,
  },
];

export default function FinanceWorkflow() {
  return (
    <section className="py-24 text-text-primary">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-green-primary uppercase">
              Operational Framework
            </span>
            <h2 className="mt-2 text-4xl font-light tracking-tight text-text-primary md:text-5xl ">
              The Intelligence Behind
              <span className="font-semibold text-text-secondary">
                {" "}
                Every Decision
              </span>
            </h2>
          </div>
          <p className="max-w-md text-text-secondary text-base leading-relaxed">
            Our multi-layered engine breaks down your financial data and shows
            you exactly how to make smarter money decisions that support your
            future plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-primary border border-border-primary overflow-hidden rounded-xl">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative bg-bg-card p-8 transition-all hover:bg-bg-elevated"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-text-muted">
                  [{step.id}]
                </span>
                <div className="p-2 bg-bg-elevated rounded-md group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-3 text-text-primary">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary mb-6">
                {step.desc}
              </p>

              {/* Decorative Finance Element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-green-primary transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
