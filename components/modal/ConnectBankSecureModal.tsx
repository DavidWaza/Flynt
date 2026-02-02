"use client";

import Modal from "./Modal";
import Button from "@/components/ui/Button";

const LockIcon = () => (
	<svg
		className="h-5 w-5 shrink-0"
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

const ShieldIcon = () => (
	<svg
		className="h-5 w-5 shrink-0"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		aria-hidden
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
		/>
	</svg>
);

const CheckIcon = () => (
	<svg
		className="h-5 w-5 shrink-0"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		aria-hidden
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M5 13l4 4L19 7"
		/>
	</svg>
);

const XIcon = () => (
	<svg
		className="h-5 w-5 shrink-0"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		aria-hidden
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
);

interface ConnectBankSecureModalProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export default function ConnectBankSecureModal({
	open,
	onClose,
	onConfirm,
}: ConnectBankSecureModalProps) {
	const handleConfirm = () => {
		onConfirm();
		onClose();
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="Connect your bank securely"
			footer={
				<>
					<Button
						type="button"
						variant="secondary"
						onClick={onClose}
						aria-label="Cancel"
					>
						Cancel
					</Button>
					<Button
						type="button"
						variant="primary"
						onClick={handleConfirm}
						aria-label="I understand, continue"
					>
						I Understand, Continue
					</Button>
				</>
			}
		>
			<div className="grid gap-6 sm:grid-cols-2">
				<div className="space-y-4">
					<p className="text-sm text-text-secondary">
						We need read-only access to analyze your transactions and provide
						personalized advice.
					</p>
					<ul className="space-y-3 text-sm text-text-primary">
						<li className="flex items-center gap-2">
							<span className="text-purple" aria-hidden>
								<LockIcon />
							</span>
							256-bit Encryption
						</li>
						<li className="flex items-center gap-2">
							<span className="text-green-primary" aria-hidden>
								<ShieldIcon />
							</span>
							SSL Secured
						</li>
						<li className="flex items-center gap-2">
							<span className="text-text-primary font-medium">
								Powered by Mono
							</span>
						</li>
					</ul>
				</div>
				<div className="space-y-4">
					<p className="text-sm font-medium text-text-primary">
						Permissions Granted
					</p>
					<ul className="space-y-2 text-sm text-text-secondary">
						{[
							"Read your transaction history",
							"Analyze spending patterns",
							"Categorize expenses",
							"Generate insights",
						].map((item) => (
							<li key={item} className="flex items-center gap-2">
								<span className="text-green-primary" aria-hidden>
									<CheckIcon />
								</span>
								{item}
							</li>
						))}
					</ul>
					<p className="text-sm font-medium text-text-primary pt-2">
						Permissions Denied
					</p>
					<ul className="space-y-2 text-sm text-text-secondary">
						{["Move or transfer money", "Make payments"].map((item) => (
							<li key={item} className="flex items-center gap-2">
								<span className="text-error" aria-hidden>
									<XIcon />
								</span>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</Modal>
	);
}
