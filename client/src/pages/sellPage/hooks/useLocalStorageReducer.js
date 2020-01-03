import { useReducer, useEffect } from 'react';

export default (key, defaultVal, reducer) => {
  const [state, dispatch] = useReducer(reducer, defaultVal, () => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return defaultVal;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
};
