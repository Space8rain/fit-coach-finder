import React from "react";
import styles from "./InputField.module.css";
import type { InputFieldProps } from "@/types/InputField";

export default function InputField({
  name,
  required = false,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  options
}: InputFieldProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(e.target.value);

    // const raw = e.target.value;
    // if (type === "number") {
    //   onChange(Number(raw) as T);
    // } else {
    //   onChange(raw as T);
    // }
  };

  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label} {required && '*'}</label>}

      {type === 'select' ? (
        <select
          className={`${styles.input} ${error ? styles.error : ""}`}
          value={value}
          onChange={handleChange}
          required={required}
        >
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.title}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={handleChange}
          className={`${styles.input} ${error ? styles.error : ""}`}
        />
      )}

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}
