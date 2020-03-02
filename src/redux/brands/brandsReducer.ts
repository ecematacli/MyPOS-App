import { ActionTypes, BrandsAction, Brand } from './types';

export default (state: Brand[] = [], { type, payload }: BrandsAction) => {
  switch (type) {
    case ActionTypes.FETCH_BRANDS + '_SUCCESS':
      return payload;
    default:
      return state;
  }
};
