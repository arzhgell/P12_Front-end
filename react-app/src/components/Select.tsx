import { ErrorMessage, Field } from "formik";
import React from "react";

export function Select({
	label,
	name,
	options,
	className,
}: { label: string; name: string; options: string[]; className?: string }) {
	return (
		<>
			<label htmlFor={name}>{label}</label>
			<Field as={name} id={name} name={name} className={className}>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</Field>
			<ErrorMessage name={name} component="div" />
		</>
	);
}
