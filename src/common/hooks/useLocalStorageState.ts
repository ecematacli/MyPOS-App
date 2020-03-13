import { useState, useEffect } from 'react';

const getDefaultVal = (key: string, defaultVal: any) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultVal;
  } catch (e) {
    return defaultVal;
  }
};

export default (key: string, defaultVal: any) => {
  const [state, setState] = useState(getDefaultVal(key, defaultVal));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
