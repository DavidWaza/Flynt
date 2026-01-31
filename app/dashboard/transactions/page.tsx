"use client";

import { useState } from "react";

export default function TransactionsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const transactions = [
    { id: 1, merchant: "Uber Eats", amount: -5000, category: "Food", date: "2026-01-28", icon: "🍔", status: "completed" },
    { id: 2, merchant: "Jumia Food", amount: -3500, category: "Food", date: "2026-01-27", icon: "🍕", status: "completed" },
    { id: 3, merchant: "Uber", amount: -2000, category: "Transport", date: "2026-01-26", icon: "🚗", status: "completed" },
    { id: 4, merchant: "Bolt", amount: -1500, category: "Transport", date: "2026-01-25", icon: "🚕", status: "completed" },
    { id: 5, merchant: "DSTV", amount: -15000, category: "Bills", date: "2026-01-23", icon: "📺", status: "completed" },
    { id: 6, merchant: "Netflix", amount: -3000, category: "Subscriptions", date: "2026-01-22", icon: "🎬", status: "completed" },
    { id: 7, merchant: "Spotify", amount: -2500, category: "Subscriptions", date: "2026-01-21", icon: "🎵", status: "completed" },
    { id: 8, merchant: "Jumia", amount: -8000, category: "Shopping", date: "2026-01-20", icon: "🛍️", status: "completed" },
    { id: 9, merchant: "KFC", amount: -4500, category: "Food", date: "2026-01-19", icon: "🍗", status: "completed" },
    { id: 10, merchant: "Shoprite", amount: -6000, category: "Food", date: "2026-01-16", icon: "🛒", status: "completed" },
    { id: 11, merchant: "IKEDC", amount: -12000, category: "Bills", date: "2026-01-17", icon: "⚡", status: "completed" },
    { id: 12, merchant: "Filmhouse", amount: -3500, category: "Entertainment", date: "2026-01-15", icon: "🎭", status: "completed" },
    { id: 13, merchant: "Salary", amount: 300000, category: "Income", date: "2026-01-01", icon: "💰", status: "completed" },
  ];

  const categories = ["all", "Food", "Transport", "Bills", "Subscriptions", "Shopping", "Entertainment", "Income"];

  const filteredTransactions = transactions.filter(txn => {
    const matchesFilter = filter === "all" || txn.category === filter;
    const matchesSearch = txn.merchant.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Food: "text-orange",
      Transport: "text-blue",
      Bills: "text-purple",
      Subscriptions: "text-info",
      Shopping: "text-warning",
      Entertainment: "text-error",
      Income: "text-success",
    };
    return colors[category] || "text-text-muted";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Transactions</h1>
        <p className="text-sm text-text-secondary mt-1">Track all your spending and income</p>
      </div>

      {/* Filters & Search */}
      <div className="rounded-xl bg-bg-card border border-white/5 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg bg-bg-elevated border border-white/5 py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-muted focus:border-green-primary/50 focus:outline-none focus:ring-2 focus:ring-green-primary/20"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === cat
                    ? "bg-green-primary text-bg-primary"
                    : "bg-bg-elevated text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-bg-card border border-white/5 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Total Spent</span>
            <svg className="h-5 w-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-text-primary">₦61,500</div>
          <p className="text-xs text-text-muted mt-1">13 transactions</p>
        </div>

        <div className="rounded-xl bg-bg-card border border-white/5 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Avg Transaction</span>
            <svg className="h-5 w-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-text-primary">₦4,731</div>
          <p className="text-xs text-text-muted mt-1">Per transaction</p>
        </div>

        <div className="rounded-xl bg-bg-card border border-white/5 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Largest</span>
            <svg className="h-5 w-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-text-primary">₦15,000</div>
          <p className="text-xs text-text-muted mt-1">DSTV subscription</p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="rounded-xl bg-bg-card border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-semibold text-text-primary">
            {filteredTransactions.length} Transaction{filteredTransactions.length !== 1 ? "s" : ""}
          </h2>
        </div>

        <div className="divide-y divide-white/5">
          {filteredTransactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between p-4 hover:bg-bg-elevated transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-elevated text-xl">
                  {txn.icon}
                </div>
                <div>
                  <p className="font-medium text-text-primary">{txn.merchant}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-medium ${getCategoryColor(txn.category)}`}>
                      {txn.category}
                    </span>
                    <span className="text-xs text-text-muted">•</span>
                    <span className="text-xs text-text-muted">
                      {new Date(txn.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${txn.amount > 0 ? "text-success" : "text-error"}`}>
                  {txn.amount > 0 ? "+" : "-"}₦{Math.abs(txn.amount).toLocaleString()}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-success"></span>
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="mt-4 text-sm text-text-secondary">No transactions found</p>
            <p className="text-xs text-text-muted mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
