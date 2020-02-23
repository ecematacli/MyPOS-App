import {
  useReducer,
  useEffect,
  Reducer,
  ReducerState,
  Dispatch,
  ReducerAction
} from 'react';

export default <R extends Reducer<S, any>, S extends ReducerState<any>>(
  key: string,
  defaultVal: any[],
  reducer: R
): [ReducerState<R>, Dispatch<ReducerAction<R>>] => {
  const [state, dispatch] = useReducer(reducer, defaultVal, () => {
    try {
      return JSON.parse(localStorage.getItem(key)) || defaultVal;
    } catch (e) {
      return defaultVal;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
};
