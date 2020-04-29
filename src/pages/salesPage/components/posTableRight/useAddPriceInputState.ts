import { useState, useEffect } from 'react';

import { Args } from './types';

export default ({ id, products, editProduct, addNotification }: Args) => {
  const [priceValue, setPriceValue] = useState(0);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceValue(Number(e.target.value) || 0);
  };

  const resetInput = () => {
    setPriceValue(0);
  };

  const editPriceValue = (productId: number) => {
    const updatedPrice = { price: priceValue.toString() };

    editProduct({
      updatedField: updatedPrice,
      productId,
      label: 'Price',
      addNotification,
    });
  };

  useEffect(() => {
    const product = products.find((product) => product.id === id);
    setPriceValue((product && product.price) || 0);
  }, [id]);

  return {
    priceValue,
    handlePriceChange,
    resetInput,
    editPriceValue,
  };
};
