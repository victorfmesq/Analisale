import { Plus } from "@styled-icons/bootstrap";
import React, { useEffect, useState } from "react";

import IconButton from "../../components/common/Button";
import * as TabPageStyle from "../../components/Pages/TabPage/styles";
import Table from "../../components/Table";
import useModal from "../../context/ModalContext/useModal";

const Sales = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchSales, setFetchSales] = useState<boolean>(true);
  const [sales, setSales] = useState<Sale.Entity[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const { handleModalContent } = useModal();

  useEffect(() => {
    (async () => {
      if (fetchSales) {
        setIsLoading(true);
        // const result = await getAllProducts();

        if (result.isSuccess) setSales(result.value);

        setIsLoading(false);
        setFetchSales(false);
      }
    })();
  }, [fetchSales]);

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
        <Table
          variant="sales"
          data={sales}
          isLoading={isLoading}
          onDeleteCell={(props) => onDeleteProduct(props.id)}
          onEditCell={(props) => openModal(true, props)}
        />
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
