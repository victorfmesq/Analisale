import { Plus } from "@styled-icons/bootstrap";

import IconButton from "../../components/common/Button";
import * as TabPageStyle from "../../components/Pages/TabPage/styles";
import Table from "../../components/Table";

const Products = () => {
  return (
    <>
      <TabPageStyle.Header>
        <IconButton
          isCompressed={false}
          onClick={() => console.log("Cadastrar produto")}
          text="Cadastrar Produto"
          leftIcon={<Plus size={20} />}
        />
      </TabPageStyle.Header>

      <TabPageStyle.Body>
        <Table variant="products"></Table>
      </TabPageStyle.Body>
    </>
  );
};

export default Products;
