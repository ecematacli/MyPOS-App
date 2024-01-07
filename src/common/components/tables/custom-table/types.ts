import { Product } from '../../../../redux/products/types';
import { Sale } from '../../../../redux/sales/types';

interface TableHeads {
  label: string;
  numeric?: boolean;
}

interface SalesRow {
  type: string;
  sales: Sale[];
}

interface ProductsRow {
  type: string;
  products: Product[];
}

export interface TableProps {
  tableHeads: TableHeads[];
  rows: SalesRow | ProductsRow;
  tableType: string;
  noPagination?: boolean;
  rowsPerPage?: number;
  page?: number;
  count?: number;
  handleChangePage?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => void;
  handleChangeRowsPerPage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  component?: React.JSXElementConstructor<any>;
}

export interface PaginationLabel {
  from: number;
  to: number;
  count: number;
}
