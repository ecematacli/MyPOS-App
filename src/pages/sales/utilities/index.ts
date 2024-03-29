import { Product } from '../../../redux/products/types';

export const calculateTotal = (products: Product[]) =>
  products.reduce((acc, { price, qty }) => {
    return acc + price * qty;
  }, 0);

export const calculateTotalTax = (products: Product[]) =>
  products.reduce((acc, { price, taxRate, qty }) => {
    return acc + ((price * taxRate) / 100) * qty;
  }, 0);

export const calculateTotalDiscount = (products: Product[]) =>
  products.reduce((acc, { price, discountPrice, qty }) => {
    if (!discountPrice) return acc + 0;
    const result = acc + (price - discountPrice) * qty;
    return result <= 0 ? 0 : result;
  }, 0);

export const calculatePercentageFromDiscount = (
  total: number,
  discount: number
) => {
  const percentage = (discount / total) * 100;
  return isNaN(percentage) || percentage <= 0 ? 0 : percentage;
};

export const calculateDiscountFromPercentage = (
  total: number,
  percentageDiscount: number
) => {
  return (total * percentageDiscount) / 100;
};
