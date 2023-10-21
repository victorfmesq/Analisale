import { ChangeEvent, FC, useState } from "react";
import * as S from "./styles";

type Type = "text" | "select" | "number" | "date";
type Value = string | number | Date;

type Field = {
  title: string;
  type: Type;
  value: Value;
  options?: string[];
};

interface FormProps {
  fields: Field[];
  onSubmit: () => void;
}

const Form: FC<FormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, Value>>({});

  const handleInputChange = (
    fieldName: string,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    let fieldValue: Value = event.target.value;

    const currentField = fields.find((field) => field.title === fieldName);

    if (currentField) {
      const fieldType = currentField?.type;

      if (fieldType !== "select" && fieldType !== "text")
        fieldValue =
          fieldType === "number"
            ? parseFloat(fieldValue)
            : new Date(fieldValue);
    }

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  const renderField = (field: Field, index: number) => {
    const { title, type, value, options } = field;

    const fieldValue = formData[title] || value;

    const getFieldValue = (type: Type) => {
      return type === "date"
        ? (formData[title] as Date)?.toISOString().split("T")[0]
        : type === "number"
        ? (fieldValue as number)
        : (fieldValue as string);
    };

    return (
      <S.FormField key={index}>
        <S.FormLabel>{title}</S.FormLabel>

        {type === "select" ? (
          <S.FormSelect
            value={getFieldValue(type)}
            onChange={(e) => handleInputChange(title, e)}
          >
            {options &&
              options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
          </S.FormSelect>
        ) : (
          <S.FormInput
            type={type}
            value={getFieldValue(type)}
            onChange={(e) => handleInputChange(title, e)}
          />
        )}
      </S.FormField>
    );
  };

  return (
    <S.FormWrapper>
      {fields.map((field, index) => renderField(field, index))}

      <button onClick={onSubmit}>Submit</button>
    </S.FormWrapper>
  );
};

export default Form;
