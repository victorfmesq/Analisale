import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import * as S from "./styles";
import React, { FC, useCallback, useState } from "react";
import { chargeRows, productRows, saleRows } from "./mocks";
import {
  ChargeFields,
  DataTable,
  ProductFields,
  TableColumnTypes,
  VariantTable,
} from "./types";
import isNullOrUndefinedOrEmpty from "../../utils/isNullOrUndefinedOrEmpty";
import ActionButtons from "./ActionButtons";

const productColumns: GridColDef[] = [
  { field: "id", headerName: "Código", width: 90 },
  {
    field: "name",
    headerName: "Nome",
    description: "Nome dos produtos",
    width: 150,
  },
  {
    field: "saleValue",
    headerName: "Preço de Venda",
    type: "number",
    sortable: true,
    width: 150,
  },
  {
    field: "purchaseValue",
    headerName: "Preço de Compra",
    type: "number",
    width: 150,
    sortable: true,
  },
  {
    field: "amount",
    headerName: "Quantidade Disponível",
    type: "number",
    sortable: true,
    width: 150,
  },
  {
    field: "description",
    headerName: "Descrição",
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

// TODO: receber description do servidor
const getTableRows = (variant: VariantTable, data: DataTable) => {
  if (variant === "products")
    return (data as Product.Entity[]).map((product) => {
      const { amount, id, name, purchaseValue, saleValue } = product;

      return {
        amount,
        name,
        id,
        purchaseValue,
        saleValue,
        description: "descrição (MOCK)",
      };
    }) as unknown as ProductFields[];

  const chargeRows: ChargeFields[] = (data as Charge.Entity[]).map((charge) => {
    const { id, name, type, value } = charge;

    return {
      id,
      name,
      type,
      value,
      description: "descrição (MOCK)",
    };
  });

  return variant === "charges" ? chargeRows : saleRows;
};

interface TableProps {
  variant: VariantTable;
  data: DataTable;
  isLoading: boolean;
  onEditCell: (row: GridRowParams) => void;
  onDeleteCell: (row: GridRowParams) => void;
}

const Table: FC<TableProps> = ({
  variant,
  data,
  isLoading,
  onDeleteCell,
  onEditCell,
}) => {
  const tableRows = getTableRows(variant, data);
  const variantColumns = getVariantColumns(variant);

  return (
    <S.Container>
      {isNullOrUndefinedOrEmpty(data) ? (
        <b style={{ fontSize: "1.5rem" }}>Nenhum item encontrado</b>
      ) : (
        <DataGrid
          rows={tableRows}
          columns={[
            ...variantColumns,
            {
              field: "actions",
              headerName: "Ações",
              sortable: false,
              width: 140,
              renderCell: (params: GridCellParams) => (
                <ActionButtons
                  onDelete={() => onDeleteCell(params.row)}
                  onEdit={() => onEditCell(params.row)}
                />
              ),
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          loading={isLoading}
        />
      )}
    </S.Container>
  );
};

export default Table;
