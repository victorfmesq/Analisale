declare namespace Sale {
  export interface Entity extends BaseEntity.default {
    productName: string;
    quantity: number;
    totalPrice: number;
  }
}
