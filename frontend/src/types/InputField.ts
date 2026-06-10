export type Field = {
  name: string;
  label: string;
  type: "text" | "number" | "tel" | 'date' | 'email' | 'select';
  options?: {[key: string]: string}[];
  required: boolean;
  placeholder?: string;
};

export type ProfileFormData = {
  role: "client" | "coach" | null;
  [key: string]: string | number | null | undefined;
} & {
  name?: string;
  age?: string;
  goals?: string;
  specialization?: string;
  experience?: string;
};

export type OnChange<T> = (value: T) => void;

export type InputFieldProps = Field & {
  value: string | number;
  onChange: (value: string ) => void;
  error?: string | null;
};
