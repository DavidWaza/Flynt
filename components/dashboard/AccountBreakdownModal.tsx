"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface AccountData {
  name: string;
  icon: string;
  amount: number;
}

interface AccountBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: AccountData[];
}

export default function AccountBreakdownModal({
  isOpen,
  onClose,
  title,
  data,
}: AccountBreakdownModalProps) {
  if (!isOpen) return null;

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
              {title}
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

          <div className="space-y-3">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-bg-card border border-border-primary"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden border border-gray-100 dark:border-white/10 shrink-0">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-text-primary">
                    {item.name}
                  </span>
                </div>
                <span className="text-lg font-extrabold text-text-primary">
                  ₦{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border-primary flex items-center justify-between px-2">
            <span className="text-sm font-bold text-text-secondary uppercase">
              Total
            </span>
            <span className="text-xl font-black text-green-primary">
              ₦
              {data
                .reduce((acc, curr) => acc + curr.amount, 0)
                .toLocaleString()}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
