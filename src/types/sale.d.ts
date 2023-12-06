export type SaleProduct = {
  id: string;
  amount: number;
};

declare namespace Sale {
  export interface Entity extends BaseEntity.default {
    name: string;
    products: SaleProduct[];
    charges: string[];
    updatedAt: Date;
    createdAt: Date;
  }

  export interface Payload {
    name: string;
    products: SaleProduct[];
    charges: string[];
  }
}
