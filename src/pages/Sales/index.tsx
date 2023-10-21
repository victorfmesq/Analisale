import { Plus } from "@styled-icons/bootstrap";

import IconButton from "../../components/common/Button";
import * as TabPageStyle from "../../components/Pages/TabPage/styles";
import Table from "../../components/Table";

const Sales = () => {
  return (
    <>
      <TabPageStyle.Header>
        <IconButton
          isCompressed={false}
          onClick={() => console.log("Cadastrar Venda")}
          text="Cadastrar Venda"
          leftIcon={<Plus size={20} />}
        />
      </TabPageStyle.Header>

      <TabPageStyle.Body>
        <Table variant="sales"></Table>
      </TabPageStyle.Body>
    </>
  );
};

export default Sales;
