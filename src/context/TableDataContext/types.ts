export interface TableDataProviderProps {
  children: React.ReactNode;
}

export interface TableDataContextProps {
  charges: Charge.Entity[];
  products: Product.Entity[];
  sales: Sale.Entity[];
  updateProducts: (newProducts: Product.Entity[]) => void;
  updateCharges: (newCharges: Charge.Entity[]) => void;
  updateSales: (newSales: Sale.Entity[]) => void;
}
