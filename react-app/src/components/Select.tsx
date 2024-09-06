import React from "react";

interface SelectProps {
	label: string;
	name: string;
	options: string[];
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	className?: string;
	error?: string;
}

export const Select: React.FC<SelectProps> = ({
	label,
	name,
	options,
	value,
	onChange,
	className = "",
	error,
}) => {
	return (
		<div className="mb-4">
			<label htmlFor={name} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<select
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				className={`mt-1 block w-full shadow-sm border ${
					error ? "border-red-500" : "border-gray-300"
				} rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
				aria-describedby={`${name}-error`}
				aria-invalid={!!error}
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			{error && (
				<p id={`${name}-error`} className="mt-2 text-sm text-red-600">
					{error}
				</p>
			)}
		</div>
	);
};
