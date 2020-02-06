import { FETCH_CATEGORIES } from './types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_CATEGORIES:
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
