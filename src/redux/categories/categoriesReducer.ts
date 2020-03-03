import { ActionTypes } from '../types';
import { CategoriesAction, Category } from './types';

export default (
  state: Category[] = [],
  { type, payload }: CategoriesAction
) => {
  switch (type) {
    case ActionTypes.FETCH_CATEGORIES + '_SUCCESS':
      return payload;
    default:
      return state;
  }
};
