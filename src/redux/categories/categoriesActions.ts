import { ActionTypes, CategoriesAction } from './types';
import createAPIAction from '../createAPIAction';
import { ApiAction } from '../types';

export const fetchCategories = () => async (
  dispatch: (A: ApiAction) => void
) => {
  dispatch(createAPIAction(ActionTypes.FETCH_CATEGORIES, 'get', '/categories'));
};
