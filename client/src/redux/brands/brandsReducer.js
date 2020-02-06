import { FETCH_BRANDS } from './types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_BRANDS:
      return payload.reduce(
        (obj, { id, name }) => ({
          ...obj,
          [id]: name
        }),
        {}
      );
    default:
      return state;
  }
};
