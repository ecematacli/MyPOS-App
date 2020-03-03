import { ActionTypes } from '../types';
import createAPIAction from '../createAPIAction';
import { ApiAction } from '../types';

export const fetchBrands = () => async (dispatch: (A: ApiAction) => void) => {
  dispatch(createAPIAction(ActionTypes.FETCH_BRANDS, 'get', '/brands'));
};
