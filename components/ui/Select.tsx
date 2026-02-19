import { SelectHTMLAttributes } from "react";

export interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
	label?: string;
	options: SelectOption[];
	value: string;
	onChange: (value: string) => void;
	error?: string;
	placeholder?: string;
}

export default function Select({
	label,
	options,
	value,
	onChange,
	error,
	placeholder,
	className = "",
	required,
	"aria-required": ariaRequired,
	...props
}: SelectProps) {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className="w-full">
			{label && (
				<label className="block text-sm font-medium text-text-primary mb-2">
					{label}
				</label>
			)}
			<select
				className={`w-full px-4 py-2.5 rounded-xl border bg-bg-card text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary ${
					error ? "border-error" : "border-border-primary"
				} ${className}`}
				value={value}
				onChange={handleChange}
				required={required}
				aria-required={ariaRequired ?? required}
				aria-invalid={!!error}
				aria-describedby={error ? `${props.id ?? "select"}-error` : undefined}
				{...props}
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			{error && (
				<p
					id={`${props.id ?? "select"}-error`}
					className="mt-1 text-xs text-error"
				>
					{error}
				</p>
			)}
		</div>
	);
}
