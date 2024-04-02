import { createContext, useContext } from "react";

export interface TableContextType {
  loading: boolean;
  data: any[];
  setElementsPerPage: React.Dispatch<React.SetStateAction<number>>;
  elementsPerPage: number;
}
export const TableContext = createContext<TableContextType | undefined>(
  undefined
);

export function useTableContext() {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error(
      "useTableContext must be used within a TableContextProvider"
    );
  }
  return context;
}
