import api from '../../api';
import { FETCH_BRANDS } from './types';

export const fetchBrands = () => async dispatch => {
  const response = await api.get('/brands');

  dispatch({
    type: FETCH_BRANDS,
    payload: response.data
  });
};
