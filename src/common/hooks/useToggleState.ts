import { useState } from 'react';

export default (initialVal: boolean) => {
  const [state, setState] = useState(initialVal);

  const toggleState = () => {
    setState(!state);
  };

  return [state, toggleState];
};
