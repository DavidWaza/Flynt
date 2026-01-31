"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CardData {
  id: string;
  category: string;
  categoryIcon: string;
  cardNumber: string;
  validThru: string;
  cvv: string;
  cardholderName: string;
  balance: number;
  totalAllocated: number;
  spentPercentage: number;
  colorScheme: "purple" | "black" | "orange" | "green" | "blue";
}

interface VirtualCardProps {
  cards: CardData[];
  defaultCardIndex?: number;
}

export default function VirtualCard({
  cards,
  defaultCardIndex = 0,
}: VirtualCardProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(defaultCardIndex);
  const currentCard = cards[currentCardIndex];

  const colorSchemes = {
    purple: {
      gradient: "from-[#6366F1] via-[#7C3AED] to-[#8B5CF6]",
      cardBg: "bg-gradient-to-br from-[#6366F1] via-[#7C3AED] to-[#8B5CF6]",
      dotActive: "bg-white",
      dotInactive: "bg-white/40",
    },
    black: {
      gradient: "from-[#1F2937] via-[#111827] to-[#000000]",
      cardBg: "bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#000000]",
      dotActive: "bg-white",
      dotInactive: "bg-white/40",
    },
    orange: {
      gradient: "from-[#F97316] via-[#EA580C] to-[#C2410C]",
      cardBg: "bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#C2410C]",
      dotActive: "bg-white",
      dotInactive: "bg-white/40",
    },
    green: {
      gradient: "from-green-dark via-green-primary to-green-secondary",
      cardBg:
        "bg-gradient-to-br from-green-dark via-green-primary to-green-secondary",
      dotActive: "bg-white",
      dotInactive: "bg-white/40",
    },
    blue: {
      gradient: "from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
      cardBg: "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
      dotActive: "bg-white",
      dotInactive: "bg-white/40",
    },
  };

  const scheme = colorSchemes[currentCard.colorScheme];

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Card Display */}
      <div className="relative">
        {/* Navigation Arrows */}
        {cards.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevCard}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              aria-label="Previous card"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextCard}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              aria-label="Next card"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </>
        )}

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`rounded-[2rem] ${scheme.cardBg} p-6 text-white shadow-2xl`}
          >
            {/* Card Header */}
            <div className="mb-8 flex items-start justify-between">
              <div className="flex items-center gap-2">
                {/* Brand Logo */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <span className="text-2xl">{currentCard.categoryIcon}</span>
                </div>
                <div>
                  <p className="text-xs opacity-80 uppercase tracking-wider">
                    Flynt Card
                  </p>
                  <p className="text-sm font-semibold">
                    {currentCard.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-80 uppercase tracking-wider">
                  Virtual
                </p>
              </div>
            </div>

            {/* Card Number */}
            <div className="mb-6">
              <div className="flex items-center justify-between font-mono text-xl tracking-widest">
                <span>{currentCard.cardNumber.slice(0, 4)}</span>
                <span>****</span>
                <span>****</span>
                <span>{currentCard.cardNumber.slice(-4)}</span>
              </div>
            </div>

            {/* Card Details */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs opacity-70 uppercase tracking-wider mb-1">
                  Valid Thru
                </p>
                <p className="text-sm font-semibold">{currentCard.validThru}</p>
              </div>
              <div>
                <p className="text-xs opacity-70 uppercase tracking-wider mb-1">
                  CVV
                </p>
                <p className="text-sm font-semibold">***</p>
              </div>
              <div className="flex items-center justify-end">
                <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
                  <rect
                    width="48"
                    height="32"
                    rx="4"
                    fill="white"
                    fillOpacity="0.2"
                  />
                  <text
                    x="24"
                    y="20"
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    fontStyle="italic"
                  >
                    VISA
                  </text>
                </svg>
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wide">
                {currentCard.cardholderName}
              </p>
            </div>

            {/* Balance Info */}
            <div className="border-t border-white/20 pt-4">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs opacity-80">Available Balance</p>
                  <p className="text-xs opacity-80">
                    ₦{currentCard.balance.toLocaleString()} / ₦
                    {currentCard.totalAllocated.toLocaleString()}
                  </p>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${100 - currentCard.spentPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">
                  ₦{currentCard.balance.toLocaleString()}
                </p>
                <Link
                  href="/dashboard/cards"
                  className="text-xs font-medium opacity-90 hover:opacity-100 transition-opacity"
                >
                  Manage →
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Card Indicators */}
      {cards.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCardIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentCardIndex
                  ? `w-6 ${scheme.dotActive}`
                  : `w-2 ${scheme.dotInactive}`
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Card Info */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-secondary">
          {currentCardIndex + 1} of {cards.length} cards
        </span>
        <span className="text-text-secondary">
          {currentCard.spentPercentage}% spent this month
        </span>
      </div>
    </motion.div>
  );
}
