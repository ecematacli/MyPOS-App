import { useState, useEffect } from 'react';

import { Args } from './types';

export default ({ id, products, editProduct, addNotification }: Args) => {
  const [inputValue, setInputValue] = useState(0);

  // console.log('input value', inputValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    //For handling the empty string case
    if (parseInt(value)) {
      setInputValue(parseInt(value));
    } else if (value === '') {
      setInputValue(0);
    }
  };

  const resetInput = () => {
    setInputValue(0);
  };

  const editPriceValue = (productId: number) => {
    const updatedPrice = { price: inputValue.toString() };

    editProduct({
      updatedField: updatedPrice,
      productId,
      label: 'Price',
      addNotification,
    });
  };

  useEffect(() => {
    const product = products.find((product) => product.id === id);
    setInputValue((product && product.price) || 0);
  }, [id]);

  return {
    inputValue,
    handleInputChange,
    resetInput,
    editPriceValue,
  };
};
