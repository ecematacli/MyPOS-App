import api from '../../api';
import { CREATE_SALE, FETCH_SALES } from './types';

export const completeSale = (products, total, discount) => async dispatch => {
  const response = await api.post('/sales', {
    products,
    total: total - parseFloat(discount),
    discount: parseFloat(discount)
    // totalQty: totalQty()
  });

  dispatch({
    type: CREATE_SALE,
    payload: response.data
  });
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

  const response = await api.get(url);

  dispatch({
    type: FETCH_SALES,
    payload: response.data
  });
};
