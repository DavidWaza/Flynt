"use client";

import { useDebts, Importance } from "@/contexts/DebtContext";
import { Card } from "@/components/ui";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function DebtsPage() {
  const { debts, deleteDebt } = useDebts();

  const handleDelete = (id: string, name: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you have cleared the debt for "${name}"?`,
    );
    if (isConfirmed) {
      deleteDebt(id);
      toast.success(`Debt note for "${name}" removed successfully!`);
    }
  };

  const getImportanceStyles = (importance: Importance) => {
    switch (importance) {
      case "critical":
        return {
          bg: "bg-error/10",
          text: "text-error",
          border: "border-error/20",
          dot: "bg-error",
        };
      case "high":
        return {
          bg: "bg-orange/10",
          text: "text-orange",
          border: "border-orange/20",
          dot: "bg-orange",
        };
      case "medium":
        return {
          bg: "bg-warning/10",
          text: "text-warning",
          border: "border-warning/20",
          dot: "bg-warning",
        };
      case "low":
        return {
          bg: "bg-blue/10",
          text: "text-blue",
          border: "border-blue/20",
          dot: "bg-blue",
        };
      default:
        return {
          bg: "bg-bg-elevated",
          text: "text-text-secondary",
          border: "border-border-primary",
          dot: "bg-text-muted",
        };
    }
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary uppercase tracking-tight">
            Debt Notes
          </h1>
          <p className="text-sm text-text-secondary">
            Track and manage your outstanding obligations
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-text-muted uppercase mb-1">
            Total Debt
          </p>
          <p className="text-2xl font-extrabold text-error">
            ₦{totalDebt.toLocaleString()}
          </p>
        </div>
      </div>

      {debts.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-16 w-16 rounded-full bg-bg-elevated flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-1">
            No debt notes found
          </h3>
          <p className="text-sm text-text-secondary mb-6">
            Create your first debt note from the dashboard
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {debts.map((debt) => {
            const styles = getImportanceStyles(debt.importance);
            return (
              <motion.div
                key={debt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                layout
              >
                <Card className="h-full hover:border-border-hover transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${styles.bg} ${styles.text} border ${styles.border}`}
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                      />
                      {debt.importance}
                    </div>
                    <button
                      onClick={() => handleDelete(debt.id, debt.name)}
                      className="text-text-muted hover:text-error transition-colors p-1"
                      title="Delete note"
                    >
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary mb-1 uppercase truncate">
                    {debt.name}
                  </h3>
                  <p className="text-3xl font-extrabold text-text-primary mb-4">
                    ₦{debt.amount.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide">
                    <div className="flex items-center gap-1.5 text-text-secondary">
                      <svg
                        className="h-3.5 w-3.5"
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
                      {new Date(debt.deadline).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    {new Date(debt.deadline) < new Date() && (
                      <span className="text-error">Overdue</span>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
