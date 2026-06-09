export type Field = {
  name: string;
  label: string;
  type: "text" | "number";
  required: boolean;
};

export type ProfileFormData = {
  role: "client" | "coach" | null;
  [key: string]: string | number | null | undefined;
} & {
  name?: string;
  age?: number;
  goals?: string;
  specialization?: string;
  experience?: number;
};

export type OnChange<T> = (value: T) => void;

export type InputFieldProps<T> = {
  label?: string;
  value: T;
  onChange: OnChange<T>;
  error?: string | null;
  type?: "text" | "number";
  placeholder?: string;
};
