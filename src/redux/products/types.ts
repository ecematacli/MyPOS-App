import { Category } from '../categories/types';
import { Brand } from '../brands/types';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

export interface Product {
  id: number;
  barcode: string;
  sku: string;
  price: number;
  discountPrice: number;
  qty: number;
  variation: string;
  taxRate: number;
  brand: Brand;
  category: Category;
}

export interface ProductsState {
  count: number;
  products: { [id: string]: Product };
  ids: number[];
}
