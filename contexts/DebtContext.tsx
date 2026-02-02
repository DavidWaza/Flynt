"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Importance = "low" | "medium" | "high" | "critical";
export type DebtRecommendation =
  | "Pay now"
  | "Delay strategically"
  | "Partial payment"
  | "Escalate priority";

export interface Debt {
  id: string;
  name: string;
  amount: number;
  deadline: string;
  importance: Importance;
  recommendation: DebtRecommendation;
  rationale: string;
  createdAt: string;
}

interface DebtContextType {
  debts: Debt[];
  addDebt: (
    debt: Omit<Debt, "id" | "createdAt" | "recommendation" | "rationale">,
    financialData: { surplus: number; totalInflow: number },
  ) => void;
  deleteDebt: (id: string) => void;
}

const DebtContext = createContext<DebtContextType | undefined>(undefined);

export function DebtProvider({ children }: { children: React.ReactNode }) {
  const [debts, setDebts] = useState<Debt[]>(() => {
    if (typeof window !== "undefined") {
      const savedDebts = localStorage.getItem("flynt_debts");
      if (savedDebts) {
        try {
          return JSON.parse(savedDebts);
        } catch (e) {
          console.error("Failed to parse debts from localStorage", e);
        }
      }
    }
    return [];
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("flynt_debts", JSON.stringify(debts));
    }
  }, [debts, mounted]);

  const addDebt = (
    debtData: Omit<Debt, "id" | "createdAt" | "recommendation" | "rationale">,
    financialData: { surplus: number; totalInflow: number },
  ) => {
    const amount = debtData.amount;
    const surplus = financialData.surplus;
    const deadline = new Date(debtData.deadline);
    const today = new Date();
    const daysToDeadline = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    let recommendation: DebtRecommendation = "Pay now";
    let rationale = "";

    if (daysToDeadline <= 3) {
      if (surplus >= amount) {
        recommendation = "Pay now";
        rationale =
          "Deadline is critical and you have sufficient surplus. Clear this to avoid penalties.";
      } else {
        recommendation = "Escalate priority";
        rationale =
          "Deadline is critical but surplus is low. Consider redirecting funds from lifestyle spending.";
      }
    } else if (surplus < amount * 0.5) {
      recommendation = "Delay strategically";
      rationale =
        "Your current surplus is too low. Prioritize fixing financial leakages before clearing this debt.";
    } else if (surplus >= amount) {
      recommendation = "Pay now";
      rationale =
        "You have a healthy surplus. Paying this now improves your credit score and financial peace of mind.";
    } else {
      recommendation = "Partial payment";
      rationale =
        "Pay half now to reduce interest while maintaining liquidity for essentials.";
    }

    const newDebt: Debt = {
      ...debtData,
      id: Math.random().toString(36).substring(2, 9),
      recommendation,
      rationale,
      createdAt: new Date().toISOString(),
    };
    setDebts((prev) => [newDebt, ...prev]);
  };

  const deleteDebt = (id: string) => {
    setDebts((prev) => prev.filter((debt) => debt.id !== id));
  };

  return (
    <DebtContext.Provider value={{ debts, addDebt, deleteDebt }}>
      {children}
    </DebtContext.Provider>
  );
}

export function useDebts() {
  const context = useContext(DebtContext);
  if (context === undefined) {
    throw new Error("useDebts must be used within a DebtProvider");
  }
  return context;
}
