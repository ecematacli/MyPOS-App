import {
  useReducer,
  useEffect,
  Reducer,
  ReducerState,
  Dispatch,
  ReducerAction,
} from 'react'

export const useLocalStorageReducerState = <
  R extends Reducer<S, any>,
  S extends ReducerState<any>
>(
  key: string,
  defaultVal: any[],
  reducer: R,
  storage: any = localStorage
): [ReducerState<R>, Dispatch<ReducerAction<R>>] => {
  const [state, dispatch] = useReducer(reducer, defaultVal, () => {
    try {
      return JSON.parse(storage.getItem(key)) || defaultVal
    } catch (e) {
      return defaultVal
    }
  })

  useEffect(() => {
    storage.setItem(key, JSON.stringify(state))
  }, [state])

  return [state, dispatch]
}
