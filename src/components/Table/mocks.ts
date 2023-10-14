import { ProductFields, ChargeFields, SaleFields } from "./types";

export const productRows: ProductFields[] = [
  {
    id: 1,
    name: "Água - 500ml",
    type: "Bebida",
    salePrice: 5,
    purchasePrice: 3,
    amount: 10,
    description: "Garrafinha de 500ml de água",
  },
  {
    id: 2,
    name: "Coca-cola - Lata",
    type: "Bebida",
    salePrice: 5,
    purchasePrice: 3,
    amount: 10,
    description: "Latinha de 350ml de coca-cola",
  },
  {
    id: 3,
    name: "Água - 1L",
    type: "Bebida",
    salePrice: 5,
    purchasePrice: 3,
    amount: 10,
    description: "Garrafa de 1L de água",
  },
  {
    id: 4,
    name: "Fanta Uva - Lata",
    type: "Bebida",
    salePrice: 5,
    purchasePrice: 3,
    amount: 10,
    description: "Latinha de 350ml de fanta uva",
  },
  {
    id: 5,
    name: "Arroz Branco - KG",
    type: "Alimento",
    salePrice: 5,
    purchasePrice: 3,
    amount: 10,
    description: "Saco de 1KG de arroz branco",
  },
];

export const saleRows: SaleFields[] = [
  {
    id: 1,
    date: new Date(),
    value: 100,
    charges: [{ id: 1, name: "taxa", value: 30 }],
    products: [{ id: 1, name: "Agua de coco", amount: 3 }],
  },
  {
    id: 2,
    date: new Date(),
    value: 200,
    charges: [{ id: 2, name: "taxa2", value: 5 }],
    products: [{ id: 4, name: "Pão de Mel", amount: 1 }],
  },
  {
    id: 3,
    date: new Date(),
    value: 300,
    charges: [{ id: 3, name: "taxa3", value: 10 }],
    products: [{ id: 7, name: "vassoura", amount: 2 }],
  },
  {
    id: 4,
    date: new Date(),
    value: 400,
    charges: [{ id: 5, name: "desconto", value: 10 }],
    products: [{ id: 3, name: "Filá de Peixe Congelado", amount: 3 }],
  },
  {
    id: 5,
    date: new Date(),
    value: 500,
    charges: [{ id: 1, name: "taxa", value: 30 }],
    products: [{ id: 6, name: "sabão", amount: 3 }],
  },
];

export const chargeRows: ChargeFields[] = [
  {
    id: 1,
    name: "Imposto sobre blablabla",
    type: "Taxa",
    value: 10,
    description: "Descrição bla bla",
  },
  {
    id: 2,
    name: "Desconto sob valor total",
    type: "Desconto",
    value: 5,
    description: "Desconto de bla bla",
  },
];
