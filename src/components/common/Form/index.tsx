import { ChangeEvent, FC, useState, useCallback } from "react";
import * as S from "./styles";
import {
  FormComponentProps,
  FormData,
  FormField,
  FormFieldType,
  FormFieldValueType,
} from "./types";

// TODO: usar Id como key do

// TODO: passar rules nos fields para validar os inputs

const Form: FC<FormComponentProps> = ({ fields, onSubmit, buttonLabel }) => {
  const [formData, setFormData] = useState<FormData>({});

  const handleInputChange = (
    fieldName: string,
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    let fieldValue: FormFieldValueType = event.target.value;

    const currentField = fields.find((field) => field.title === fieldName);

    if (currentField) {
      const fieldType = currentField?.type;

      if (fieldType !== "select" && fieldType !== "text")
        fieldValue =
          fieldType === "number"
            ? parseFloat(fieldValue)
            : new Date(fieldValue);
    }

    setFormData((current) => {
      return { ...current, [fieldName]: fieldValue };
    });
  };

  const renderField = useCallback(
    (field: FormField, index: number) => {
      const { title, type, value, options } = field;

      const fieldValue = formData[title] || value;

      const getFieldValue = (type: FormFieldType) => {
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
    },
    [formData],
  );

  return (
    <S.FormWrapper>
      {fields.map((field, index) => renderField(field, index))}

      <S.Button onClick={() => onSubmit(formData)}>{buttonLabel}</S.Button>
    </S.FormWrapper>
  );
};

Form.defaultProps = {
  buttonLabel: "submit",
};

export default Form;
