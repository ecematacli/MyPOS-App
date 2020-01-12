import api from '../../api/api';
import { FETCH_PRODUCTS, EDIT_PRODUCT } from './types';

export const fetchProducts = (page = 1, rowsPerPage = 10) => async dispatch => {
  const response = await api.get(
    `/products?page=${page}&rowsPerPage=${rowsPerPage}`
  );

  dispatch({
    type: FETCH_PRODUCTS,
    payload: response.data
  });
};

export const editProduct = product => async dispatch => {
  const { id } = product;
  const response = await api.patch(`/products/${id}`, { ...product });

  dispatch({
    type: EDIT_PRODUCT,
    payload: response.data
  });
};
