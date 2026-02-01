"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InvestmentInsightsModal from "@/components/InvestmentInsightsModal";
import { StatCard, Card, Input, Button } from "@/components/ui";
import {
  CategoryCard,
  TransactionItem,
  CreditScoreGauge,
  VirtualCard,
  InsightCard,
  CreateDebtModal,
  AccountBreakdownModal,
} from "@/components/dashboard";

export default function DashboardPage() {
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [showDebtModal, setShowDebtModal] = useState(false);
  const [breakdownModal, setBreakdownModal] = useState<{
    isOpen: boolean;
    title: string;
    data: { name: string; icon: string; amount: number }[];
  }>({ isOpen: false, title: "", data: [] });

  const connectedAccounts = [
    { name: "Zenith Bank", icon: "/banks/zenith.svg" },
    { name: "GTBank", icon: "/banks/gtbank.jpeg" },
    { name: "Access Bank", icon: "/banks/access.svg" },
  ];

  // Category icons
  const categoryIcons = {
    fixedObligations: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    dailyEssentials: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
    lifestyle: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    subscriptions: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    financialLeakage: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    savings: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  };

  const transactions = [
    {
      merchant: "Uber Eats",
      amount: -5000,
      category: "Food",
      date: "Jan 28",
      icon: "🍔",
    },
    {
      merchant: "Jumia Food",
      amount: -3500,
      category: "Food",
      date: "Jan 27",
      icon: "🍕",
    },
    {
      merchant: "Uber",
      amount: -2000,
      category: "Transport",
      date: "Jan 26",
      icon: "🚗",
    },
    {
      merchant: "DSTV",
      amount: -15000,
      category: "Bills",
      date: "Jan 23",
      icon: "📺",
    },
    {
      merchant: "Netflix",
      amount: -3000,
      category: "Subscriptions",
      date: "Jan 22",
      icon: "🎬",
    },
  ];

  const inflowBreakdown = [
    { name: "Zenith Bank", icon: "/banks/zenith.svg", amount: 250000 },
    { name: "GTBank", icon: "/banks/gtbank.jpeg", amount: 150000 },
    { name: "Access Bank", icon: "/banks/access.svg", amount: 50000 },
  ];

  const outflowBreakdown = [
    { name: "Zenith Bank", icon: "/banks/zenith.svg", amount: 180000 },
    { name: "GTBank", icon: "/banks/gtbank.jpeg", amount: 95000 },
    { name: "Access Bank", icon: "/banks/access.svg", amount: 30000 },
  ];

  const surplusBreakdown = [
    { name: "Zenith Bank", icon: "/banks/zenith.svg", amount: 70000 },
    { name: "GTBank", icon: "/banks/gtbank.jpeg", amount: 55000 },
    { name: "Access Bank", icon: "/banks/access.svg", amount: 20000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-4 mb-1">
          {connectedAccounts.map((account, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-2 shadow-sm"
            >
              <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden border border-gray-100 dark:border-white/10 shrink-0">
                <Image
                  src={account.icon}
                  alt={account.name}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-text-primary">
                    {account.name}
                  </h2>
                  <span className="inline-flex items-center rounded-full bg-green-primary/10 px-2 py-0.5 text-[10px] font-medium text-green-primary border border-green-primary/20">
                    Connected
                  </span>
                </div>
              </div>
            </div>
          ))}

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-gray-200 dark:border-white/10 text-text-secondary hover:border-green-primary hover:text-green-primary transition-all group">
            <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-green-primary/10 transition-colors">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold italic">
              Connect New Card
            </span>
          </button>
        </div>

        <Button
          onClick={() => setShowDebtModal(true)}
          className="flex items-center gap-2 py-3 px-6 font-bold uppercase tracking-wide"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Debt Note
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Inflow"
          value={450000}
          trend={{ value: "+5.1% vs last month", isPositive: true }}
          onClick={() =>
            setBreakdownModal({
              isOpen: true,
              title: "Total Inflow Breakdown",
              data: inflowBreakdown,
            })
          }
        />
        <StatCard
          title="Total Outflow"
          value={305000}
          trend={{ value: "+2% vs last month", isPositive: true }}
          onClick={() =>
            setBreakdownModal({
              isOpen: true,
              title: "Total Outflow Breakdown",
              data: outflowBreakdown,
            })
          }
        />
        <StatCard
          title="Monthly Surplus"
          value={145000}
          subtitle="Safe to invest or save"
          variant="success"
          onClick={() =>
            setBreakdownModal({
              isOpen: true,
              title: "Monthly Surplus Breakdown",
              data: surplusBreakdown,
            })
          }
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Spending Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* Spending Breakdown */}
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Spending Breakdown
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <CategoryCard
                title="Fixed Obligations"
                amount={98000}
                percentage={32}
                trend={{ value: "8.2%", isPositive: true }}
                icon={categoryIcons.fixedObligations}
                color="blue"
              />
              <CategoryCard
                title="Daily Essentials"
                amount={75000}
                percentage={32}
                trend={{ value: "8.2%", isPositive: true }}
                icon={categoryIcons.dailyEssentials}
                color="amber"
              />
              <CategoryCard
                title="Lifestyle"
                amount={75000}
                percentage={32}
                trend={{ value: "8.2%", isPositive: true }}
                icon={categoryIcons.lifestyle}
                color="purple"
              />
              <CategoryCard
                title="Subscriptions"
                amount={98000}
                percentage={32}
                trend={{ value: "8.2%", isPositive: true }}
                icon={categoryIcons.subscriptions}
                color="cyan"
              />
              <CategoryCard
                title="Financial Leakage"
                amount={75000}
                percentage={32}
                trend={{ value: "8.2%", isPositive: true }}
                icon={categoryIcons.financialLeakage}
                color="orange"
              />
              <CategoryCard
                title="Savings & Invest"
                amount={17000}
                percentage={32}
                trend={{ value: "0%", isPositive: false }}
                icon={categoryIcons.savings}
                color="sky"
              />
            </div>
          </div>

          {/* Recent Transactions */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">
                Recent Transactions
              </h2>
              <Link
                href="/dashboard/transactions"
                className="text-sm font-medium text-green-primary hover:text-green-light"
              >
                See All
              </Link>
            </div>

            {/* Search */}
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search..."
                icon={
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
              />
            </div>

            <div className="space-y-3">
              {transactions.map((txn, i) => (
                <TransactionItem key={i} {...txn} />
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Cards & Insights */}
        <div className="space-y-6">
          {/* Virtual Card */}
          <VirtualCard
            cards={[
              {
                id: "1",
                category: "Discretionary Spending",
                categoryIcon: "🛍️",
                cardNumber: "2342********3675",
                validThru: "12/24",
                cvv: "***",
                cardholderName: "Adebayo Odunsi",
                balance: 57000,
                totalAllocated: 90000,
                spentPercentage: 37,
                colorScheme: "purple",
              },
              {
                id: "2",
                category: "Fixed Obligations",
                categoryIcon: "🏠",
                cardNumber: "4521********7890",
                validThru: "11/25",
                cvv: "***",
                cardholderName: "Adebayo Odunsi",
                balance: 48000,
                totalAllocated: 98000,
                spentPercentage: 51,
                colorScheme: "black",
              },
              {
                id: "3",
                category: "Daily Essentials",
                categoryIcon: "🛒",
                cardNumber: "6789********1234",
                validThru: "03/26",
                cvv: "***",
                cardholderName: "Adebayo Odunsi",
                balance: 42000,
                totalAllocated: 75000,
                spentPercentage: 44,
                colorScheme: "orange",
              },
              {
                id: "4",
                category: "Savings & Investment",
                categoryIcon: "💰",
                cardNumber: "8901********5678",
                validThru: "06/25",
                cvv: "***",
                cardholderName: "Adebayo Odunsi",
                balance: 17000,
                totalAllocated: 17000,
                spentPercentage: 0,
                colorScheme: "green",
              },
              {
                id: "5",
                category: "Lifestyle",
                categoryIcon: "🎭",
                cardNumber: "3456********9012",
                validThru: "09/25",
                cvv: "***",
                cardholderName: "Adebayo Odunsi",
                balance: 30000,
                totalAllocated: 75000,
                spentPercentage: 60,
                colorScheme: "blue",
              },
            ]}
          />

          {/* AI Insights */}
          <div className="rounded-3xl bg-gradient-to-br from-green-primary to-green-secondary p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-2">AI Insights</h3>
            <h2 className="text-2xl font-bold mb-3">
              You can save
              <br />
              ₦45,000 this month
            </h2>
            <p className="text-sm opacity-90 mb-6">
              Based on your spending patterns, redirecting some discretionary
              spending could boost your savings significantly.
            </p>

            <Button
              variant="secondary"
              fullWidth
              onClick={() => setShowInvestmentModal(true)}
              className="mb-4  text-green-dark hover:bg-green-light hover:text-bg-primary"
            >
              View Insights →
            </Button>

            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-6 rounded-full bg-white/40"></div>
              <div className="h-2 w-2 rounded-full bg-white/40"></div>
            </div>
          </div>

          {/* Financial Health */}
          <Card>
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="h-5 w-5 text-text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="text-sm font-semibold text-text-primary">
                Credit Score
              </h3>
            </div>

            <CreditScoreGauge score={660} />
            <p className="text-xs opacity-90 text-center pt-2 font-medium">
              This credit score is gotten from the Nigerian Credit Bureau
            </p>
          </Card>
        </div>
      </div>

      {/* Investment Insights Modal */}
      <InvestmentInsightsModal
        isOpen={showInvestmentModal}
        onClose={() => setShowInvestmentModal(false)}
      />

      {/* Create Debt Modal */}
      <CreateDebtModal
        isOpen={showDebtModal}
        onClose={() => setShowDebtModal(false)}
      />

      {/* Account Breakdown Modal */}
      <AccountBreakdownModal
        isOpen={breakdownModal.isOpen}
        onClose={() => setBreakdownModal({ ...breakdownModal, isOpen: false })}
        title={breakdownModal.title}
        data={breakdownModal.data}
      />
    </div>
  );
}
