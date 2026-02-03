"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
	CreditCard,
	Activity,
	Cpu,
	LayoutDashboard,
	Search,
} from "lucide-react";

const layers = [
	{
		id: "dashboard",
		title: "Unified Liquidity",
		subtitle: "Zenith • Access • UBA",
		mock: "₦4,820,340.00",
		icon: <LayoutDashboard className="w-4 h-4 text-green-primary" />,
		gradient: "from-green-primary/10 to-transparent",
	},
	{
		id: "card",
		title: "Control Protocols",
		subtitle: "Card Authorization",
		mock: "LOCKED • ₦20k Lim",
		icon: <CreditCard className="w-4 h-4 text-blue" />,
		gradient: "from-blue/10 to-transparent",
	},
	{
		id: "insights",
		title: "Neural Insights",
		subtitle: "Subscription Detection",
		mock: "Action: Pause DSTV",
		icon: <Cpu className="w-4 h-4 text-orange" />,
		gradient: "from-orange/10 to-transparent",
	},
	{
		id: "health",
		title: "Health Index",
		subtitle: "Fiscal Governance",
		mock: "A+ / 94.2",
		icon: <Activity className="w-4 h-4 text-purple" />,
		gradient: "from-purple/10 to-transparent",
	},
];

export default function ProductPreview() {
	return (
		<section className="bg-bg-secondary py-24 border-t border-border-subtle">
			<div className="container mx-auto max-w-7xl px-6">
				{/* Section Header */}
				<div className="mb-16">
					<div className="flex items-center gap-3 mb-4">
						<Search className="w-4 h-4 text-text-muted" />
						<h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
							System Interface Preview
						</h2>
					</div>
					<h3 className="text-4xl font-medium tracking-tight text-text-primary md:text-5xl">
						One interface. <br />
						<span className="text-text-muted font-light italic">
							Total fiscal clarity.
						</span>
					</h3>
				</div>

				{/* Preview Grid */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{layers.map((layer) => (
						<motion.div
							key={layer.id}
							whileHover={{ y: -5 }}
							className="group relative rounded-xl border border-border-primary bg-bg-card overflow-hidden transition-all hover:shadow-2xl hover:shadow-green-primary/5"
						>
							{/* Mock Screen Area */}
							<div
								className={`h-48 w-full bg-linear-to-b ${layer.gradient} p-6 flex flex-col justify-center items-center text-center`}
							>
								<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-bg-elevated shadow-sm border border-border-subtle">
									{layer.icon}
								</div>

								<div className="space-y-1">
									<div className="text-[10px] font-mono text-text-muted uppercase tracking-tighter">
										{layer.subtitle}
									</div>
									<div className="text-lg font-mono font-bold text-text-primary tracking-tight">
										{layer.mock}
									</div>
								</div>

								{/* Decorative Visual: Scanline effect */}
								<div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-size-[100%_2px,3px_100%] opacity-20 dark:opacity-40" />
							</div>

							{/* Info Area */}
							<div className="p-5 border-t border-border-subtle bg-bg-elevated">
								<div className="flex items-center justify-between">
									<h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
										{layer.title}
									</h4>
									<div className="h-1.5 w-1.5 rounded-full bg-green-primary shadow-[0_0_8px_var(--green-glow)]" />
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Footer Technical Note */}
				<div className="mt-12 text-center">
					<p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">
						AES-256 Encrypted Connection • Biometric Verification Required
					</p>
				</div>
			</div>
		</section>
	);
}
