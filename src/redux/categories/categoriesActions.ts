import { Dispatch } from 'redux';

import { ActionTypes } from '../types';
import createAPIAction from '../createAPIAction';

export const fetchCategories = () => async (dispatch: Dispatch) =>
  dispatch(createAPIAction(ActionTypes.FETCH_CATEGORIES, 'get', '/categories'));
