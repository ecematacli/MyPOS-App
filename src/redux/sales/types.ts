import { Product } from '../products/types';

export enum ActionTypes {
  CREATE_SALE = 'CREATE_SALE',
  FETCH_SALES = 'FETCH_SALES'
}

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
