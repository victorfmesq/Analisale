import React, { FC, useMemo, useState, createContext, useEffect } from "react";
import { TableDataProviderProps } from "./types";

interface TableDataContextProps {
  sales: Sale.Entity[];
  charges: Charge.Entity[];
  products: Product.Entity[];
  updateSales: (newSales: Sale.Entity[]) => void;
  updateCharges: (newCharges: Charge.Entity[]) => void;
  updateProducts: (newProducts: Product.Entity[]) => void;
}

export const TableDataContext = createContext<
  TableDataContextProps | undefined
>(undefined);

export const TableDataProvider: FC<TableDataProviderProps> = ({ children }) => {
  const [sales, setSales] = useState<Sale.Entity[]>([]);
  const [charges, setCharges] = useState<Charge.Entity[]>([]);
  const [products, setProducts] = useState<Product.Entity[]>([]);

  const updateSales = (newSales: Sale.Entity[]) => {
    setSales(newSales);
  };

  const updateCharges = (newCharges: Charge.Entity[]) => {
    setCharges(newCharges);
  };

  const updateProducts = (newProducts: Product.Entity[]) => {
    setProducts(newProducts);
  };

  const value = useMemo(
    () => ({
      sales,
      charges,
      products,
      updateSales,
      updateCharges,
      updateProducts,
    }),
    [sales, charges, products, updateSales, updateCharges, updateProducts],
  );

  return (
    <TableDataContext.Provider value={value}>
      {children}
    </TableDataContext.Provider>
  );
};
