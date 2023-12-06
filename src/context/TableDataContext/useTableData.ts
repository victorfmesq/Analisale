import { useContext } from "react";
import { TableDataContextProps } from "./types";
import { TableDataContext } from ".";

const useTableData = () => <TableDataContextProps>useContext(TableDataContext);

export default useTableData;
