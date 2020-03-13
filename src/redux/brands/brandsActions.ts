import { Dispatch } from 'redux';

import { ActionTypes, ApiAction } from '../types';
import createAPIAction from '../createAPIAction';

export const fetchBrands = () => async (dispatch: Dispatch) => {
  dispatch<ApiAction>(
    createAPIAction(ActionTypes.FETCH_BRANDS, 'get', '/brands')
  );
};
