interface Product {
  id: number;
  sku: string;
  barcode: string;
  name: string;
  variation: string;
  expected: number;
  counted: boolean | null;
  synced: boolean;
}

export interface BatchesProductsData {
  counted: number;
  uncounted: number;
  products: Product[];
}

export interface BatchData {
  id: number;
  status: string;
  started: string;
  finished: string | null;
  name: string;
  category: string;
  brand: string;
}

interface SelectedRow {
  [id: string]: boolean;
}

type CountInputRef = React.MutableRefObject<HTMLInputElement>;
export interface CountingActionsBarProps {
  batchId: string;
  countBatch: BatchData;
  batchProducts: BatchesProductsData;
  selectedRow: SelectedRow;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  countInputRef: CountInputRef;
}
export interface CountBatchesProductsTableProps {
  batchProducts: BatchesProductsData;
  page: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => void;
  rowsPerPage: number;
  handleChangeRowsPerPage: ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => void;
  selectedRow: SelectedRow;
  handleSelectedRow: (id: number) => void;
  handleQueryChange: (query: string) => void;
  countInputRef: CountInputRef;
}
