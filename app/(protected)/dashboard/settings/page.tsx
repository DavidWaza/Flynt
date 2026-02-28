"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { changePasswordSchema } from "@/lib/validations/auth";
import type { ChangePasswordFormValues } from "@/lib/validations/auth";
import { changePasswordRequest } from "@/lib/api/requests";
import { clearToken } from "@/lib/auth-cookie";
import { useAuthStore } from "@/stores/use-auth-store";

type SettingsTab = "security";

const LockIcon = () => (
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
			d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
		/>
	</svg>
);

const EyeIcon = () => (
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
			d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
		/>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
		/>
	</svg>
);

const EyeOffIcon = () => (
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
			d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
		/>
	</svg>
);

const ShieldIcon = () => (
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
			d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
		/>
	</svg>
);

const tabs: {
	id: SettingsTab;
	label: string;
	icon: React.ReactNode;
	tabId: string;
}[] = [
	{
		id: "security",
		label: "Security",
		icon: <ShieldIcon />,
		tabId: "security-tab",
	},
];

export default function SettingsPage() {
	const router = useRouter();
	const { setData } = useAuthStore();
	const [activeTab, setActiveTab] = useState<SettingsTab>("security");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [errors, setErrors] = useState<
		Partial<Record<keyof ChangePasswordFormValues, string>>
	>({});
	const [isLoading, setIsLoading] = useState(false);

	const handleToggleCurrentPassword = useCallback(() => {
		setShowCurrentPassword((prev) => !prev);
	}, []);

	const handleToggleNewPassword = useCallback(() => {
		setShowNewPassword((prev) => !prev);
	}, []);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setErrors({});
			const values: ChangePasswordFormValues = {
				currentPassword,
				newPassword,
				confirmPassword,
			};
			try {
				await changePasswordSchema.validate(values, { abortEarly: false });
			} catch (err) {
				const yupErr = err as {
					inner?: Array<{ path?: string; message?: string }>;
				};
				const next: Partial<Record<keyof ChangePasswordFormValues, string>> =
					{};
				if (yupErr.inner) {
					for (const item of yupErr.inner) {
						if (item.path)
							next[item.path as keyof ChangePasswordFormValues] = item.message;
					}
				}
				setErrors(next);
				return;
			}
			setIsLoading(true);
			try {
				const response = await changePasswordRequest({
					currentPassword,
					newPassword,
				});
				if (response.success) {
					clearToken();
					setData({ user: null });
					toast.success("Password changed", {
						description: "Please sign in with your new password.",
					});
					router.push("/login");
				}
			} finally {
				setIsLoading(false);
			}
		},
		[currentPassword, newPassword, confirmPassword, setData, router]
	);

	return (
		<div className="max-w-7xl mx-auto p-6 space-y-8">
			<header>
				<h1 className="text-2xl font-bold text-text-primary">Settings</h1>
				<p className="mt-1 text-sm text-text-secondary">
					Manage your account and preferences.
				</p>
			</header>

			<div className="flex flex-col sm:flex-row gap-6">
				<nav
					className="flex sm:flex-col gap-1 shrink-0"
					role="tablist"
					aria-label="Settings sections"
				>
					{tabs.map((tab) => {
						const isActive = activeTab === tab.id;
						return (
							<button
								key={tab.id}
								id={tab.tabId}
								type="button"
								role="tab"
								aria-selected={isActive}
								aria-label={tab.label}
								tabIndex={isActive ? 0 : -1}
								onClick={() => setActiveTab(tab.id)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										setActiveTab(tab.id);
									}
								}}
								className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
									isActive
										? "bg-green-primary/10 text-green-primary"
										: "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
								}`}
							>
								{tab.icon}
								{tab.label}
							</button>
						);
					})}
				</nav>

				<div
					className="flex-1 min-w-0"
					role="tabpanel"
					aria-labelledby={
						activeTab === "security" ? "security-tab" : undefined
					}
				>
					{activeTab === "security" && (
						<Card padding="lg" variant="default">
							<h2 className="text-lg font-semibold text-text-primary">
								Change password
							</h2>
							<p className="mt-1 text-sm text-text-secondary">
								Update your password. You will be signed out and must sign in
								again with your new password.
							</p>
							<form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md">
								<Input
									label="Current password"
									type={showCurrentPassword ? "text" : "password"}
									placeholder="••••••••"
									value={currentPassword}
									onChange={(e) => setCurrentPassword(e.target.value)}
									icon={<LockIcon />}
									iconPosition="left"
									error={errors.currentPassword}
									rightElement={
										<button
											type="button"
											onClick={handleToggleCurrentPassword}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													e.preventDefault();
													handleToggleCurrentPassword();
												}
											}}
											className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-green-primary/20"
											aria-label={
												showCurrentPassword ? "Hide password" : "Show password"
											}
											tabIndex={0}
										>
											{showCurrentPassword ? <EyeOffIcon /> : <EyeIcon />}
										</button>
									}
									required
									autoComplete="current-password"
									aria-required="true"
								/>
								<Input
									label="New password"
									type={showNewPassword ? "text" : "password"}
									placeholder="••••••••"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									icon={<LockIcon />}
									iconPosition="left"
									error={errors.newPassword}
									rightElement={
										<button
											type="button"
											onClick={handleToggleNewPassword}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													e.preventDefault();
													handleToggleNewPassword();
												}
											}}
											className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-green-primary/20"
											aria-label={
												showNewPassword ? "Hide password" : "Show password"
											}
											tabIndex={0}
										>
											{showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
										</button>
									}
									required
									autoComplete="new-password"
									aria-required="true"
								/>
								<Input
									label="Confirm new password"
									type={showNewPassword ? "text" : "password"}
									placeholder="••••••••"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									icon={<LockIcon />}
									iconPosition="left"
									error={errors.confirmPassword}
									required
									autoComplete="new-password"
									aria-required="true"
								/>
								<Button
									type="submit"
									variant="primary"
									size="lg"
									className="mt-2 cursor-pointer"
									disabled={isLoading}
									aria-busy={isLoading}
								>
									{isLoading ? "Updating…" : "Change password"}
								</Button>
							</form>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
