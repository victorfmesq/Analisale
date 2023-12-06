import React, { FC, useState, useCallback, useEffect } from "react";
import { Plus } from "@styled-icons/bootstrap";
import IconButton from "../../components/common/Button";
import * as TabPageStyle from "../../components/Pages/TabPage/styles";
import Table from "../../components/Table";
import useModal from "../../context/ModalContext/useModal";
import Form from "../../components/common/Form";
import FormModal from "../../components/FormModal";
import {
  FORM_FIELD_TYPES,
  FormData,
  FormField,
} from "../../components/common/Form/types";
import {
  createCharge,
  deleteCharge,
  getAllCharges,
  getChargeById,
  updateCharge,
} from "../../services/Charges";
import { GridRowParams } from "@mui/x-data-grid";
import isNullOrUndefinedOrEmpty from "../../utils/isNullOrUndefinedOrEmpty";
import SearchField from "../../components/common/SearchField";
import useTableData from "../../context/TableDataContext/useTableData";
import { ToastContainer, Zoom } from "react-toastify";

const FORM_TITLES = {
  name: "Nome",
  type: "Tipo",
  value: "Percentual",
} as const;

const CHARGE_FORM_FIELDS: FormField[] = [
  {
    title: FORM_TITLES.name,
    type: FORM_FIELD_TYPES.text,
    value: "",
  },
  {
    title: FORM_TITLES.type,
    type: FORM_FIELD_TYPES.maskedNumber,
    value: "",
  },
  {
    title: FORM_TITLES.value,
    type: FORM_FIELD_TYPES.maskedNumber,
    value: "",
  },
];

const Charges = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchCharges, setFetchCharges] = useState<boolean>(true);
  const [charges, setCharges] = useState<Charge.Entity[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const { handleModalContent } = useModal();
  const { updateCharges } = useTableData();

  const handleFetchSearchInput = async (value: string) => {
    if (isNullOrUndefinedOrEmpty(value)) {
      setFetchCharges(true);
      return;
    }

    setIsLoading((current) => !current);

    const result = await getChargeById(value);

    if (result.isSuccess) setCharges([result.value]);
    else {
      setCharges([]);
      // renderToast(result?.message);
    }

    setIsLoading((current) => !current);
  };

  const onDeleteCharge = async (chargeId: string) => {
    await deleteCharge(chargeId);

    setFetchCharges(true);
  };

  const onSubmitForm = async (formData: FormData, entityId?: string) => {
    const formKeys = Object.keys(formData);

    // TODO: send validations on rules at FormField[]
    const isNotValidForm = formKeys.some(
      (key) =>
        isNullOrUndefinedOrEmpty(formData[key]) || Number.isNaN(formData[key]),
    );

    // TODO: mlhorar essas validações
    console.log("formKeys: ", formKeys.length);
    if (isNotValidForm || formKeys.length < CHARGE_FORM_FIELDS.length) {
      console.log("formulário inválido");
      return;
    }

    let formObj: Charge.Payload = {
      name: formData[FORM_TITLES.name].toString(),
      type: Number(formData[FORM_TITLES.type]),
      value: Number(formData[FORM_TITLES.value]),
    };

    if (entityId) await updateCharge(entityId, formObj);
    else await createCharge(formObj);

    handleModalContent(false);

    setFetchCharges(true);
  };

  const openModal = (
    isEdit: boolean,
    chargeToEdit?: GridRowParams<Charge.Entity>,
  ) => {
    let fields: FormField[] = CHARGE_FORM_FIELDS;

    console.log(chargeToEdit);

    if (isEdit && chargeToEdit) {
      console.log(chargeToEdit);
      const fieldMapValue = {
        [FORM_TITLES.name]: chargeToEdit.name,
        [FORM_TITLES.type]: chargeToEdit.type,
        [FORM_TITLES.value]: chargeToEdit.value,
      };

      fields = fields.map((field) => {
        const chargeValue = fieldMapValue[field.title];

        return chargeValue ? { ...field, value: chargeValue } : field;
      });
    }

    handleModalContent(
      true,
      <FormModal title={`${!isEdit ? "Criar" : "Editar"} Produto`}>
        <Form
          fields={fields}
          onSubmit={(data) => onSubmitForm(data, chargeToEdit?.id)}
        />
      </FormModal>,
    );
  };

  useEffect(() => {
    (async () => {
      if (fetchCharges) {
        setIsLoading(true);
        const result = await getAllCharges();

        updateCharges(result.value);

        if (result.isSuccess) setCharges(result.value);

        setIsLoading(false);
        setFetchCharges(false);
      }
    })();
  }, [fetchCharges]);

  return (
    <>
      <TabPageStyle.Header>
        <IconButton
          isCompressed={false}
          onClick={() => openModal(false)}
          text="Cadastrar Encargo"
          leftIcon={<Plus size={20} />}
        />

        <SearchField
          label="Buscar encargos por código"
          value={searchInput}
          setValue={setSearchInput}
          fetchData={handleFetchSearchInput}
        ></SearchField>
      </TabPageStyle.Header>

      <TabPageStyle.Body>
        <Table
          variant="charges"
          data={charges}
          isLoading={isLoading}
          onDeleteCell={(props) => onDeleteCharge(props.id)}
          onEditCell={(props) => openModal(true, props)}
        />
      </TabPageStyle.Body>
      <div></div>
    </>
  );
};

export default Charges;
