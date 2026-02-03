"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SVGProps } from "react";
import {
  ShieldCheck,
  Loader2,
  CheckCircle2,
  Lock,
  Sparkles,
  X,
  MapPin,
} from "lucide-react";
import Modal from "./Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export interface CardDetails {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

interface AddCardModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (cardDetails: CardDetails) => void;
}

export default function AddCardModal({
  open,
  onClose,
  onConfirm,
}: AddCardModalProps) {
  // --- States ---
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Partial<CardDetails>>({});
  const [isInitializing, setIsInitializing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const steps = [
    { label: "Connecting", sub: "Establishing secure location node..." },
    { label: "Syncing", sub: "Fetching 90-day transaction history..." },
    {
      label: "Categorizing",
      sub: "AI is mapping spending to lifestyle buckets...",
    },
    {
      label: "Learning",
      sub: "Finalizing your financial governance profile...",
    },
  ];

  // --- Handlers ---
  const handleConfirm = () => {
    if (validateForm()) {
      setIsInitializing(true);
      startInitializationSequence();
    }
  };

  const startInitializationSequence = () => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setActiveStep(currentStep);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsInitializing(false);
          setShowToast(true); // Trigger Success Toast
          onConfirm(cardDetails);
          setTimeout(() => setShowToast(false), 4000); // Auto-hide toast
          onClose();
        }, 1500);
      }
    }, 2500);
  };

  const validateForm = () => {
    const newErrors: Partial<CardDetails> = {};
    if (
      !cardDetails.cardNumber ||
      cardDetails.cardNumber.replace(/\s/g, "").length < 13
    )
      newErrors.cardNumber = "Valid card number required";
    if (!cardDetails.cardholderName.trim())
      newErrors.cardholderName = "Required";
    if (
      !cardDetails.expiryDate ||
      !/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)
    )
      newErrors.expiryDate = "MM/YY";
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) newErrors.cvv = "CVV";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      {/* --- SUCCESS TOAST --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 24, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm"
          >
            <div className="mx-4 bg-[#0D1131] border border-emerald-500/50 rounded-xl p-4 shadow-2xl shadow-emerald-500/20 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <Sparkles className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm font-bold">
                  Node Sync Successful
                </h4>
                <p className="text-slate-400 text-xs">
                  Card encrypted and insights generated.
                </p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="text-slate-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal
        open={open}
        onClose={isInitializing ? () => {} : onClose}
        title={
          isInitializing ? "Initializing Secure Protocol" : "Add Bank Card"
        }
        footer={
          !isInitializing && (
            <>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                Confirm & Sync
              </Button>
            </>
          )
        }
      >
        <div className="relative min-h-[380px]">
          <AnimatePresence mode="wait">
            {!isInitializing ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Form Fields - Standard Input components */}
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    placeholder="**** **** **** ****"
                    maxLength={16}
                    minLength={16}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cardNumber: e.target.value,
                      })
                    }
                  />
                  <Input
                    label="Cardholder Name"
                    placeholder="CHUKWUDI JASON"
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cardholderName: e.target.value,
                      })
                    }
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry"
                      placeholder="MM/YY"
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          expiryDate: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="CVV"
                      type="password"
                      placeholder="***"
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cvv: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Bank-grade AES-256 encryption active. Your credentials are
                    never stored on Flynt servers.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="init"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-4 space-y-8"
              >
                {/* Visual Scanning Effect */}
                <div className="relative h-1 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                    }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"
                  />
                </div>

                {/* Steps List */}
                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <div
                      key={step.label}
                      className="relative flex items-start gap-4"
                    >
                      {index !== steps.length - 1 && (
                        <div
                          className={`absolute left-[11px] top-7 w-[2px] h-6 transition-colors duration-500 ${index < activeStep ? "bg-emerald-500" : "bg-slate-100"}`}
                        />
                      )}
                      <div className="z-10 flex h-6 w-6 items-center justify-center">
                        {index < activeStep ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center"
                          >
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </motion.div>
                        ) : index === activeStep ? (
                          <div className="h-5 w-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                        ) : (
                          <div className="h-3 w-3 rounded-full border-2 border-slate-200" />
                        )}
                      </div>
                      <div className="flex-1 -mt-0.5">
                        <h4
                          className={`text-sm font-bold tracking-tight ${index === activeStep ? "text-slate-900 dark:text-white" : "text-slate-400"}`}
                        >
                          {step.label}
                        </h4>
                        <p className="text-[11px] text-slate-500">{step.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[9px] font-mono text-emerald-500 uppercase tracking-widest">
                    <Activity className="h-3 w-3 animate-pulse" />
                    Secure Uplink Established
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
                    <MapPin className="h-3 w-3" />
                    ABUJA_NODE_01
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>
    </>
  );
}

function Activity(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
