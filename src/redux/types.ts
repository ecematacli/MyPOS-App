import { SalesState } from './sales/types';
import { ProductsState } from './products/types';
import { CategoriesState } from './categories/types';
import { BrandsState } from './brands/types';

export interface ApiAction {
  [key: string]: {
    type: string;
    method: string;
    url: string;
    data?: any;
    successMessage?: (m: string, t: string) => void;
    errorMessage?: (m: string, t: string) => void;
  };
}

export interface StoreState {
  sales: SalesState;
  products: ProductsState;
  categories: CategoriesState;
  brands: BrandsState;
  loading: any;
}
