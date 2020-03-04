import { ActionTypes } from '../types';
import createAPIAction from '../createAPIAction';

import { ApiAction } from '../types';

export const fetchBrands = () => async (dispatch: (A: ApiAction) => void) => {
  console.log(createAPIAction(ActionTypes.FETCH_BRANDS, 'get', '/brands'));
  dispatch(createAPIAction(ActionTypes.FETCH_BRANDS, 'get', '/brands'));
};
