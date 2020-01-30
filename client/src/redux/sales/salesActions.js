import api from '../../api/api';
import { CREATE_SALE, FETCH_SALES } from './types';

export const completeSale = (products, total, discount) => async dispatch => {
  console.log('products:', products, 'total:', total, 'discount:', discount);
  console.log({
    products,
    total: total - parseFloat(discount),
    discount: parseFloat(discount)
    // totalQty: totalQty()
  });
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

export const fetchSales = (page = 1, rowsPerPage = 10) => async dispatch => {
  const response = await api.get(
    `/sales?page=${page}&rowsPerPage=${rowsPerPage}`
  );

  dispatch({
    type: FETCH_SALES,
    payload: response.data
  });
};
