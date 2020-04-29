import { useState } from 'react';

export default (initialVal: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initialVal);

  const toggleState = () => {
    setState(!state);
  };

  return [state, toggleState];
};
