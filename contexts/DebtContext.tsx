"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Importance = "low" | "medium" | "high" | "critical";

export interface Debt {
  id: string;
  name: string;
  amount: number;
  deadline: string;
  importance: Importance;
  createdAt: string;
}

interface DebtContextType {
  debts: Debt[];
  addDebt: (debt: Omit<Debt, "id" | "createdAt">) => void;
  deleteDebt: (id: string) => void;
}

const DebtContext = createContext<DebtContextType | undefined>(undefined);

export function DebtProvider({ children }: { children: React.ReactNode }) {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedDebts = localStorage.getItem("flynt_debts");
    if (savedDebts) {
      try {
        setDebts(JSON.parse(savedDebts));
      } catch (e) {
        console.error("Failed to parse debts from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("flynt_debts", JSON.stringify(debts));
    }
  }, [debts, mounted]);

  const addDebt = (debtData: Omit<Debt, "id" | "createdAt">) => {
    const newDebt: Debt = {
      ...debtData,
      id: Math.random().toString(36).substring(2, 9),
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
