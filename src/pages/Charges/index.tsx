import { Plus } from "@styled-icons/bootstrap";

import IconButton from "../../components/common/Button";
import * as TabPageStyle from "../../components/Pages/TabPage/styles";
import Table from "../../components/Table";
import useModal from "../../context/ModalContext/useModal";
import Form from "../../components/common/Form";
import FormModal from "../../components/FormModal";

const MOCK_FORM_FIELDS = [
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
  const { handleModalContent } = useModal();

  const openModal = () => {
    handleModalContent(
      true,
      <FormModal title="Criar Encargo">
        <Form
          fields={MOCK_FORM_FIELDS}
          onSubmit={() => console.log("Submeter Formulário")}
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
