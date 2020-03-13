import { ActionTypes } from '../types';
import { CategoriesAction, CategoriesState } from './types';

export default (
  state: CategoriesState = [],
  { type, payload }: CategoriesAction
): CategoriesState => {
  switch (type) {
    case ActionTypes.FETCH_CATEGORIES + '_SUCCESS':
      return payload;
    default:
      return state;
  }
};
