import { useState, useEffect } from 'react';

const getDefaultVal = (key: string, defaultVal: any) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultVal;
  } catch (e) {
    return defaultVal;
  }
};

export default <T>(key: string, defaultVal: any): [T, React.Dispatch<T>] => {
  const [state, setState] = useState<T>(getDefaultVal(key, defaultVal));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
