import { Product } from '../../../redux/products/types';
import { Sale } from '../../../redux/sales/types';
import { fetchSales } from '../../../redux/sales/salesActions';

interface TableHeads {
  label: string;
  numeric?: boolean;
}
export interface UseTableStateProps {
  tableType: string;
  fetchSales?: (
    page: number,
    rowsPerPage: number,
    startDate?: Date,
    endDate?: Date
  ) => void;
  fetchProducts?: (page: number, rowsPerPage: number) => void;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface SalesRow {
  type: string;
  sales: Sale[];
}

interface ProductsRow {
  type: string;
  products: Product[];
}
export interface TableProps extends UseTableStateProps {
  tableHeads: TableHeads[];
  rows: SalesRow | ProductsRow;
  count: number;
  page: number;
  component: React.JSXElementConstructor<any>;
}
