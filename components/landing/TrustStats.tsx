"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Lightning, ShieldCheck } from "@phosphor-icons/react";
import { Lock } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function TrustStats() {
	return (
		<section className="relative bg-bg-secondary py-24 lg:py-32">
			<div className="container mx-auto max-w-5xl px-6">
				{/* LOGO NETWORK BAR */}
				<div className="mb-20 text-center">
					<p className="mb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
						Institutional Network Integration
					</p>
					<div className="flex flex-wrap items-center justify-center gap-12 grayscale opacity-60 transition-all hover:grayscale-0">
						<div className="h-6 w-28 relative">
							<Image
								src="/banks/zenith.png"
								alt="Zenith"
								fill
								className="object-contain"
							/>
						</div>
						<div className="h-6 w-28 relative">
							<Image
								src="/banks/access.png"
								alt="Access"
								fill
								className="object-contain"
							/>
						</div>
						<div className="h-6 w-28 relative">
							<Image
								src="/banks/gtb.png"
								alt="GTBank"
								fill
								className="object-contain"
							/>
						</div>
					</div>
				</div>

				{/* STATS TERMINAL */}
				<div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-border-primary border border-border-primary rounded-lg overflow-hidden shadow-2xl">
					{[
						{
							label: "Compliance Rate",
							value: "85%",
							icon: <ShieldCheck className="w-3 h-3" />,
						},
						{
							label: "Avg. Optimized/Mo",
							value: "₦60,000",
							icon: <Lightning size={25} weight="duotone" />,
						},
						{
							label: "Decision Latency",
							value: "<2ms",
							icon: <Lock className="w-3 h-3" />,
						},
					].map((stat, i) => (
						<div key={i} className="bg-bg-card p-10 text-center group">
							<div className="mb-3 flex justify-center text-green-primary">
								{stat.icon}
							</div>
							<div className="mb-2 text-5xl font-mono font-medium tracking-tighter text-text-primary group-hover:text-green-primary transition-colors">
								{stat.value}
							</div>
							<div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
								{stat.label}
							</div>
						</div>
					))}
				</div>

				{/* FINAL CALL TO ACTION */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="relative overflow-hidden rounded-xl border border-border-primary bg-bg-card p-12 text-center shadow-2xl"
				>
					{/* Decorative pattern for the CTA box */}
					<div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(var(--text-primary)_1px,transparent_1px)] bg-size-[20px_20px]" />

					<div className="relative z-10 max-w-2xl mx-auto">
						<h3 className="mb-4 text-3xl font-medium tracking-tight text-text-primary md:text-4xl">
							Ready to deploy{" "}
							<span className="text-green-primary italic font-light font-serif">
								Flynt?
							</span>
						</h3>
						<p className="mb-10 text-text-secondary text-sm leading-relaxed uppercase tracking-wider">
							Request access to the autonomous financial operating system.
							Limited slots available for the Beta Governance Protocol.
						</p>

						<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
							<a
								href="/waitlist"
								className="w-full sm:w-auto inline-flex items-center justify-center rounded-sm bg-green-primary px-10 py-4 text-xs font-black uppercase tracking-[0.15em] text-white transition-all hover:bg-green-hover"
							>
								Join the Waitlist
								<ArrowRight className="ml-2 h-4 w-4" />
							</a>
							<a
								href="/demo"
								className="w-full sm:w-auto inline-flex items-center justify-center rounded-sm border border-border-primary bg-bg-elevated px-10 py-4 text-xs font-black uppercase tracking-[0.15em] text-text-primary transition hover:bg-bg-hover"
							>
								Request Demo
							</a>
						</div>

						<p className="mt-8 text-[9px] font-mono text-text-muted uppercase tracking-widest">
							Secured by bank-grade encryption protocols
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
