"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const OTP_LENGTH = 6;
const RESEND_COUNTDOWN_SECONDS = 60;

const MailIcon = () => (
	<svg
		className="h-10 w-10"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		aria-hidden
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
		/>
	</svg>
);

const CheckIcon = () => (
	<svg
		className="h-8 w-8"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth={2.5}
		aria-hidden
	>
		<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
	</svg>
);

function SuccessSection({ email }: { email: string }) {
	const router = useRouter();

	const handleContinue = useCallback(() => {
		router.push("/dashboard");
	}, [router]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				handleContinue();
			}
		},
		[handleContinue]
	);

	return (
		<div className="flex flex-col items-center text-center">
			<div
				className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-primary/15 text-green-primary"
				aria-hidden
			>
				<CheckIcon />
			</div>
			<h1 className="text-2xl font-bold text-text-primary">
				Verified successfully
			</h1>
			<p className="mt-3 text-base text-text-secondary">
				Your account has been created with the email address{" "}
				<span className="font-medium text-text-primary">
					{email || "your email"}
				</span>
			</p>
			<Button
				type="button"
				variant="primary"
				fullWidth
				size="lg"
				className="mt-8 cursor-pointer"
				onClick={handleContinue}
				onKeyDown={handleKeyDown}
				aria-label="Continue to dashboard"
				tabIndex={0}
			>
				Continue
			</Button>
		</div>
	);
}

function VerifyForm({
	email,
	onVerified,
}: {
	email: string;
	onVerified: () => void;
}) {
	const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
	const [countdown, setCountdown] = useState(RESEND_COUNTDOWN_SECONDS);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const otpString = otp.join("");
	const canVerify = otpString.length === OTP_LENGTH;

	useEffect(() => {
		if (countdown <= 0) return;
		const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
		return () => clearInterval(timer);
	}, [countdown]);

	const handleOtpChange = useCallback((index: number, value: string) => {
		if (value.length > 1) {
			const digits = value.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
			setOtp((prev) => {
				const next = [...prev];
				digits.forEach((d, i) => {
					if (index + i < OTP_LENGTH) next[index + i] = d;
				});
				return next;
			});
			const nextFocus = Math.min(index + digits.length, OTP_LENGTH - 1);
			inputRefs.current[nextFocus]?.focus();
			return;
		}
		const digit = value.replace(/\D/g, "").slice(-1);
		setOtp((prev) => {
			const next = [...prev];
			next[index] = digit;
			return next;
		});
		if (digit && index < OTP_LENGTH - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	}, []);

	const handleKeyDown = useCallback(
		(index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Backspace" && !otp[index] && index > 0) {
				inputRefs.current[index - 1]?.focus();
				setOtp((prev) => {
					const next = [...prev];
					next[index - 1] = "";
					return next;
				});
			}
		},
		[otp]
	);

	const handlePaste = useCallback((e: React.ClipboardEvent) => {
		e.preventDefault();
		const pasted = e.clipboardData
			.getData("text")
			.replace(/\D/g, "")
			.slice(0, OTP_LENGTH);
		if (!pasted) return;
		const digits = pasted.split("");
		setOtp((prev) => {
			const next = [...prev];
			digits.forEach((d, i) => {
				next[i] = d;
			});
			return next;
		});
		const nextFocus = Math.min(digits.length, OTP_LENGTH - 1);
		inputRefs.current[nextFocus]?.focus();
	}, []);

	const handleVerify = useCallback(() => {
		if (!canVerify) return;
		onVerified();
	}, [canVerify, onVerified]);

	const handleResend = useCallback(() => {
		if (countdown > 0) return;
		setCountdown(RESEND_COUNTDOWN_SECONDS);
	}, [countdown]);

	const displayEmail = email || "your email";

	return (
		<div className="flex flex-col items-center">
			<div
				className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-primary/15 text-green-primary"
				aria-hidden
			>
				<MailIcon />
			</div>
			<h1 className="text-xl font-bold text-text-primary">Verify your email</h1>
			<p className="mt-2 text-sm text-text-secondary text-center">
				We&apos;ve sent a 6-digit code to{" "}
				<strong className="text-text-primary">{displayEmail}</strong>
			</p>

			<div
				className="mt-6 flex gap-2"
				role="group"
				aria-label="One-time password verification code"
			>
				{otp.map((digit, index) => (
					<input
						key={index}
						ref={(el) => {
							inputRefs.current[index] = el;
						}}
						type="text"
						inputMode="numeric"
						maxLength={6}
						value={digit}
						onChange={(e) => handleOtpChange(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						onPaste={handlePaste}
						className="h-12 w-12 rounded-lg border border-border-primary bg-bg-card text-center text-2xl font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary"
						aria-label={`Digit ${index + 1}`}
					/>
				))}
			</div>

			<Button
				type="button"
				variant="primary"
				fullWidth
				size="lg"
				className="mt-6 cursor-pointer"
				onClick={handleVerify}
				disabled={!canVerify}
				aria-label="Verify code"
			>
				Verify
			</Button>

			<div className="mt-6 text-center">
				<p className="text-sm text-text-secondary">
					Didn&apos;t receive the code?
				</p>
				{countdown > 0 ? (
					<p className="mt-1 text-sm font-semibold text-text-primary">
						{countdown} seconds
					</p>
				) : (
					<button
						type="button"
						onClick={handleResend}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								handleResend();
							}
						}}
						className="mt-1 text-sm font-semibold text-green-primary hover:text-green-hover focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:ring-offset-2 rounded cursor-pointer"
						aria-label="Resend code"
					>
						Resend code
					</button>
				)}
			</div>

			<p className="mt-4 text-center text-xs text-text-muted">
				Check your spam folder or try resending the code
			</p>
			<Link
				href="#"
				className="mt-2 inline-block text-xs font-medium text-orange hover:underline focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:ring-offset-2 rounded"
			>
				Can&apos;t find the email?
			</Link>
		</div>
	);
}

export default function VerifyEmailPage() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email") ?? "";
	const [isVerified, setIsVerified] = useState(false);

	return (
		<Card
			variant="elevated"
			padding="lg"
			className="border border-border-primary"
		>
			{isVerified ? (
				<SuccessSection email={email} />
			) : (
				<VerifyForm email={email} onVerified={() => setIsVerified(true)} />
			)}
		</Card>
	);
}
