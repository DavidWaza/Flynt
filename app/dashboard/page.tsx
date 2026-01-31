"use client";

import { useState } from "react";
import Link from "next/link";
import InvestmentInsightsModal from "@/components/InvestmentInsightsModal";

export default function DashboardPage() {
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Total Balance */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">Total Balance</span>
            <svg className="h-5 w-5 text-green-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-text-primary">₦85,000</div>
          <p className="text-xs text-text-muted mt-1">GTBank • 0123456789</p>
        </div>

        {/* Income */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">Income</span>
            <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-text-primary">₦300,000</div>
          <p className="text-xs text-success mt-1">This month</p>
        </div>

        {/* Expenses */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">Expenses</span>
            <svg className="h-5 w-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-text-primary">₦206,500</div>
          <p className="text-xs text-text-muted mt-1">69% of budget</p>
        </div>

        {/* Savings */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">Savings</span>
            <svg className="h-5 w-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-text-primary">₦60,000</div>
          <p className="text-xs text-success mt-1">+15% vs last month</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Financial Insights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Budget Overview Card */}
          <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Budget Overview</h2>
              <Link href="/dashboard/budget" className="text-sm font-medium text-green-primary hover:text-green-light">
                View Details →
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div>
                <div className="text-xs text-text-muted mb-1">Essentials</div>
                <div className="text-xl font-bold text-text-primary">₦51,500</div>
                <div className="text-xs text-text-secondary">of ₦150,000</div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-elevated">
                  <div className="h-full w-[34%] rounded-full bg-green-primary"></div>
                </div>
              </div>
              <div>
                <div className="text-xs text-text-muted mb-1">Discretionary</div>
                <div className="text-xl font-bold text-text-primary">₦33,000</div>
                <div className="text-xs text-text-secondary">of ₦90,000</div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-elevated">
                  <div className="h-full w-[37%] rounded-full bg-orange"></div>
                </div>
              </div>
              <div>
                <div className="text-xs text-text-muted mb-1">Savings</div>
                <div className="text-xl font-bold text-text-primary">₦60,000</div>
                <div className="text-xs text-text-secondary">of ₦60,000</div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-elevated">
                  <div className="h-full w-full rounded-full bg-success"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-primary/10 border border-green-primary/20">
              <svg className="h-5 w-5 text-green-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-text-primary">You're on track! Keep up the great work.</p>
            </div>
          </div>

          {/* AI Insights */}
          <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Financial Insights</h2>
              <Link href="/dashboard/insights" className="text-sm font-medium text-green-primary hover:text-green-light">
                See All →
              </Link>
            </div>

            <div className="space-y-3">
              {/* Warning Insight */}
              <div className="flex gap-3 rounded-lg border border-warning/20 bg-warning/5 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning/10">
                  <svg className="h-5 w-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary text-sm">Budget Alert</h3>
                  <p className="mt-1 text-sm text-text-secondary">At current rate, you'll exceed food budget in 4 days</p>
                </div>
              </div>

              {/* Info Insight */}
              <div className="flex gap-3 rounded-lg border border-info/20 bg-info/5 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-info/10">
                  <svg className="h-5 w-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary text-sm">Subscriptions Detected</h3>
                  <p className="mt-1 text-sm text-text-secondary">3 subscriptions found totaling ₦2,050/month</p>
                </div>
              </div>

              {/* Success Insight */}
              <div className="flex gap-3 rounded-lg border border-success/20 bg-success/5 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10">
                  <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary text-sm">Great Progress!</h3>
                  <p className="mt-1 text-sm text-text-secondary">You're 15% under budget this month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Recent Transactions</h2>
              <Link href="/dashboard/transactions" className="text-sm font-medium text-green-primary hover:text-green-light">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { merchant: "Uber Eats", amount: -5000, category: "Food", date: "Jan 28", icon: "🍔" },
                { merchant: "Jumia Food", amount: -3500, category: "Food", date: "Jan 27", icon: "🍕" },
                { merchant: "Uber", amount: -2000, category: "Transport", date: "Jan 26", icon: "🚗" },
                { merchant: "DSTV", amount: -15000, category: "Bills", date: "Jan 23", icon: "📺" },
                { merchant: "Netflix", amount: -3000, category: "Subscriptions", date: "Jan 22", icon: "🎬" },
              ].map((txn, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg">
                      {txn.icon}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary text-sm">{txn.merchant}</p>
                      <p className="text-xs text-text-muted">{txn.category} • {txn.date}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-error">-₦{Math.abs(txn.amount).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Cards & Quick Actions */}
        <div className="space-y-6">
          {/* Virtual Card */}
          <div className="rounded-xl bg-gradient-to-br from-green-dark to-green-secondary p-6 text-white shadow-lg">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-sm font-medium">Flynt Card</p>
                <p className="mt-1 text-xs opacity-80">Discretionary Spending</p>
              </div>
              <span className="rounded-full bg-green-light/20 px-3 py-1 text-xs font-semibold">Active</span>
            </div>
            <div className="mb-6">
              <p className="text-xs opacity-80 mb-1">Available Balance</p>
              <p className="text-3xl font-bold">₦57,000</p>
              <p className="text-xs opacity-60 mt-1">of ₦90,000 allocated</p>
            </div>
            <div className="mb-6">
              <div className="mb-2 flex justify-between text-xs">
                <span className="opacity-80">Spent this month</span>
                <span className="font-semibold">37%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[37%] rounded-full bg-green-light"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-mono text-lg tracking-wider">•••• •••• •••• 4242</p>
              <Link href="/dashboard/cards" className="text-xs font-medium text-green-light hover:text-white">
                Manage →
              </Link>
            </div>
          </div>

          {/* Investment Insights */}
          <div className="rounded-xl bg-gradient-to-br from-green-dark to-green-secondary p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Investment Opportunities</h3>
                <p className="text-sm opacity-90">AI-powered stock recommendations</p>
              </div>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">New</span>
            </div>

            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-80">Potential Monthly Return</span>
                <span className="font-semibold">+22.5%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-80">Recommended Stocks</span>
                <span className="font-semibold">5 Picks</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-80">AI Confidence</span>
                <span className="font-semibold">83%</span>
              </div>
            </div>

            <button
              onClick={() => setShowInvestmentModal(true)}
              className="w-full rounded-lg bg-white px-4 py-3 font-semibold text-green-dark transition-colors hover:bg-green-light hover:text-bg-primary"
            >
              View Investment Insights →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/dashboard/budget" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple/10">
                  <svg className="h-5 w-5 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">Adjust Budget</p>
                  <p className="text-xs text-text-muted">Reallocate funds</p>
                </div>
              </Link>

              <Link href="/dashboard/cards" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-primary/10">
                  <svg className="h-5 w-5 text-green-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">Create New Card</p>
                  <p className="text-xs text-text-muted">For specific category</p>
                </div>
              </Link>

              <Link href="/dashboard/insights" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10">
                  <svg className="h-5 w-5 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">View Predictions</p>
                  <p className="text-xs text-text-muted">AI spending forecast</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Spending by Category */}
          <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Top Categories</h3>
            <div className="space-y-3">
              {[
                { name: "Food & Dining", amount: 12450, percent: 41, color: "bg-orange" },
                { name: "Transport", amount: 3500, percent: 12, color: "bg-blue" },
                { name: "Bills", amount: 16500, percent: 55, color: "bg-purple" },
              ].map((cat, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-text-secondary">{cat.name}</span>
                    <span className="text-xs font-semibold text-text-primary">₦{cat.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Investment Insights Modal */}
      <InvestmentInsightsModal 
        isOpen={showInvestmentModal} 
        onClose={() => setShowInvestmentModal(false)} 
      />
    </div>
  );
}
