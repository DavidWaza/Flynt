"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button, Input } from "@/components/ui";
import { useDebts, Importance } from "@/contexts/DebtContext";

interface CreateDebtModalProps {
  isOpen: boolean;
  onClose: () => void;
  financialData: { surplus: number; totalInflow: number };
}

export default function CreateDebtModal({
  isOpen,
  onClose,
  financialData,
}: CreateDebtModalProps) {
  const { addDebt } = useDebts();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    deadline: "",
    importance: "medium" as Importance,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.deadline) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      addDebt(
        {
          name: formData.name,
          amount: parseFloat(formData.amount),
          deadline: formData.deadline,
          importance: formData.importance,
        },
        financialData,
      );

      toast.success("Debt note added successfully!");

      setFormData({
        name: "",
        amount: "",
        deadline: "",
        importance: "medium",
      });
      onClose();
    } catch (error) {
      toast.error("Failed to add debt note. Please try again.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  const importanceOptions: {
    value: Importance;
    label: string;
    color: string;
  }[] = [
    { value: "low", label: "Low", color: "bg-blue-500" },
    { value: "medium", label: "Medium", color: "bg-warning" },
    { value: "high", label: "High", color: "bg-orange" },
    { value: "critical", label: "Critical", color: "bg-error" },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-xl bg-bg-secondary border border-border-primary shadow-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary uppercase tracking-tight">
              Create Debt Note
            </h2>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase mb-2">
                Debt Name
              </label>
              <Input
                placeholder="Who do you owe?"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase mb-2">
                Amount (₦)
              </label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase mb-2">
                Deadline
              </label>
              <Input
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase mb-2">
                Importance
              </label>
              <div className="grid grid-cols-2 gap-2">
                {importanceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, importance: opt.value })
                    }
                    className={`flex items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all ${
                      formData.importance === opt.value
                        ? "border-green-primary bg-green-primary/10 text-green-primary"
                        : "border-border-primary bg-bg-card text-text-secondary hover:bg-bg-elevated"
                    }`}
                  >
                    <div className={`h-2 w-2 rounded-full ${opt.color}`} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                fullWidth
                className="py-3 font-bold uppercase tracking-wide"
              >
                Save Debt Note
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
