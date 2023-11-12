declare namespace Sale {
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
    productName: string;
    quantity: 1;
    totalPrice: 20;
    productId: [1, 2];
    amount: number;
    name: string;
    price: number;
    salePurchase: number;
    type: number;
  }
}
