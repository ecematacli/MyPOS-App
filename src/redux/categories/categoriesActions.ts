import { Dispatch } from 'redux';

import { ActionTypes, ApiAction } from '../types';
import createAPIAction from '../createAPIAction';

export const fetchCategories = () => async (dispatch: Dispatch) =>
  dispatch<ApiAction>(
    createAPIAction(ActionTypes.FETCH_CATEGORIES, 'get', '/categories')
  );
