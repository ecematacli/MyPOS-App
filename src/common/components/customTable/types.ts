import { Product } from '../../../redux/products/types';
import { Sale } from '../../../redux/sales/types';

interface TableHeads {
  label: string;
  numeric?: boolean;
}

type Rows = Product[] | Sale[];

export interface StateProps {
  tableType: string;
  fetchSales?: (page: number, rowsPerPage: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (value: string) => void;
  setPage: (page: number) => void;
  fetchProducts?: (page: number, rowsPerPage: number) => void;
}

export interface Props extends StateProps {
  tableHeads: TableHeads[];
  rows: Rows;
  tableType: string;
  count: number;
  page: number;
  component: React.JSXElementConstructor<any>;
}
