import { Product } from '../../../redux/products/types';
export interface PlainTableProps {
  tableHeads: { name: string; rightAlign?: boolean }[];
  count: number;
  rows: BatchesRow | BatchProductsRow | StockOrdersRow;
  hasDataToShow: boolean;
  noDataMessage?: string;
  page: number;
  rowsPerPage: number;
  handleChangeRowsPerPage: ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePage: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => void;
  selectedRow?: BatchProduct;
  itemCount?: number;
  completedBatch?: boolean;
}
export interface Batch {
  id: number;
  status: string;
  started: string;
  finished: string | null;
  name: string;
  category: string;
  brand: string;
}

export interface BatchProduct {
  id: number;
  sku: string;
  barcode: string;
  name: string;
  variation: string;
  expected: number;
  counted: number | null;
  synced: boolean;
}

export interface StockOrders {
  id: number;
  createdAt: string;
  products: Product[];
  totalQty: number;
  totalPrice: number;
}

interface BatchesRow {
  type: string;
  batches: Batch[];
}

interface BatchProductsRow {
  type: string;
  batchProducts: BatchProduct[];
}

interface StockOrdersRow {
  type: string;
  stockOrders: StockOrders[];
}

export interface PaginationLabel {
  from: number;
  to: number;
  count: number;
}
