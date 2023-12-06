import { Plus } from "@styled-icons/bootstrap";
import React, { useCallback, useEffect, useState } from "react";

import IconButton from "../../components/common/Button";
import * as TabPageStyle from "../../components/Pages/TabPage/styles";
import Table from "../../components/Table";
import useModal from "../../context/ModalContext/useModal";
import {
  createSale,
  deleteSale,
  getAllSales,
  getSaleById,
  updateSales,
} from "../../services/Sales";
import isNullOrUndefinedOrEmpty from "../../utils/isNullOrUndefinedOrEmpty";
import {
  FORM_FIELD_TYPES,
  FormData,
  FormField,
  SelectOption,
} from "../../components/common/Form/types";
import { GridRowParams } from "@mui/x-data-grid";
import FormModal from "../../components/FormModal";
import Form from "../../components/common/Form";
import SearchField from "../../components/common/SearchField";
import { Sale } from "../../types/sale";
import { getAllCharges } from "../../services/Charges";
import { getAllProducts } from "../../services/Products";

const FORM_TITLES = {
  products: "Produtos",
  charges: "Encargos",
} as const;

// TODO: adicionar componente de seleção multipla com qtd de cada item
const SALE_FORM_FIELDS: FormField[] = [
  {
    title: FORM_TITLES.products,
    type: FORM_FIELD_TYPES.multiSelectAmount,
    value: "",
    options: [],
  },
  {
    title: FORM_TITLES.charges,
    type: FORM_FIELD_TYPES.multiSelect,
    value: "",
    options: [],
  },
];

const Sales = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchSales, setFetchSales] = useState<boolean>(true);
  const [sales, setSales] = useState<Sale.Entity[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [saleFormField, setSaleFormField] =
    useState<FormField[]>(SALE_FORM_FIELDS);

  const { handleModalContent } = useModal();

  const handleFetchSearchInput = async (value: string) => {
    if (isNullOrUndefinedOrEmpty(value)) {
      setFetchSales(true);
      return;
    }

    setIsLoading((current) => !current);

    const result = await getSaleById(value);

    if (result.isSuccess) setSales([result.value]);
    else {
      setSales([]);
      // renderToast(result?.message);
    }

    setIsLoading((current) => !current);
  };

  const onDeleteSale = async (saleId: string) => {
    await deleteSale(saleId);

    setFetchSales(true);
  };

  const onSubmitForm = async (formData: FormData, entityId?: string) => {
    console.log(formData);

    const formKeys = Object.keys(formData);

    // TODO: send validations on rules at FormField[]
    const isNotValidForm = formKeys.some(
      (key) =>
        isNullOrUndefinedOrEmpty(formData[key]) || Number.isNaN(formData[key]),
    );

    // TODO: mlhorar essas validações
    console.log("formKeys: ", formKeys.length);
    if (isNotValidForm || formKeys.length < SALE_FORM_FIELDS.length) {
      console.log("formulário inválido");
      return;
    }

    // TODO: avaliar uma forma de retornar e converter o resultado paa o tipo esperado
    let formObj: Sale.Payload = {
      products: formData[FORM_TITLES.products],
      charges: formData[FORM_TITLES.charges],
    };

    if (entityId) await updateSales(entityId, formObj);
    else await createSale(formObj);

    handleModalContent(false);

    setFetchSales(true);
  };

  const openModal = useCallback(
    (isEdit: boolean, saleToEdit?: GridRowParams<Sale.Entity>) => {
      let fields: FormField[] = saleFormField;

      console.log(saleToEdit);

      if (isEdit && saleToEdit) {
        console.log(saleToEdit);
        const fieldMapValue = {
          [FORM_TITLES.charges]: saleToEdit.charges,
          [FORM_TITLES.products]: saleToEdit.products,
        };

        fields = fields.map((field) => {
          const chargeValue = fieldMapValue[field.title];

          return chargeValue ? { ...field, value: chargeValue } : field;
        });
      }

      console.log("fields", fields);

      handleModalContent(
        true,
        <FormModal title={`${!isEdit ? "Criar" : "Editar"} Venda`}>
          <Form
            fields={fields}
            onSubmit={(data) => onSubmitForm(data, saleToEdit?.id)}
          />
        </FormModal>,
      );
    },
    [saleFormField],
  );

  const requestSales = async () => {
    try {
      setIsLoading(true);
      const result = await getAllSales();

      if (result.isSuccess) {
        setSales(result.value);
      }
    } catch (error) {
      // Trate o erro conforme necessário
      console.error("Erro ao buscar dados de vendas:", error);
    } finally {
      setIsLoading(false);
      setFetchSales(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (fetchSales) {
        await requestSales();

        try {
          const charges = await getAllCharges();
          const products = await getAllProducts();

          //TODO: adaptar estrutura para receber o nome dos produtos e encargos também
          setSaleFormField((current) =>
            current.map((current) => ({
              ...current,
              options:
                current.title === FORM_TITLES.products
                  ? products.value.map(
                      ({ id, name }) => ({ id, value: name }) as SelectOption,
                    )
                  : charges.value.map(
                      ({ id, name }) => ({ id, value: name }) as SelectOption,
                    ),
            })),
          );
        } catch (error) {
          console.error("Erro ao buscar dados de produtos ou encargos:", error);
        }
      }
    })();
  }, [fetchSales]);

  return (
    <>
      <TabPageStyle.Header>
        <IconButton
          isCompressed={false}
          onClick={() => openModal(false)}
          text="Cadastrar Venda"
          leftIcon={<Plus size={20} />}
        />

        <SearchField
          label="Buscar vendas por código"
          value={searchInput}
          setValue={setSearchInput}
          fetchData={handleFetchSearchInput}
        />
      </TabPageStyle.Header>

      <TabPageStyle.Body>
        <Table
          variant="sales"
          data={sales}
          isLoading={isLoading}
          onDeleteCell={(props) => onDeleteSale(props.id)}
          onEditCell={(props) => openModal(true, props)}
        />
        {/* <Table
          variant="sales"
          data={sales}
          isLoading={isLoading}
          onDeleteCell={(props) => onDeleteProduct(props.id)}
          onEditCell={(props) => openModal(true, props)}
        /> */}
      </TabPageStyle.Body>
    </>
  );
};

export default Sales;

// TODO: Componentizar a pagina de tabela:
/**
 *Passar como props:
 * # pageName: string
 *    - Usado para labels que contenham o nome da pagina.
 *      EX: Cadastrar <Entity>
 *          Pesquisar <Entity> por código.
 *
 *    -
 *
 */
