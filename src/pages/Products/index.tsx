import { Plus } from "@styled-icons/bootstrap";

import IconButton from "../../components/common/Button";
import * as TabPageStyle from "../../components/Pages/TabPage/styles";
import Table from "../../components/Table";
import React, { useEffect, useState } from "react";
import { createProduct, getAllProducts } from "../../services/Products";
import FormModal from "../../components/FormModal";
import Form from "../../components/common/Form";
import {
  FORM_FIELD_TYPES,
  FormData,
  FormField,
} from "../../components/common/Form/types";
import useModal from "../../context/ModalContext/useModal";

const FORM_TITLES = {
  name: "Nome",
  type: "Tipo",
  amount: "Estoque",
  price: "Preço de Venda",
  purchase: "Valor de Compra",
} as const;

const PRODUCT_FORM_FIELDS: FormField[] = [
  {
    title: FORM_TITLES.name,
    type: FORM_FIELD_TYPES.text,
    value: "",
  },
  {
    title: FORM_TITLES.type,
    type: FORM_FIELD_TYPES.number,
    value: Number(""),
  },
  {
    title: FORM_TITLES.amount,
    type: FORM_FIELD_TYPES.number,
    value: Number(""),
  },
  {
    title: FORM_TITLES.price,
    type: FORM_FIELD_TYPES.number,
    value: Number(""),
  },
  {
    title: FORM_TITLES.purchase,
    type: FORM_FIELD_TYPES.number,
    value: Number(""),
  },
];

const Products = () => {
  const [isFetchingProducts, setIsFetchingProducts] = useState<boolean>(true);
  const [products, setProducts] = useState<Product.Entity[]>([]);

  const { handleModalContent } = useModal();

  useEffect(() => {
    (async () => {
      if (isFetchingProducts) {
        const result = await getAllProducts();

        if (result.isSuccess) setProducts(result.value);

        setIsFetchingProducts(false);
      }
    })();
  }, [isFetchingProducts]);

  const onSubmitForm = async (formData: FormData) => {
    console.log(formData);

    const formKeys = Object.keys(formData);

    // TODO: send validations on rules at FormField[]
    const isNotValidForm = formKeys.some(
      (key) =>
        formData[key] === "" ||
        formData[key] === null ||
        formData[key] === undefined ||
        Number.isNaN(formData[key]),
    );

    // TODO: mlhorar essas validações
    if (isNotValidForm || formKeys.length < PRODUCT_FORM_FIELDS.length) {
      console.log("formulário inválido");
      return;
    }

    let formObj: Product.Payload = {
      name: formData[FORM_TITLES.name].toString(),
      amount: Number(formData[FORM_TITLES.amount]),
      price: Number(formData[FORM_TITLES.price]),
      salePurchase: Number(formData[FORM_TITLES.purchase]),
      type: Number(formData[FORM_TITLES.type]),
    };

    await createProduct(formObj);

    handleModalContent(false);

    setIsFetchingProducts(true);
  };

  const openModal = () => {
    // TODO: create variant to edit too
    handleModalContent(
      true,
      <FormModal title="Criar Produto">
        <Form
          fields={PRODUCT_FORM_FIELDS}
          onSubmit={(data) => onSubmitForm(data)}
        />
      </FormModal>,
    );
  };

  return (
    <>
      <TabPageStyle.Header>
        <IconButton
          isCompressed={false}
          onClick={openModal}
          text="Cadastrar Produto"
          leftIcon={<Plus size={20} />}
        />
      </TabPageStyle.Header>

      <TabPageStyle.Body>
        <Table
          variant="products"
          data={products}
          isLoading={isFetchingProducts}
        ></Table>
      </TabPageStyle.Body>
    </>
  );
};

export default Products;
