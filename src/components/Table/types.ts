import { GridColDef } from "@mui/x-data-grid";

export type ProductFields = {
  id: string;
  name: string;
  type: string;
  salePrice: number;
  purchasePrice: number;
  amount: number;
  description: string;
};

export type SaleFields = {
  id: string;
  date: Date;
  value: number;
  products: {
    id: number;
    name: string;
    amount: number;
  }[];
  charges: {
    id: number;
    name: string;
    value: number;
  }[];
};

export type ChargeFields = {
  id: string;
  name: string;
  value: number;
  type: string;
  description: string;
};

export type TableColumnTypes = {
  product: GridColDef[];
  chages: GridColDef[];
  sales: GridColDef[];
};

export type VariantTable = "charges" | "products" | "sales";
export type DataTable = Sale.Entity[] | Sale.Entity[] | Charge.Entity[];
