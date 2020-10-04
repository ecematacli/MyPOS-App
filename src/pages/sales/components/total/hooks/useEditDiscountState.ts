import { useState, useEffect } from 'react';

export default (discount: number, percentageDiscount: number) => {
  const [discountType, setDiscountType] = useState('TL');

  const discountToShow =
    discountType === 'TL' ? discount : Number(percentageDiscount.toFixed(2));

  const [discountValue, setDiscountValue] = useState(discountToShow);

  const handleDiscountValueChange = (value: string) => {
    if (value === '') {
      return setDiscountValue(value as any);
    }
    setDiscountValue(Number(value));
  };

  const handleDiscountTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountType(e.target.value);
  };

  useEffect(() => {
    setDiscountValue(discountToShow);
  }, [discountType, discount, percentageDiscount]);

  return {
    discountType,
    discountValue,
    handleDiscountTypeChange,
    handleDiscountValueChange,
  };
};
