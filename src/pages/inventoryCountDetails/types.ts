import { Dispatch, SetStateAction } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface BatchProduct {
  id: number;
  sku: string;
  barcode: string;
  name: string;
  variation: string;
  expected: number;
  counted: number | null;
  updatedAt: string;
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
  batch: BatchData;
  batchProducts: BatchesProductsData;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  onProductSelect: (product: BatchProduct) => void;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleQueryChange: (productName: string) => void;
  searchResults: BatchProduct[];
  setSearchResults: React.Dispatch<React.SetStateAction<BatchProduct[]>>;
  productNotFound: boolean;
  countInputRef: CountInputRef;
  itemCount: number;
  selectedProduct: BatchProduct;
  setSelectedProduct: Dispatch<SetStateAction<BatchProduct>>;
  setItemCount: Dispatch<SetStateAction<number>>;
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
  countCompletedRows: { [id: string]: BatchProduct };
  handleSelectedRow: (product: BatchProduct) => void;
  countInputRef: CountInputRef;
  tabsValue: string;
  handleTabsChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => void;
}

export interface LastCountedItemsProps {
  lastCountedItems: BatchProduct[];
  handleDeleteClick: (id: number, i: number) => void;
}
