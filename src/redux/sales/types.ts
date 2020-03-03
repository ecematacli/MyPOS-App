import { Product } from '../products/types';

export interface Sale {
  id: number;
  createdAt: string;
  outlet: string;
  status: string;
  orderNo: null;
  total: number;
  discount: number;
  products: Product[];
}

export interface SalesState {
  count: number;
  sales: { [id: string]: Sale };
  ids: number[];
}

export interface SaleData {
  products: Product[];
  total: number;
  discount: number;
}
