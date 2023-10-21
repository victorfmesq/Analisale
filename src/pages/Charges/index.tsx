import { Plus } from "@styled-icons/bootstrap";

import IconButton from "../../components/Button";
import * as TabPageStyle from "../../components/Pages/TabPage/styles";
import Table from "../../components/Table";
import { useState } from "react";
import useModal from "../../context/ModalContext/useModal";
import Form from "../../components/Form";

const MOCK_FORM_FIELDS: Field[] = [
  {
    title: "Name",
    type: "text",
    value: "",
  },
  {
    title: "Country",
    type: "select",
    value: "USA",
    options: ["USA", "Canada", "UK", "Australia"],
  },
  {
    title: "Age",
    type: "number",
    value: 25,
  },
  {
    title: "Birthdate",
    type: "date",
    value: new Date(),
  },
];

const Charges = () => {
  const [isOpenModal, setisOpenModal] = useState<boolean>(false);

  const { handleModalContent } = useModal();

  const openModal = () => {
    handleModalContent(
      true,
      <Form
        fields={MOCK_FORM_FIELDS}
        onSubmit={() => console.log("Submeter Formulário")}
      />,
    );
  };

  return (
    <>
      <TabPageStyle.Header>
        <IconButton
          isCompressed={false}
          onClick={openModal}
          text="Cadastrar Encargo"
          leftIcon={<Plus size={20} />}
        />
      </TabPageStyle.Header>

      <TabPageStyle.Body>
        <Table variant="charges"></Table>
      </TabPageStyle.Body>
    </>
  );
};

export default Charges;
