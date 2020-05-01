import { RouteComponentProps } from 'react-router-dom';

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

export interface BatchesProductsData {
  counted: number;
  uncounted: number;
  products: BatchProduct[];
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

type CountInputRef = React.MutableRefObject<HTMLInputElement>;

//Props of the components
interface RouterMatchProps {
  id: string;
}

export interface InventoryCountDetailsProps
  extends RouteComponentProps<RouterMatchProps> {}
export interface CountingActionsBarProps {
  batchId: string;
  countBatch: BatchData;
  batchProducts: BatchesProductsData;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  countInputRef: CountInputRef;
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
  handleCountClick: () => void;
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
  selectedProductRow: BatchProduct;
  handleSelectedRow: (product: BatchProduct) => void;
  countInputRef: CountInputRef;
}

export interface LastCountedItemsProps {
  lastCountedItems: BatchProduct[];
  handleLastCountedItemDeleteClick: (id: number) => void;
}
