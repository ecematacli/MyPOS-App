import { useState } from 'react';

export default (initialVal: string) => {
  const [state, setState] = useState(initialVal);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const resetInput = () => {
    setState('');
  };

  return [state, handleInputChange, resetInput];
};
