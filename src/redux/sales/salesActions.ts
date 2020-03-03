import { Dispatch } from 'redux';
import { ActionTypes } from '../types';

import { SaleData } from './types';
import createAPIAction from '../createAPIAction';
import { Product } from '../products/types';

export const completeSale = (
  products: Product[],
  total: number,
  discount: number,
  addNotification: (m: string, t: string) => void,
  discardSale: () => void
) => async (dispatch: Dispatch<any>) => {
  const saleData: SaleData = {
    products,
    total: total - discount,
    discount: discount
  };

  dispatch(
    createAPIAction(
      ActionTypes.CREATE_SALE,
      'post',
      '/sales',
      saleData,
      () => addNotification('Sale has been completed successfully', 'success'),
      () => addNotification('Sale could not been created!', 'error')
    )
  );
  discardSale();
};

export const fetchSales = (
  page: number = 1,
  rowsPerPage: number = 10,
  startDate: Date,
  endDate: Date
) => async (dispatch: Dispatch<any>) => {
  let url = `/sales?page=${page}&rowsPerPage=${rowsPerPage}`;

  if (startDate) {
    url += `&startDate=${startDate.toISOString()}`;
  }
  if (endDate) {
    url += `&endDate=${endDate.toISOString()}`;
  }

  dispatch(createAPIAction(ActionTypes.FETCH_SALES, 'get', url));
};
