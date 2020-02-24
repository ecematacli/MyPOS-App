import { Dispatch } from 'redux';

import { ActionTypes } from './types';
import createAPIAction from '../createAPIAction';

interface BrandsAction {
  type: ActionTypes.FETCH_BRANDS;
  method: string;
  url: string;
}

export const fetchBrands = () => async dispatch => {
  dispatch(createAPIAction(ActionTypes.FETCH_BRANDS, 'get', '/brands'));
};
