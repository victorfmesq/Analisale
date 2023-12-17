declare namespace Charge {
  export enum ChargeTypes {
    Tax,
    Discount,
  }
  export interface Entity extends BaseEntity.default {
    name: string;
    type: ChargeTypes;
    value: number;
  }

  export interface Payload {
    name: string;
    type: ChargeTypes;
    value: number;
  }
}
id: uuidv4(), name, type, value;
