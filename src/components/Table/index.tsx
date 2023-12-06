import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";

import * as S from "./styles";
import React, { FC, useCallback, useState } from "react";
import { chargeRows, productRows, saleRows } from "./mocks";
import {
  ChargeFields,
  DataTable,
  ProductFields,
  SaleFields,
  TableColumnTypes,
  VariantTable,
} from "./types";
import isNullOrUndefinedOrEmpty from "../../utils/isNullOrUndefinedOrEmpty";
import ActionButtons from "./ActionButtons";
import CellList from "./CellList";

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
    width: 200,
  },
];

const saleColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "products",
    headerName: "Produtos",
    width: 250,
    renderCell: (params) => {
      const productsArray = params.row.products;

      return <CellList items={productsArray} />;
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
    width: 250,
    renderCell: (params) => {
      const chargesArray = params.row.charges;
      return <CellList items={chargesArray} />;
    },
  },
  {
    field: "amount",
    headerName: "Quantidade de Produtos",
    description: "This column has a value getter and is not sortable.", // tooltip quando hover no header
    align: "center",
    sortable: true,
    width: 220,
    renderCell: ({ row }) => {
      const { products } = row;
      return (
        <div>
          {(products as Array<any>).reduce(
            (prev, curr) => prev + (curr.amount || 0),
            0,
          )}
        </div>
      );
    },
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
      };
    }) as unknown as ProductFields[];
  else if (variant === "charges")
    return (data as Charge.Entity[]).map((charge) => {
      const { id, name, type, value } = charge;
      return {
        id,
        name,
        type,
        value,
      };
    });

  return data
    ? (data as Sale.Entity[]).map((charge) => {
        const { id, charges, products, totalPrice, updatedAt } = charge;
        return {
          id,
          charges,
          products,
          value: totalPrice,
          date: new Date(updatedAt),
        };
      })
    : [];
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
                  enableDelete
                  enableEdit={variant !== "sales"}
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
