import api from '../../api/api';
import { CREATE_SALE, FETCH_SALES } from './types';

export const createSale = (products, total, discount) => async dispatch => {
  const totalQty = () => {
    return products.reduce((acc, curr) => {
      return acc + curr.qty;
    }, 0);
  };

  const response = await api.post('/sales', [
    {
      products: [...products],
      total: total - discount,
      discount,
      totalQty: totalQty()
    }
  ]);

  dispatch({
    type: CREATE_SALE,
    payload: response.data
  });
};

export const fetchSales = (page = 1, rowsPerPage = 10) => async dispatch => {
  const response = await api.get(
    `/sales?page=${page}&rowsPerPage=${rowsPerPage}`
  );

  dispatch({
    type: FETCH_SALES,
    payload: response.data
  });
};
