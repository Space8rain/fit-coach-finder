import React from "react";
import styles from "./InputField.module.css";
import type { InputFieldProps } from "@/types/InputField";

export default function InputField<T extends string | number>({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: InputFieldProps<T>) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (type === "number") {
      onChange(Number(raw) as T);
    } else {
      onChange(raw as T);
    }
  };

  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={`${styles.input} ${error ? styles.error : ""}`}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}
