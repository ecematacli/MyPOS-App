import { ActionTypes, StoreState } from '../types';
import { LoadingState } from './types';

export default (state: LoadingState = {}, action: any): LoadingState => {
  const { type } = action;

  const parts = type.split('_');
  const status = parts[parts.length - 1];
  const actionName = parts.slice(0, -1).join('_');

  if (type.match(/(.*)_(REQUEST|SUCCESS|FAILURE)/)) {
    return {
      ...state,
      [actionName]: status === 'REQUEST'
    };
  }

  return state;
};

export const loadingSelector = (actionType: ActionTypes, state: StoreState) =>
  state.loading[actionType];
