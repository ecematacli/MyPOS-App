import { Category } from '../categories/types';
import { Brand } from '../brands/types';

export enum SuccessActionTypes {
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS',
  CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS'
}
export interface Product {
  id: number;
  barcode: string;
  sku: string;
  name: string;
  price: number;
  discountPrice: number | null;
  qty: number;
  variation: string | null;
  taxRate: number | null;
  brand: Brand;
  category: Category;
  synced: boolean;
}

export interface ProductsState {
  count: number;
  products: { [id: string]: Product };
  ids: number[];
}

//Action Creator types

export interface FetchProductsAction {
  type: SuccessActionTypes.FETCH_PRODUCTS_SUCCESS;
  payload: {
    count: number;
    products: Product[];
  };
}

export interface CreateProductAction {
  type: SuccessActionTypes.CREATE_PRODUCT_SUCCESS;
  payload: Product;
}
export interface EditProductAction {
  type: SuccessActionTypes.EDIT_PRODUCT_SUCCESS;
  payload: Product;
}

export type NotificationType = ;
export type UpdatedField = { [key: string]: string };

export interface InputValues {
  barcode: string;
  name: string;
  qty: number;
  sku: string;
  price: number;
  variation: string;
  discountPrice: number;
}

export interface AdditionalInputs {
  taxRate: number;
  category: string;
  brand: string;
}
export interface ProductData extends InputValues {
  taxRate: number;
  categoryId: string;
  brandId: string;
}

export type Action =
  | FetchProductsAction
  | EditProductAction
  | CreateProductAction;
