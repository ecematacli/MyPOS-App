import { FETCH_BRANDS } from './types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_BRANDS:
      return '';
    default:
      return state;
  }
};
