import { Category } from '../categories/types';
import { Brand } from '../brands/types';

export enum ActionTypes {
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  EDIT_PRODUCT = 'EDIT_PRODUCT',
  CREATE_PRODUCT = 'CREATE_PRODUCT'
}

export interface Product {
  id: number;
  barcode: string;
  sku: string;
  name: string;
  price: number | null;
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

export interface EditProductAction {
  type: ActionTypes.EDIT_PRODUCT;
  method: string;
  url: string;
  data: { [key: string]: string | number };
  successMessage: NotificationType;
  errorMessage: NotificationType;
}

interface ProductData {
  price: number;
  discountPrice: number;
  taxRate: number;
  categoryId: string;
  brandId: string;
  barcode: string;
  name: string;
  qty: number;
  sku: string;
  variation: string;
}

export interface InputValues {
  barcode: string;
  name: string;
  qty: number;
  sku: string;
  price: string;
  variation: string;
  discountPrice: string;
}

export interface AdditionalInputs {
  taxRate: number;
  category: string;
  brand: string;
}

export interface CreateProductAction {
  type: ActionTypes.CREATE_PRODUCT;
  method: string;
  url: string;
  data: ProductData;
  successMessage: NotificationType;
  errorMessage: NotificationType;
}
