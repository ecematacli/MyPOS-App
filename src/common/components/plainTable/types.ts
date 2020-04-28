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
  counted: boolean | null;
  synced: boolean;
}

interface BatchesRow {
  type: string;
  batches: Batch[];
}

interface BatchProductsRow {
  type: string;
  batchProducts: BatchProduct[];
}

export interface PlainTableProps {
  tableHeads: { name: string; rightAlign?: boolean }[];
  count: number;
  rows: BatchesRow | BatchProductsRow;
  noDataMessage?: string;
  page: number;
  rowsPerPage: number;
  handleChangeRowsPerPage: ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => void;
}

export interface PaginationLabel {
  from: number;
  to: number;
  count: number;
}
