import { FETCH_CATEGORIES } from './types';
import createAPIAction from '../createAPIAction';

export const fetchCategories = () => async dispatch => {
  dispatch(createAPIAction(FETCH_CATEGORIES, 'get', '/categories'));
};
