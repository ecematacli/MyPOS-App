import { FETCH_BRANDS } from './types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_BRANDS + '_SUCCESS':
      return payload;
    default:
      return state;
  }
};
