import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useField } from "formik";

interface InputDateProps {
	label: string;
	name: string;
	value: Date | null;
	onChange: (date: Date | null) => void;
	error?: string;
	className?: string;
	ariaLabel?: string;
}

export const InputDate: React.FC<InputDateProps> = ({
	label,
	name,
	value,
	onChange,
	error,
	className,
	ariaLabel,
}) => {
	const [field, meta] = useField(name);

	return (
		<div className="flex flex-col">
			<label htmlFor={name} className="text-sm font-medium text-gray-700">
				{label}
			</label>
			<DatePicker
				selected={value}
				onChange={onChange}
				id={name}
				aria-label={ariaLabel || name}
				className={`w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 transition duration-300"
					${className}
					${error || (meta.touched && meta.error && "border-red-500")}
				`}
				dateFormat="yyyy-MM-dd" // Format de date standard
				placeholderText="YYYY-MM-DD"
				showMonthDropdown
				showYearDropdown
				dropdownMode="select"
				aria-invalid={!!(meta.touched && meta.error)}
				aria-describedby={
					meta.touched && meta.error ? `${name}-error` : undefined
				}
			/>
			{meta.touched && meta.error && (
				<span id={`${name}-error`} className="text-red-500 text-sm mt-1">
					{meta.error}
				</span>
			)}
		</div>
	);
};
