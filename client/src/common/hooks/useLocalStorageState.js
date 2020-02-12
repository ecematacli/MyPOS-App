import { useState, useEffect } from 'react';

const getDefaultVal = (key, defaultVal) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultVal;
  } catch (e) {
    return defaultVal;
  }
};

export default (key, defaultVal) => {
  const [state, setState] = useState(getDefaultVal(key, defaultVal));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
