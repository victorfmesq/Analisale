declare namespace Product {
  export interface Entity extends BaseEntity.default {
    amount: number;
    name: string;
    price: number;
    salePurchase: number;
    type: number;
    updatedAt: Date;
    createdAt: Date;
  }

  export interface Payload {
    amount: number;
    name: string;
    price: number;
    salePurchase: number;
    type: number;
  }
}
