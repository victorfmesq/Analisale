import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import * as S from "./styles";
import { FC } from "react";
import { chargeRows, productRows, saleRows } from "./mocks";
import { TableColumnTypes, VariantTable } from "./types";

const productColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Nome",
    width: 150,
  },
  {
    field: "type",
    headerName: "Tipo",
    width: 90,
  },
  {
    field: "salePrice",
    headerName: "Preço de Venda",
    type: "number",
    sortable: true,
    width: 90,
  },
  {
    field: "purchasePrice",
    headerName: "Preço de Compra",
    type: "number",
    width: 90,
    sortable: true,
  },
  {
    field: "amount",
    headerName: "Quantidade Disponível",
    description: "This column has a value getter and is not sortable.", // tooltip quando hover no header
    sortable: true,
    width: 90,
  },
  {
    field: "description",
    headerName: "Descrição",
    description: "This column has a value getter and is not sortable.", // tooltip quando hover no header
    width: 300,
  },
];

const saleColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "products",
    headerName: "Produtos",
    width: 250,
    renderCell: (params) => {
      const productsArray = params.row.products; // Assuma que "products" é um array na sua fonte de dados
      // Renderize os valores do array da maneira que você deseja
      // const productNames = productsArray
      //   .map((product) => product.name)
      //   .join(", ");
      // return <div>{productNames}</div>;

      // Posso agrupar Produto por quantidade e mostrar lado à lado
      return <div>Div Mocada! - Products</div>;
    },
  },
  {
    field: "date",
    headerName: "Data",
    type: "date",
    width: 150,
  },
  {
    field: "value",
    headerName: "Valor da Venda",
    width: 150,
  },
  {
    field: "charges",
    headerName: "Encargos",
    width: 90,
    renderCell: (params) => {
      const productsArray = params.row.charges; // Assuma que "charges" é um array na sua fonte de dados
      // Renderize os valores do array da maneira que você deseja
      // const chargeNames = chargesArray
      //   .map((product) => product.name)
      //   .join(", ");
      // return <div>{productNames}</div>;

      // Posso agrupar Produto por quantidade e mostrar lado à lado
      return <div>Div Mocada! - Charges</div>;
    },
  },
  {
    field: "amount",
    headerName: "Quantidade de Produtos",
    description: "This column has a value getter and is not sortable.", // tooltip quando hover no header
    sortable: true,
    width: 90,
    // valueGetter: (params: GridValueGetterParams) =>                 usar prop p buscar em products a soma de todas as unidades
    //   `${params.row.products || ""} ${params.row.products || ""}`,
  },
];

const chargeColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Nome",
    width: 250,
  },
  {
    field: "value",
    headerName: "Valor",
    type: "number",
    width: 150,
  },
  {
    field: "type",
    headerName: "Tipo",
    width: 100,
  },
  {
    field: "description",
    headerName: "Descrição",
    width: 300,
  },
];

const TABLE_COLUMN_TYPES: TableColumnTypes = {
  chages: chargeColumns,
  product: productColumns,
  sales: saleColumns,
};

const getVariantColumns = (variant: VariantTable) => {
  if (variant === "charges") return TABLE_COLUMN_TYPES.chages;

  return variant === "products"
    ? TABLE_COLUMN_TYPES.product
    : TABLE_COLUMN_TYPES.sales;
};

const getVariantRows = (variant: VariantTable) => {
  if (variant === "charges") return chargeRows;

  return variant === "products" ? productRows : saleRows;
};

interface TableProps {
  variant: VariantTable;
}

const Table: FC<TableProps> = ({ variant }) => {
  return (
    <S.Container>
      <DataGrid
        rows={getVariantRows(variant)}
        columns={getVariantColumns(variant)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </S.Container>
  );
};

export default Table;
