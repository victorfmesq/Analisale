import { Plus } from "@styled-icons/bootstrap";

import IconButton from "../../components/common/Button";
import * as TabPageStyle from "../../components/Pages/TabPage/styles";
import Table from "../../components/Table";
import React, { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../../services/Products";
import FormModal from "../../components/FormModal";
import Form from "../../components/common/Form";
import {
  FORM_FIELD_TYPES,
  FormData,
  FormField,
} from "../../components/common/Form/types";
import useModal from "../../context/ModalContext/useModal";
import SearchField from "../../components/common/SearchField";
import isNullOrUndefinedOrEmpty from "../../utils/isNullOrUndefinedOrEmpty";
import { ToastContainer, toast, Zoom } from "react-toastify";
import renderToast from "../../utils/renderToast";
import { GridRowParams } from "@mui/x-data-grid";

const FORM_TITLES = {
  name: "Nome",
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
    title: FORM_TITLES.amount,
    type: FORM_FIELD_TYPES.maskedNumber,
    value: "",
  },
  {
    title: FORM_TITLES.price,
    type: FORM_FIELD_TYPES.maskedNumber,
    value: "",
  },
  {
    title: FORM_TITLES.purchase,
    type: FORM_FIELD_TYPES.maskedNumber,
    value: "",
  },
];

const Products = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchProducts, setFetchProducts] = useState<boolean>(true);
  const [products, setProducts] = useState<Product.Entity[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const { handleModalContent } = useModal();

  useEffect(() => {
    (async () => {
      if (fetchProducts) {
        setIsLoading(true);
        const result = await getAllProducts();

        if (result.isSuccess) setProducts(result.value);

        setIsLoading(false);
        setFetchProducts(false);
      }
    })();
  }, [fetchProducts]);

  // TODO: adaptar para edição tbm
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
    if (isNotValidForm || formKeys.length < PRODUCT_FORM_FIELDS.length) {
      console.log("formulário inválido");
      return;
    }

    let formObj: Product.Payload = {
      name: formData[FORM_TITLES.name].toString(),
      amount: Number(formData[FORM_TITLES.amount]),
      saleValue: Number(formData[FORM_TITLES.price]),
      purchaseValue: Number(formData[FORM_TITLES.purchase]),
    };

    if (entityId) await updateProduct(entityId, formObj);
    else await createProduct(formObj);

    handleModalContent(false);

    setFetchProducts(true);
  };

  const onDeleteProduct = async (productId: string) => {
    await deleteProduct(productId);

    setFetchProducts(true);
  };

  const handleFetchSearchInput = async (value: string) => {
    if (isNullOrUndefinedOrEmpty(value)) {
      setFetchProducts(true);
      return;
    }

    setIsLoading((current) => !current);

    const result = await getProductById(value);

    if (result.isSuccess) setProducts([result.value]);
    else {
      setProducts([]);
      renderToast(result?.message);
    }

    setIsLoading((current) => !current);
  };

  const openModal = (
    isEdit: boolean,
    productToEdit?: GridRowParams<Product.Entity>,
  ) => {
    let fields: FormField[] = PRODUCT_FORM_FIELDS;

    console.log(productToEdit);

    if (isEdit && productToEdit) {
      console.log(productToEdit);
      const fieldMapValue = {
        [FORM_TITLES.name]: productToEdit.name,
        [FORM_TITLES.amount]: productToEdit.amount,
        [FORM_TITLES.price]: productToEdit.saleValue,
        [FORM_TITLES.purchase]: productToEdit.purchaseValue,
      };

      fields = fields.map((field) => {
        const productValue = fieldMapValue[field.title];

        return productValue ? { ...field, value: productValue } : field;
      });
    }

    handleModalContent(
      true,
      <FormModal title={`${!isEdit ? "Criar" : "Editar"} Produto`}>
        <Form
          fields={fields}
          onSubmit={(data) => onSubmitForm(data, productToEdit?.id)}
        />
      </FormModal>,
    );
  };

  return (
    <>
      {/* TODO: componentizar header */}
      <TabPageStyle.Header>
        <IconButton
          isCompressed={false}
          onClick={() => openModal(false)}
          text="Cadastrar Produto"
          leftIcon={<Plus size={20} />}
        />

        <SearchField
          label="Buscar produtos por código"
          value={searchInput}
          setValue={setSearchInput}
          fetchData={handleFetchSearchInput}
        ></SearchField>
      </TabPageStyle.Header>
      <TabPageStyle.Body>
        <Table
          variant="products"
          data={products}
          isLoading={isLoading}
          onDeleteCell={(props) => onDeleteProduct(props.id)}
          onEditCell={(props) => openModal(true, props)}
        />
      </TabPageStyle.Body>
      <ToastContainer
        style={{
          position: "fixed",
          bottom: 50,
          right: "50%",
        }}
        position="bottom-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Zoom}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Products;
