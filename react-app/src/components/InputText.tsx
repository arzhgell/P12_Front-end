import { ErrorMessage, Field } from "formik";
import React from "react";

export function InputText({label, name, onChange}: {label: string, name: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field type="text" id={name} name={name} onChange={onChange} />
      <ErrorMessage name={name} component="div" />
    </>
  );
}