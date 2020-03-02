import { ActionTypes } from './types';
import createAPIAction from '../createAPIAction';

export const completeSale = (
  products,
  total,
  discount,
  addNotification,
  discardSale
) => async dispatch => {
  const saleData = {
    products,
    total: total - parseFloat(discount),
    discount: parseFloat(discount)
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
  page = 1,
  rowsPerPage = 10,
  startDate,
  endDate
) => async dispatch => {
  let url = `/sales?page=${page}&rowsPerPage=${rowsPerPage}`;

  if (startDate) {
    url += `&startDate=${startDate.toISOString()}`;
  }
  if (endDate) {
    url += `&endDate=${endDate.toISOString()}`;
  }

  dispatch(createAPIAction(ActionTypes.FETCH_SALES, 'get', url));
};
