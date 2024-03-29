import { useState, useEffect } from 'react';

import { Args, ChangeEvent, ClickEvent, SetNumberState } from './types';
import { Product } from '../../../../redux/products/types';
import { capitalizeFirstLetters } from '../../../../common/utils';
import {
  calculatePercentageFromDiscount,
  calculateDiscountFromPercentage,
} from '../../utilities';

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
  const handlePriceChange = (e: ChangeEvent) => {
    const value = e.target.value;
    if (e.target.value === '') {
      setPriceValue(value as any);
      return;
    }
    setPriceValue(Number(value));
  };

  const handleDiscountedPriceChange = (e: ChangeEvent) => {
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
    e: ClickEvent,
    field: string,
    id: number,
    product: Product
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

  const onCompletePriceEditClick = (field: string, inputValue: number) => {
    if (inputValue && editedProduct[field] !== inputValue) {
      const updatedField = { [field]: inputValue.toString() };

      editProduct({
        updatedField,
        productId: id,
        label: capitalizeFirstLetters(field),
        addNotification,
      });
      setId(null);
      editProductFieldLocalStorageState(id, field, inputValue);
    }

    resetInputValue(field);
    handleClose(field);
  };

  const onCompleteDiscountEditClick = (
    total: number,
    discountType: string,
    discountValue: number,
    setDiscount: SetNumberState,
    setPercentageDiscount: SetNumberState
  ) => {
    const isDiscountNumber = discountValue || discountValue === 0;

    if (isDiscountNumber && discountType === 'TL') {
      setDiscount(discountValue <= 0 ? 0 : discountValue);
      setPercentageDiscount(
        calculatePercentageFromDiscount(total, discountValue)
      );
    } else if (isDiscountNumber && discountType === '%') {
      setPercentageDiscount(discountValue <= 0 ? 0 : discountValue);
      setDiscount(calculateDiscountFromPercentage(total, discountValue));
    }

    resetInputValue('discount');
    handleClose('discount');
  };

  useEffect(() => {
    const product = products.find(product => product.id === id);
    setPriceValue((product && product.price) || 0);
    setDiscountedPriceValue((product && product.discountPrice) || 0);
  }, [id]);

  return {
    priceValue,
    editedProduct,
    id,
    handlePriceChange,
    discountedPriceValue,
    handleDiscountedPriceChange,
    resetInputValue,
    handleEditClick,
    handleClose,
    onCompletePriceEditClick,
    onCompleteDiscountEditClick,
    anchorEl,
  };
};
