"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";

interface LinkedAccount {
  id: string;
  name: string;
  icon: string;
  lastFour: string;
  balance: number;
}

interface UnlinkAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: LinkedAccount | null;
  onUnlink: (id: string) => void;
}

export default function UnlinkAccountModal({
  isOpen,
  onClose,
  account,
  onUnlink,
}: UnlinkAccountModalProps) {
  if (!isOpen || !account) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-bg-secondary border border-border-primary shadow-2xl p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-text-primary uppercase tracking-tight">
              Account Details
            </h2>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-6 mb-10">
            <div className="p-6 rounded-3xl bg-bg-elevated border border-border-primary flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-green-primary/10 flex items-center justify-center border border-green-primary/20 mb-4">
                <div className="p-4 bg-green-primary rounded-2xl text-white shadow-lg shadow-green-primary/20">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3L4 9v12h16V9l-8-6zm0 2.5L17.5 9.5 12 13.6 6.5 9.5 12 5.5zM6 19v-8.4l6 4.5 6-4.5V19H6z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-black text-text-primary">
                {account.name}
              </h3>
              <p className="text-text-secondary font-medium tracking-widest mt-1">
                **** **** **** {account.lastFour}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-bg-elevated border border-border-primary">
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-wider mb-1">
                  Available Balance
                </p>
                <p className="text-lg font-black text-text-primary">
                  ₦{account.balance.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-bg-elevated border border-border-primary">
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-wider mb-1">
                  Status
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-primary shadow-[0_0_8px_rgba(0,217,163,0.5)]" />
                  <p className="text-sm font-black text-green-primary uppercase tracking-tight">
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => onUnlink(account.id)}
              className="py-4 bg-error hover:bg-error/90 text-white rounded-2xl font-black uppercase tracking-wider shadow-lg shadow-error/20"
            >
              Unlink Account
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={onClose}
              className="py-4 rounded-2xl font-black uppercase tracking-wider"
            >
              Keep Account
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
