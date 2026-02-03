"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Cpu, BarChart3, Zap } from "lucide-react";

const steps = [
	{
		id: "01",
		title: "Secure Aggregation",
		desc: "Seamless integration of institutional data, liabilities, and liquid assets via encrypted API protocols.",
		icon: <ShieldCheck className="w-5 h-5 text-green-primary" />,
	},
	{
		id: "02",
		title: "Neural Analytics",
		desc: "Proprietary AI models run multi-vector stress tests and liquidity forecasting in sub-millisecond cycles.",
		icon: <Cpu className="w-5 h-5 text-blue" />,
	},
	{
		id: "03",
		title: "Strategic Oversight",
		desc: "The decision engine evaluates transaction risk against pre-defined fiscal governance and growth goals.",
		icon: <BarChart3 className="w-5 h-5 text-orange" />,
	},
	{
		id: "04",
		title: "Automated Execution",
		desc: "Instantaneous card authorization and capital deployment based on real-time solvency metrics.",
		icon: <Zap className="w-5 h-5 text-purple" />,
	},
];

export default function FinanceWorkflow() {
	return (
		<section className="py-24 text-text-primary">
			<div className="container mx-auto max-w-7xl px-6">
				<div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
					<div>
						<span className="text-xs font-bold tracking-[0.2em] text-green-primary uppercase">
							Operational Framework
						</span>
						<h2 className="mt-2 text-4xl font-light tracking-tight text-text-primary md:text-5xl ">
							The Protocol of{" "}
							<span className="font-semibold text-text-secondary">
								Precision.
							</span>
						</h2>
					</div>
					<p className="max-w-md text-text-secondary text-sm leading-relaxed">
						Our multi-layered engine transforms raw fiscal data into actionable
						capital intelligence, ensuring every dollar aligns with your
						long-term mandate.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-primary border border-border-primary overflow-hidden rounded-xl">
					{steps.map((step) => (
						<div
							key={step.id}
							className="group relative bg-bg-card p-8 transition-all hover:bg-bg-elevated"
						>
							<div className="mb-8 flex items-center justify-between">
								<span className="text-xs font-mono font-medium text-text-muted">
									[{step.id}]
								</span>
								<div className="p-2 bg-bg-elevated rounded-md group-hover:scale-110 transition-transform">
									{step.icon}
								</div>
							</div>

							<h3 className="text-lg font-semibold mb-3 text-text-primary">
								{step.title}
							</h3>
							<p className="text-sm leading-relaxed text-text-secondary mb-6">
								{step.desc}
							</p>

							{/* Decorative Finance Element */}
							<div className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-green-primary transition-colors" />
						</div>
					))}
				</div>

				<div className="mt-12 flex items-center justify-center gap-2 text-xs font-medium text-text-muted uppercase tracking-widest">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary"></span>
					</span>
					System Status: Active & Encrypted
				</div>
			</div>
		</section>
	);
}
