import { Product } from '../../../../redux/products/types';

export interface EditActionArgs {
  updatedField: { [key: string]: string };
  productId: number;
  label: string;
  addNotification: (m?: string, t?: string) => void;
}

export type EditProductAction = ({
  updatedField,
  productId,
  label,
  addNotification,
}: EditActionArgs) => Promise<void>;

export interface PosTableProps {
  products: Product[];
  deleteProduct: (id: number) => void;
  decreaseProductQuantity: (product: Product) => void;
  increaseProductQuantity: (product: Product) => void;
  editPriceLocalStorageState: (id: number, newPrice: number) => void;
  total: number;
  tax: number;
  discount: number;
  handleDiscountChange: (e: string) => void;
  completeSale: (
    products: Product[],
    total: number,
    discount: number,
    addNotification: (m: string, t: string) => void,
    discardSale: () => void
  ) => void;
  discardSale: () => void;
  editProduct: EditProductAction;
}

export interface Args {
  id: number;
  products: Product[];
  editProduct: EditProductAction;
  addNotification: (message: string, severity: string) => void;
}
