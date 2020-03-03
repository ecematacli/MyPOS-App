import { ActionTypes } from '../types';
import { Category } from '../categories/types';
import { Brand } from '../brands/types';

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

export interface FetchProductsAction {
  type: ActionTypes.FETCH_PRODUCTS;
  method: string;
  url: string;
}

export type NotificationType = (m: string, t: string) => void;

export type UpdatedField = { [key: string]: string };
export interface EditProductAction {
  type: ActionTypes.EDIT_PRODUCT;
  method: string;
  url: string;
  data: { [key: string]: string };
  successMessage: NotificationType;
  errorMessage: NotificationType;
}

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

export interface CreateProductAction {
  type: ActionTypes.CREATE_PRODUCT;
  method: string;
  url: string;
  data: ProductData;
  successMessage: NotificationType;
  errorMessage: NotificationType;
}

export type Action =
  | FetchProductsAction
  | EditProductAction
  | CreateProductAction;
