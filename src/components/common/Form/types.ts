export type FormFieldType = keyof typeof FORM_FIELD_TYPES;
export type FormFieldValueType = string | number | Date;

export type FormField = {
  title: string;
  type: FormFieldType;
  value: FormFieldValueType;
  options?: string[];
};

export type FormData = Record<string, FormFieldValueType>;

export interface FormComponentProps {
  fields: FormField[];
  onSubmit: (formData: FormData) => void;
  buttonLabel?: string;
}

export const FORM_FIELD_TYPES = {
  text: "text",
  select: "select",
  number: "number",
  date: "date",
  password: "password",
  email: "email",
  maskedNumber: "maskedNumber",
} as const;
