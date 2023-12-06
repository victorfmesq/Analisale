import { ChangeEvent, FC, useState, useCallback, useEffect } from "react";
import * as S from "./styles";
import {
  FORM_FIELD_TYPES,
  FormComponentProps,
  FormData,
  FormField,
  FormFieldType,
  FormFieldValueType,
  SelectOption,
  SelectedWithAmount,
} from "./types";
import isNullOrUndefinedOrEmpty from "../../../utils/isNullOrUndefinedOrEmpty";

import Select, { Options, OptionsOrGroups } from "react-select";
import QuantityInput from "./InputQuantity";

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

const isMultiSelectType = (type: FormFieldType): boolean =>
  type === FORM_FIELD_TYPES.multiSelect ||
  type === FORM_FIELD_TYPES.multiSelectAmount;

const isSelectType = (type: FormFieldType): boolean =>
  type === FORM_FIELD_TYPES.singleSelect || isMultiSelectType(type);

const Form: FC<FormComponentProps> = ({ fields, onSubmit, buttonLabel }) => {
  const [selectedOptionsIds, setSelectedOptionsIds] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>(
    convertFieldsToFormData(fields),
  );

  // useEffect(() => {
  //   fields.forEach((field) => {
  //     console.log("field no effect: ", field);

  //     if (
  //       isSelectType(field.type) &&
  //       Array.isArray(field.value) &&
  //       isNullOrUndefinedOrEmpty(fields)
  //     ) {
  //       console.log("setando field value: ", field.value);

  //       setSelectedOptionsIds((current) =>
  //         field.type === FORM_FIELD_TYPES.multiSelectAmount
  //           ? [
  //               ...current,
  //               ...(field.value as SelectedWithAmount[]).map((f) => f.id),
  //             ]
  //           : [...current, ...field.value],
  //       );
  //     }
  //   });

  //   console.log("formData: ", formData);
  //   // }, []);
  // }, [formData]);

  useEffect(() => {
    console.log("selectedOptionsIds: ", selectedOptionsIds);
  }, [selectedOptionsIds]);
  useEffect(() => {
    console.log("formData ", formData);
  }, [formData]);

  const handleInputChange = (
    fieldName: string,
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    let fieldValue: FormFieldValueType = event.target.value;

    const currentField = fields.find((field) => field.title === fieldName);

    if (currentField) {
      const fieldType = currentField?.type;

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

    setFormData((current) => ({ ...current, [fieldName]: fieldValue }));
  };

  const handleSelectChange = useCallback(
    (fieldName: string, value: any) => {
      const currentField = fields.find((field) => field.title === fieldName);

      if (currentField) {
        setSelectedOptionsIds((current) => {
          console.log("handleSelect => value: ", value);
          console.log("current: ", current);
          console.log(
            "new: ",
            !isNullOrUndefinedOrEmpty(value)
              ? [...current].concat(
                  value
                    .filter((v) => !current.includes(v.value ?? v.id))
                    .map((v) => v.value ?? v.id),
                )
              : [...new Set(current)],
          );

          return !isNullOrUndefinedOrEmpty(value)
            ? [...current].concat(
                value
                  .filter((v) => !current.includes(v.value ?? v.id))
                  .map((v) => v.value ?? v.id),
              )
            : [...new Set(current)];
        });

        const newValue = value.map((v) => {
          const currentOption = formData[fieldName]
            ? formData[fieldName].find((e) =>
                v.id ? e.id === v.id : e.id === v.value,
              )
            : undefined;
          return {
            id: v.id ?? v.value,
            label: v.label,
            amount:
              !isNullOrUndefinedOrEmpty(formData) ||
              !isNullOrUndefinedOrEmpty(formData[fieldName])
                ? currentOption
                  ? currentOption.amount
                  : 1
                : 1,
          } as SelectedWithAmount;
        });

        // TODO: aqui
        setFormData((current) => ({
          ...current,
          [fieldName]: newValue,
        }));
      }
    },
    [formData],
  );

  const handleAmountOption = useCallback(
    (fieldName: string, value: number | undefined, optionId: string) => {
      if (optionId) {
        setFormData((current) => ({
          ...current,
          [fieldName]: (current[fieldName] as SelectedWithAmount[]).map(
            ({ id, amount, label }) => {
              return {
                id,
                label,
                amount: optionId === id ? value : amount,
              };
            },
          ),
        }));
      }
    },
    [formData],
  );

  // TODO: tipar corretamente
  const createSelectOptions = (
    fields: SelectOption[] | undefined,
  ): OptionsOrGroups<any, any> => {
    return fields
      ? fields.map((field) => ({
          value: field.id,
          label: field.value,
        }))
      : [];
  };

  const getOptionsToAmount = useCallback(
    (options: SelectOption[]) => {
      return options
        .filter(({ id }) => selectedOptionsIds.includes(id))
        .filter((option) => selectedOptionsIds.includes(option.id));
    },
    [selectedOptionsIds],
  );

  const renderField = useCallback(
    (field: FormField, index: number) => {
      const { title, type, value, options } = field;

      const fieldValue = formData[title] || value;

      const getFieldValue = (type: FormFieldType) => {
        switch (type) {
          case FORM_FIELD_TYPES.date:
            return (formData[title] as Date)?.toISOString().split("T")[0];
          case FORM_FIELD_TYPES.number:
            return fieldValue as number;
          case FORM_FIELD_TYPES.multiSelect:
            return !isNullOrUndefinedOrEmpty(selectedOptionsIds)
              ? (options
                  .filter((o) => selectedOptionsIds.includes(o.id))
                  .map(
                    ({ id, value }) =>
                      ({ id, label: value }) as SelectedWithAmount,
                  ) as SelectedWithAmount[])
              : (fieldValue as SelectedWithAmount[]);
          case FORM_FIELD_TYPES.multiSelectAmount:
            return !isNullOrUndefinedOrEmpty(fieldValue)
              ? (options
                  .filter((o) => fieldValue.map((f) => f.id).includes(o.id))
                  .map(
                    ({ id, value }) =>
                      ({ id, label: value }) as SelectedWithAmount,
                  ) as SelectedWithAmount[])
              : null;
          default:
            return fieldValue as string;
        }
      };

      return (
        <S.FormField key={index}>
          <S.FormLabel>{title}</S.FormLabel>

          {isSelectType(type) ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Select
                isMulti={isMultiSelectType(type)}
                value={getFieldValue(type)}
                onChange={(selectedOptions) =>
                  handleSelectChange(title, selectedOptions)
                }
                options={createSelectOptions(options)}
              />

              <div>
                {options &&
                  type === FORM_FIELD_TYPES.multiSelectAmount &&
                  getOptionsToAmount(options).map(({ id, value, limit }) => (
                    <S.StyledListItem key={id}>
                      <S.Label>{value}</S.Label>
                      <QuantityInput
                        currenValue={Number(value) ?? 1}
                        maxValue={limit || 0}
                        setCurrentValue={(value) =>
                          handleAmountOption(title, value, id)
                        }
                      />
                    </S.StyledListItem>
                  ))}
              </div>
            </div>
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
    [formData, selectedOptionsIds],
  );

  return (
    <>
      <S.FormWrapper>
        {fields.map((field, index) => renderField(field, index))}

        <S.Button onClick={() => onSubmit(formData)}>{buttonLabel}</S.Button>
      </S.FormWrapper>
    </>
  );
};

Form.defaultProps = {
  buttonLabel: "submit",
};

export default Form;
