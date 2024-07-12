import { ErrorMessage, Field } from "formik";
import React from "react";
import DatePicker from "react-datepicker";

export function InputDate({name, label, value, onChange, error}: {name: string, label: string, value: Date, onChange: (date: Date) => void, error: string | undefined}) {
  return (
    <>
<label htmlFor={name}>{label}</label>
            <DatePicker
              selected={value}
              onChange={onChange}
              dateFormat="MM/dd/yyyy"
            />
            {error && error}
    </>
  );
}