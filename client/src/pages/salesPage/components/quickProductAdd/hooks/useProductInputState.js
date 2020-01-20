import { useState } from 'react';

import useInputState from '../../../../../common/hooks/useInputState';

export default () => {
  const [name, setName] = useInputState('');
  const [sku, setSku] = useInputState('');
  const [barcode, setBarcode] = useInputState('');
  const [price, setPrice] = useInputState('');
  const [discountPrice, setDiscountPrice] = useInputState('');
  const [category, setCategory] = useInputState('');
  const [brand, setBrand] = useInputState('');

  const PRODUCT_FIELDS = [
    { label: 'Product Name', value: name },
    { label: 'Sku', value: sku },
    { label: 'Barcode', required: true, value: barcode },
    { label: 'Price', required: true, value: price },
    { label: 'Discounted Price', value: discountPrice },
    { label: 'Brand Name', dropdown: true, value: brand },
    { label: 'Category', dropdown: true, value: name }
  ];

  return {
    PRODUCT_FIELDS,
    name,
    setName,
    sku,
    setSku,
    barcode,
    setBarcode,
    price,
    setPrice,
    discountPrice,
    setDiscountPrice,
    category,
    setCategory
  };
};
