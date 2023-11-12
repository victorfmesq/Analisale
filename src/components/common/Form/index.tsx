import { ChangeEvent, FC, useState, useCallback } from "react";
import * as S from "./styles";
import {
  FORM_FIELD_TYPES,
  FormComponentProps,
  FormData,
  FormField,
  FormFieldType,
  FormFieldValueType,
} from "./types";
import isNullOrUndefinedOrEmpty from "../../../utils/isNullOrUndefinedOrEmpty";

// TODO: passar rules nos fields para validar os inputs
const MASKED_NUMBER = /\D/g;

const convertFieldsToFormData = (fields: FormField[]): FormData => {
  const formData: FormData = {};

  fields.forEach((field) => {
    if (!isNullOrUndefinedOrEmpty(field.value))
      formData[field.title] = field.value;
  });

  return formData;
};

const Form: FC<FormComponentProps> = ({ fields, onSubmit, buttonLabel }) => {
  const [formData, setFormData] = useState<FormData>(
    convertFieldsToFormData(fields),
  );

  const handleInputChange = (
    fieldName: string,
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    let fieldValue: FormFieldValueType = event.target.value;

    console.log("FieldValue: ", fieldValue);

    const currentField = fields.find((field) => field.title === fieldName);

    if (currentField) {
      const fieldType = currentField?.type;

      console.log(currentField);

      if (fieldType) {
        switch (fieldType) {
          case FORM_FIELD_TYPES.date:
            fieldValue = new Date(fieldValue);
            break;
          case FORM_FIELD_TYPES.number:
            fieldValue = parseFloat(fieldValue);
            break;
          case FORM_FIELD_TYPES.maskedNumber:
            fieldValue = fieldValue.replace(MASKED_NUMBER, "");
            break;
          default:
            break;
        }
      }
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
        return type === FORM_FIELD_TYPES.date
          ? (formData[title] as Date)?.toISOString().split("T")[0]
          : type === FORM_FIELD_TYPES.number
          ? (fieldValue as number)
          : (fieldValue as string);
      };

      return (
        <S.FormField key={index}>
          <S.FormLabel>{title}</S.FormLabel>

          {type === FORM_FIELD_TYPES.select ? (
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
              type={
                type === FORM_FIELD_TYPES.maskedNumber
                  ? FORM_FIELD_TYPES.text
                  : type
              }
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
