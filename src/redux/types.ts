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

export interface CallApi {
  method: string;
  url: string;
  data?: any;
  successMessage?: () => void;
  errorMessage?: () => void;
}
export interface ApiAction {
  type: string;
  callApi: CallApi;
}

export interface StoreState {
  brands: BrandsState;
  categories: CategoriesState;
  products: ProductsState;
  sales: SalesState;
  loading: LoadingState;
}
