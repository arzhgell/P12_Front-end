import { ErrorMessage, Field } from "formik";
import type React from "react";

export function InputText({
	label,
	name,
	onChange,
	className,
}: {
	label: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}) {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<Field
				type="text"
				id={name}
				name={name}
				onChange={onChange}
				className={className}
			/>
			<ErrorMessage name={name} component="div" />
		</div>
	);
}
