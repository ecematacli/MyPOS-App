import { useState } from 'react';

export default initialVal => {
  const [state, setState] = useState(initialVal);

  const handleInputChange = e => {
    setState(e.target.value);
  };

  const resetInput = () => {
    setState('');
  };

  return [state, handleInputChange, resetInput];
};
