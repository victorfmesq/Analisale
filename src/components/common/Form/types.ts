export type SelectedWithAmount = {
  id: string;
  label?: string;
  amount?: number;
};

// TODO: adicionar maxValue p limitar a qtd de selecionaveis
export type SelectOption = {
  id: string;
  value: string | number;
  limit?: number;
};
export type FormFieldType = keyof typeof FORM_FIELD_TYPES;
export type FormFieldValueType =
  | string
  | number
  | Date
  | string[]
  | SelectedWithAmount[];

export type FormField = {
  title: string;
  type: FormFieldType;
  value: FormFieldValueType;
  options?: SelectOption[];
};

export type FormData = Record<string, FormFieldValueType>;

export interface FormComponentProps {
  fields: FormField[];
  onSubmit: (formData: FormData) => void;
  buttonLabel?: string;
}

export const FORM_FIELD_TYPES = {
  text: "text",
  singleSelect: "singleSelect",
  multiSelect: "multiSelect",
  multiSelectAmount: "multiSelectAmount",
  number: "number",
  date: "date",
  password: "password",
  email: "email",
  maskedNumber: "maskedNumber",
} as const;
