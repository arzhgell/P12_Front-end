import { ErrorMessage, Field } from "formik";
import React from "react";

export function Select({label, name, options}: {label: string, name: string, options: string[]}) {
  return (
    <><label htmlFor={name}>{label}</label>
    <Field as={name} id={name} name={name}>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </Field>
    <ErrorMessage name={name} component="div" /></>
  );
}