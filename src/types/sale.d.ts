declare namespace Sale {
  type SaleProduct = {
    id: string;
    amount: number;
  };
  export interface Entity extends BaseEntity.default {
    products: SaleProduct[];
    charges: string[];
    totalPrice: number;
    updatedAt: Date;
    createdAt: Date;
  }

  export interface Payload {
    products: SaleProduct[];
    charges: string[];
  }
}
