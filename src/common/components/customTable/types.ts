import { Product } from '../../../redux/products/types';
import { Sale } from '../../../redux/sales/types';

interface TableHeads {
  label: string;
  numeric?: boolean;
}
export interface UseTableStateProps {
  tableType: string;
  fetchSales?: (page: number, rowsPerPage: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (value: string) => void;
  setPage: (page: number) => void;
  fetchProducts?: (page: number, rowsPerPage: number) => void;
}

export interface TableProps extends UseTableStateProps {
  tableHeads: TableHeads[];
  rows: any;
  tableType: string;
  count: number;
  page: number;
  component: React.JSXElementConstructor<any>;
}

export interface ProductsRow {}
