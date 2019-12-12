import { useState } from 'react';

export default initialVal => {
  const [state, setState] = useState(initialVal);

  const toggleState = () => {
    setState(!state);
  };

  return [state, toggleState]
};