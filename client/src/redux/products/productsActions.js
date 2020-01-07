import api from '../../api/api';
import { FETCH_PRODUCTS } from './types';

export const fetchProducts = (page = 1, rowsPerPage = 10) => async dispatch => {
  const response = await api.get(
    `/products?page=${page}&rowsPerPage=${rowsPerPage}`
  );

  dispatch({
    type: FETCH_PRODUCTS,
    payload: response.data
  });
};
