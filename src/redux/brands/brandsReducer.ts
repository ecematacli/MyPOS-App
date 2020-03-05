import { ActionTypes } from '../types';
import { BrandsAction, BrandsState } from './types';

export default (
  state: BrandsState = [],
  { type, payload }: BrandsAction
): BrandsState => {
  switch (type) {
    case ActionTypes.FETCH_BRANDS + '_SUCCESS':
      return payload;
    default:
      return state;
  }
};
