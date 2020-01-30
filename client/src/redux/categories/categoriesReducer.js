import { FETCH_CATEGORIES } from './types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_CATEGORIES:
      return '';
    default:
      return state;
  }
};
