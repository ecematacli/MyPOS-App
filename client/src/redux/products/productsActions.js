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

export const editProduct = (
  fieldId,
  productVal,
  productId
) => async dispatch => {
  const response = await api.patch(`/products/${productId}`, {
    [fieldId]: productVal
  });

  dispatch({
    type: EDIT_PRODUCT,
    payload: response.data
  });
};
