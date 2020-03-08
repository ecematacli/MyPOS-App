import { Product } from '../products/types';

export enum SuccessActionTypes {
  FETCH_SALES_SUCCESS = 'FETCH_SALES_SUCCESS'
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

export interface SaleData {
  products: Product[];
  total: number;
  discount: number;
}

// Action creator
export interface FetchSalesAction {
  type: SuccessActionTypes.FETCH_SALES_SUCCESS;
  payload: {
    count: number;
    sales: Sale[];
  };
}
