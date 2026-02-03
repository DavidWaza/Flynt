"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ConnectBankSecureModal } from "@/components/modal";
import {
  Bank,
  Briefcase,
  BuildingOffice,
  CalendarCheck,
  CaretLeft,
  CaretRight,
  ChartLine,
  ChartPieSlice,
  Laptop,
  Money,
  Target,
  User,
} from "@phosphor-icons/react/dist/ssr";

const BANKS = [
  "Access Bank",
  "GTBank",
  "First Bank of Nigeria",
  "UBA",
  "Wema Bank (ALAT)",
  "Polaris Bank",
];

const STEP_LABELS = [
  "Employment Status",
  "Income Range",
  "Financial Goal",
  "Connect Account",
] as const;

type Phase = "welcome" | "stepper";
type EmploymentStatus =
  | "salaried"
  | "self-employed"
  | "freelancer"
  | "business-owner"
  | null;
type IncomeRange = "100k-250k" | "250k-500k" | "500k-1m" | "1m+" | null;
type FinancialGoal =
  | "control-spending"
  | "save-more"
  | "start-investing"
  | "plan-future"
  | null;

// Icons
const LogoIcon = () => (
  <svg
    className="h-10 w-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" strokeWidth={2} strokeDasharray="4 2" />
  </svg>
);

const LockIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MailCheckIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const HashIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ChevronRightIcon = () => (
  <span className="text-text-muted text-xs" aria-hidden>
    &gt;
  </span>
);

export default function OnboardPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("welcome");
  const [currentStep, setCurrentStep] = useState(1);
  const [employmentStatus, setEmploymentStatus] =
    useState<EmploymentStatus>(null);
  const [incomeRange, setIncomeRange] = useState<IncomeRange>(null);
  const [financialGoal, setFinancialGoal] = useState<FinancialGoal>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [authorizeAccess, setAuthorizeAccess] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [bankDropdownOpen, setBankDropdownOpen] = useState(false);
  const bankDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        bankDropdownRef.current &&
        !bankDropdownRef.current.contains(e.target as Node)
      ) {
        setBankDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGetStarted = useCallback(() => {
    setPhase("stepper");
    setCurrentStep(1);
  }, []);

  const handleConnectConfirm = useCallback(() => {
    setConnectModalOpen(false);
    router.push("/onboarding/success");
  }, [router]);

  const canConnectAccount =
    selectedBank && accountNumber.trim().length > 0 && authorizeAccess;

  return (
    <>
      {phase === "welcome" && (
        <Card
          variant="elevated"
          padding="lg"
          className="border border-border-primary w-2xl mx-auto"
        >
          <div className="flex flex-col items-center text-center">
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-primary/15 text-green-primary"
              aria-hidden
            >
              <LogoIcon />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">
              Welcome to Flynt
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Your intelligent financial advisor for smarter money decisions.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Connect your accounts and get personalized insights in minutes.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
              <span className="flex items-center gap-2 text-sm text-purple">
                <LockIcon />
                Bank-grade Security
              </span>
              <span className="flex items-center gap-2 text-sm text-green-primary">
                <DocumentIcon />
                Read-only Access
              </span>
              <span className="flex items-center gap-2 text-sm text-orange">
                <UsersIcon />
                50k+ Nigerians
              </span>
            </div>
            <Button
              type="button"
              variant="primary"
              fullWidth
              size="lg"
              className="mt-8 cursor-pointer"
              onClick={handleGetStarted}
              aria-label="Get started"
            >
              Get Started
            </Button>
          </div>
        </Card>
      )}

      {phase === "stepper" && (
        <>
          <div
            className="mb-6 flex flex-wrap items-center justify-center gap-1 text-xs sm:gap-2"
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={4}
            aria-label={`Onboarding progress, step ${currentStep} of 4: ${
              STEP_LABELS[currentStep - 1]
            }`}
          >
            {STEP_LABELS.map((label, i) => {
              const stepNum = i + 1;
              const isCompleted = currentStep > stepNum;
              const isActive = currentStep === stepNum;
              return (
                <span key={stepNum} className="flex items-center gap-1.5">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      isCompleted
                        ? "bg-green-primary text-white"
                        : isActive
                          ? "bg-text-primary text-bg-card"
                          : "border border-border-primary text-text-muted"
                    }`}
                  >
                    {isCompleted ? <CheckIcon /> : stepNum}
                  </span>
                  <span
                    className={
                      isActive
                        ? "font-medium text-text-primary"
                        : "text-text-muted"
                    }
                  >
                    {label}
                  </span>
                  {stepNum < 4 && <CaretRight size={16} />}
                </span>
              );
            })}
          </div>

          {currentStep === 1 && (
            <Card
              variant="elevated"
              padding="lg"
              className="border border-border-primary w-2xl mx-auto"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-primary/15 text-green-primary"
                  aria-hidden
                >
                  <User size={30} weight="duotone" />
                </div>
                <h2 className="text-xl font-bold text-text-primary">
                  What&apos;s Your Employment Status?
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  This helps us personalize your financial advice
                </p>
                <div className="mt-6 grid w-full grid-cols-2 gap-3">
                  {[
                    {
                      value: "salaried" as const,
                      label: "Salaried Employee",
                      icon: <Briefcase size={20} weight="duotone" />,
                    },
                    {
                      value: "self-employed" as const,
                      label: "Self-employed",
                      icon: <User size={20} weight="duotone" />,
                    },
                    {
                      value: "freelancer" as const,
                      label: "Freelancer",
                      icon: <Laptop size={20} weight="duotone" />,
                    },
                    {
                      value: "business-owner" as const,
                      label: "Business Owner",
                      icon: <BuildingOffice size={20} weight="duotone" />,
                    },
                  ].map(({ value, label, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setEmploymentStatus(value)}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-primary/20 ${
                        employmentStatus === value
                          ? "border-2 border-green-primary bg-green-primary/5 text-green-primary"
                          : "border-border-primary text-text-primary hover:bg-bg-elevated"
                      }`}
                    >
                      <span
                        className={
                          employmentStatus === value
                            ? "text-green-primary"
                            : "text-text-muted"
                        }
                      >
                        {icon}
                      </span>
                      {label}
                    </button>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="primary"
                  fullWidth
                  size="lg"
                  className="mt-6 cursor-pointer"
                  onClick={() => setCurrentStep(2)}
                >
                  Next
                </Button>
              </div>
            </Card>
          )}

          {currentStep === 2 && (
            <Card
              variant="elevated"
              padding="lg"
              className="border border-border-primary w-2xl mx-auto"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-primary/15 text-green-primary"
                  aria-hidden
                >
                  <MailCheckIcon />
                </div>
                <h2 className="text-xl font-bold text-text-primary">
                  What&apos;s Your Monthly Income Range?
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  We use this to calibrate your savings targets
                </p>
                <div className="mt-6 grid w-full grid-cols-2 gap-3">
                  {[
                    { value: "100k-250k" as const, label: "₦100k - ₦250k" },
                    { value: "250k-500k" as const, label: "₦250k - ₦500k" },
                    { value: "500k-1m" as const, label: "₦500k - ₦1m" },
                    { value: "1m+" as const, label: "₦1m+" },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setIncomeRange(value)}
                      className={`rounded-xl border p-4 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-primary/20 ${
                        incomeRange === value
                          ? "border-2 border-green-primary bg-green-primary/5 text-text-primary"
                          : "border-border-primary text-text-primary hover:bg-bg-elevated"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex w-full flex-col gap-3">
                  <Button
                    type="button"
                    variant="primary"
                    fullWidth
                    size="lg"
                    className="cursor-pointer"
                    onClick={() => setCurrentStep(3)}
                  >
                    Next
                  </Button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="w-full flex items-center justify-center gap-1 cursor-pointer text-center text-sm font-medium text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 rounded"
                  >
                    <CaretLeft size={20} /> Back
                  </button>
                </div>
              </div>
            </Card>
          )}

          {currentStep === 3 && (
            <Card
              variant="elevated"
              padding="lg"
              className="border border-border-primary w-2xl mx-auto"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-primary/15 text-green-primary"
                  aria-hidden
                >
                  <Target size={32} weight="duotone" />
                </div>
                <h2 className="text-xl font-bold text-text-primary">
                  What&apos;s Your Main Financial Goal?
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  We&apos;ll prioritize features that help you achieve this
                </p>
                <div className="mt-6 grid w-full grid-cols-2 gap-3">
                  {[
                    {
                      value: "control-spending" as const,
                      label: "Control my spending",
                      icon: <ChartPieSlice size={20} weight="duotone" />,
                    },
                    {
                      value: "save-more" as const,
                      label: "Save more money",
                      icon: <Money size={20} weight="duotone" />,
                    },
                    {
                      value: "start-investing" as const,
                      label: "Start investing",
                      icon: <ChartLine size={20} />,
                    },
                    {
                      value: "plan-future" as const,
                      label: "Plan for the future",
                      icon: <CalendarCheck size={20} weight="duotone" />,
                    },
                  ].map(({ value, label, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFinancialGoal(value)}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-primary/20 ${
                        financialGoal === value
                          ? "border-2 border-green-primary bg-green-primary/5 text-green-primary"
                          : "border-border-primary text-text-primary hover:bg-bg-elevated"
                      }`}
                    >
                      <span
                        className={
                          financialGoal === value
                            ? "text-green-primary"
                            : "text-text-muted"
                        }
                      >
                        {icon}
                      </span>
                      {label}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex w-full flex-col gap-3">
                  <Button
                    type="button"
                    variant="primary"
                    fullWidth
                    size="lg"
                    className="cursor-pointer"
                    onClick={() => setCurrentStep(4)}
                  >
                    Next
                  </Button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full flex items-center justify-center gap-1 cursor-pointer text-center text-sm font-medium text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 rounded"
                  >
                    <CaretLeft size={20} /> Back
                  </button>
                </div>
              </div>
            </Card>
          )}

          {currentStep === 4 && (
            <>
              <Card
                variant="elevated"
                padding="lg"
                className="border border-border-primary w-2xl mx-auto"
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-primary/15 text-green-primary"
                    aria-hidden
                  >
                    <Bank size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-text-primary">
                    Connect your bank account.
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">
                    Securely link your primary account for analysis.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <div ref={bankDropdownRef} className="relative">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Select Bank *
                    </label>
                    <button
                      type="button"
                      onClick={() => setBankDropdownOpen((o) => !o)}
                      className="flex w-full items-center gap-3 rounded-xl border border-border-primary bg-bg-card py-2.5 px-4 text-left text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary"
                      aria-haspopup="listbox"
                      aria-expanded={bankDropdownOpen}
                    >
                      <span className="text-text-muted">
                        <Bank size={20} />
                      </span>
                      <span
                        className={`flex-1 ${!selectedBank ? "text-text-muted" : ""}`}
                      >
                        {selectedBank || "Search for your bank..."}
                      </span>
                      <span className="text-text-muted">
                        <ChevronDownIcon />
                      </span>
                    </button>
                    {bankDropdownOpen && (
                      <ul
                        className="absolute z-10 mt-1 w-full rounded-xl border border-border-primary bg-bg-card py-1 shadow-lg max-h-48 overflow-auto z-100"
                        role="listbox"
                      >
                        {BANKS.map((bank) => (
                          <li
                            key={bank}
                            role="option"
                            aria-selected={selectedBank === bank}
                            onClick={() => {
                              setSelectedBank(bank);
                              setBankDropdownOpen(false);
                            }}
                            className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm text-text-primary hover:bg-bg-elevated"
                          >
                            {bank}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <Input
                    label="Account Number *"
                    type="text"
                    placeholder="0123456789"
                    value={accountNumber}
                    onChange={(e) =>
                      setAccountNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    icon={<HashIcon />}
                    iconPosition="left"
                    required
                  />

                  <p className="flex items-center gap-2 text-xs text-text-muted">
                    <LockIcon />
                    Your credentials are never stored on our servers.
                  </p>

                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={authorizeAccess}
                      onChange={(e) => setAuthorizeAccess(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border-primary text-green-primary focus:ring-green-primary/20"
                      aria-label="Authorize Flynt to access transaction history"
                    />
                    <span className="text-sm text-text-secondary">
                      I authorize Flynt to access my transaction history for the
                      purpose of financial analysis and advice.
                    </span>
                  </label>

                  <Button
                    type="button"
                    variant="primary"
                    fullWidth
                    size="lg"
                    className="cursor-pointer"
                    disabled={!canConnectAccount}
                    onClick={() => setConnectModalOpen(true)}
                  >
                    Connect Account
                  </Button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="w-full flex items-center justify-center gap-1 cursor-pointer text-center text-sm font-medium text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 rounded"
                  >
                    <CaretLeft size={20} /> Back
                  </button>
                </div>
              </Card>

              <p className="mt-4 text-center text-xs text-text-muted">
                You&apos;ll be redirected to Mono to complete authentication.
              </p>
            </>
          )}
        </>
      )}

      <ConnectBankSecureModal
        open={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        onConfirm={handleConnectConfirm}
      />
    </>
  );
}
