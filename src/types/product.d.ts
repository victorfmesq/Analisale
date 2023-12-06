declare namespace Product {
  export interface Entity extends BaseEntity.default {
    amount: number;
    name: string;
    saleValue: number;
    purchaseValue: number;
    updatedAt: Date;
    createdAt: Date;
  }

  export interface Payload {
    amount: number;
    name: string;
    saleValue: number;
    purchaseValue: number;
  }
}
