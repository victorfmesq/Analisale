import { Plus } from "@styled-icons/bootstrap";

import IconButton from "../../components/Button";
import * as TabPageStyle from "../../components/Pages/TabPage/styles";
import Table from "../../components/Table";

const Charges = () => {
  return (
    <>
      <TabPageStyle.Header>
        <IconButton
          isCompressed={false}
          onClick={() => console.log("Cadastrar Encargo")}
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
