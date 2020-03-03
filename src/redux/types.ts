import { BrandsState } from './brands/types';
import { CategoriesState } from './categories/types';
import { ProductsState } from './products/types';
import { SalesState } from './sales/types';
import { LoadingState } from './loading/types';

export enum ActionTypes {
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_BRANDS = 'FETCH_BRANDS',
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  EDIT_PRODUCT = 'EDIT_PRODUCT',
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  CREATE_SALE = 'CREATE_SALE',
  FETCH_SALES = 'FETCH_SALES'
}
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
  brands: BrandsState;
  categories: CategoriesState;
  products: ProductsState;
  sales: SalesState;
  loading: LoadingState;
}
