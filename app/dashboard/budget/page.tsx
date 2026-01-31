"use client";

import { useState } from "react";
import Link from "next/link";
import { StatCard, Card, Button } from "@/components/ui";
import { BudgetCategory, BudgetAlert } from "@/components/budget";

export default function BudgetPage() {
  const [essentials, setEssentials] = useState(150000);
  const [discretionary, setDiscretionary] = useState(90000);
  const [savings, setSavings] = useState(60000);

  const totalIncome = 300000;
  const totalAllocated = essentials + discretionary + savings;
  const remaining = totalIncome - totalAllocated;

  const essentialsSpent = 51500;
  const discretionarySpent = 33000;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Budget Management
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            January 2026 • Manage your monthly budget
          </p>
        </div>
        <Button variant="primary">Save Changes</Button>
      </div>

      {/* Budget Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Income"
          value={totalIncome}
          subtitle="Monthly salary"
          icon={
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-success"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        <StatCard
          title="Allocated"
          value={totalAllocated}
          subtitle={`${Math.round((totalAllocated / totalIncome) * 100)}% of income`}
          icon={
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-info"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
        />

        <StatCard
          title="Spent"
          value={essentialsSpent + discretionarySpent}
          subtitle={`${Math.round(((essentialsSpent + discretionarySpent) / totalAllocated) * 100)}% of budget`}
          icon={
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-error"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          }
        />

        <StatCard
          title="Remaining"
          value={remaining}
          subtitle="Unallocated funds"
          icon={
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-warning"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </div>

      {/* Budget Allocation */}
      <Card>
        <h2 className="text-lg font-semibold text-text-primary mb-6">
          Budget Allocation
        </h2>

        <div className="space-y-8">
          {/* Essentials */}
          <BudgetCategory
            title="Essentials"
            description="Rent, utilities, groceries"
            amount={essentials}
            totalIncome={totalIncome}
            spent={essentialsSpent}
            remaining={essentials - essentialsSpent}
            color="green"
            onAmountChange={setEssentials}
            icon={
              <svg
                className="h-5 w-5 text-green-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            }
          />

          {/* Discretionary */}
          <BudgetCategory
            title="Discretionary"
            description="Entertainment, dining, shopping"
            amount={discretionary}
            totalIncome={totalIncome}
            spent={discretionarySpent}
            remaining={discretionary - discretionarySpent}
            color="orange"
            onAmountChange={setDiscretionary}
            icon={
              <svg
                className="h-5 w-5 text-orange"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            }
          />

          {/* Savings */}
          <BudgetCategory
            title="Savings & Investments"
            description="Emergency fund, investments"
            amount={savings}
            totalIncome={totalIncome}
            color="success"
            onAmountChange={setSavings}
            icon={
              <svg
                className="h-5 w-5 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
          />
        </div>

        {remaining !== 0 && (
          <div className="mt-6">
            <BudgetAlert
              type={remaining > 0 ? "warning" : "error"}
              message={
                remaining > 0
                  ? `You have ₦${remaining.toLocaleString()} unallocated. Consider adding to savings or adjusting your budget.`
                  : `You're over-allocated by ₦${Math.abs(remaining).toLocaleString()}. Please adjust your budget.`
              }
            />
          </div>
        )}
      </Card>

      {/* Budget Tips */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-info/10">
              <svg
                className="h-5 w-5 text-info"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">
                50/30/20 Rule
              </h3>
              <p className="text-sm text-text-secondary">
                Allocate 50% to essentials, 30% to discretionary, and 20% to
                savings for a balanced budget.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-primary/10">
              <svg
                className="h-5 w-5 text-green-primary"
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
            <div>
              <h3 className="font-semibold text-text-primary mb-1">
                AI Recommendation
              </h3>
              <p className="text-sm text-text-secondary">
                Based on your spending patterns, consider increasing your
                savings allocation by ₦10,000.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-4">
          Quick Actions
        </h3>
        <div className="grid gap-3 md:grid-cols-3">
          <Link
            href="/dashboard/cards"
            className="flex items-center gap-3 p-4 rounded-lg bg-bg-elevated hover:bg-bg-elevated/80 transition-colors"
          >
            <svg
              className="h-5 w-5 text-green-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-text-primary">
                Create Card
              </p>
              <p className="text-xs text-text-muted">For this budget</p>
            </div>
          </Link>

          <button className="flex items-center gap-3 p-4 rounded-lg bg-bg-elevated hover:bg-bg-elevated/80 transition-colors">
            <svg
              className="h-5 w-5 text-purple"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-text-primary">
                Set Reminders
              </p>
              <p className="text-xs text-text-muted">Budget alerts</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-lg bg-bg-elevated hover:bg-bg-elevated/80 transition-colors">
            <svg
              className="h-5 w-5 text-orange"
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
            <div>
              <p className="text-sm font-medium text-text-primary">
                View History
              </p>
              <p className="text-xs text-text-muted">Past budgets</p>
            </div>
          </button>
        </div>
      </Card>
    </div>
  );
}
