import api from '../../api/api';
import { FETCH_CATEGORIES } from './types';

export const fetchCategories = () => async dispatch => {
  const response = await api.get('/categories');

  dispatch({
    type: FETCH_CATEGORIES,
    payload: response.data
  });
};
