import { useState, useEffect } from 'react';

import { Args } from './types';
import { Product } from '../../../../redux/products/types';
import { capitalizeFirstLetter } from '../../../../common/utils';

export default ({
  products,
  editProduct,
  addNotification,
  editProductFieldLocalStorageState,
}: Args) => {
  const [priceValue, setPriceValue] = useState(0);
  const [discountedPriceValue, setDiscountedPriceValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: EventTarget & HTMLDivElement;
  }>(null);
  const [id, setId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  // Input state handlers
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.value === '') {
      setPriceValue(value as any);
      return;
    }
    setPriceValue(Number(value));
  };

  const handleDiscountedPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (e.target.value === '') {
      setDiscountedPriceValue(value as any);
      return;
    }
    setDiscountedPriceValue(Number(value));
  };

  const resetInputValue = (field: string) => {
    if (field === 'price') {
      setPriceValue(0);
    } else if (field === 'discountPrice') {
      setDiscountedPriceValue(0);
    }
  };

  // Other helpers
  const handleEditClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    field: string,
    id?: number,
    product?: Product
  ) => {
    setAnchorEl({ [field]: e.currentTarget });
    if (field !== 'discount') {
      setId(id);
      setEditedProduct(product);
    }
  };

  const handleClose = (field: string) => {
    setAnchorEl({ ...anchorEl, [field]: null });
  };

  const editProductValue = (
    productId: number,
    field: string,
    value: number
  ) => {
    const updatedField = { [field]: value.toString() };

    editProduct({
      updatedField,
      productId,
      label: capitalizeFirstLetter(field),
      addNotification,
    });
  };

  const handleCompleteEditClick = (field: string, inputValue: number) => {
    if (inputValue && editedProduct[field] !== inputValue) {
      editProductValue(id, field, inputValue);
      editProductFieldLocalStorageState(id, field, inputValue);
      setId(null);
    }
    resetInputValue(field);
    handleClose(field);
  };

  useEffect(() => {
    const product = products.find((product) => product.id === id);
    setPriceValue((product && product.price) || 0);
    setDiscountedPriceValue((product && product.discountPrice) || 0);
  }, [id]);

  return {
    priceValue,
    handlePriceChange,
    discountedPriceValue,
    handleDiscountedPriceChange,
    handleEditClick,
    handleClose,
    handleCompleteEditClick,
    anchorEl,
  };
};
