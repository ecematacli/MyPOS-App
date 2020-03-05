import { Dispatch } from 'redux';

import { ActionTypes } from '../types';
import createAPIAction from '../createAPIAction';

export const fetchBrands = () => async (dispatch: Dispatch) => {
  dispatch(createAPIAction(ActionTypes.FETCH_BRANDS, 'get', '/brands'));
};
