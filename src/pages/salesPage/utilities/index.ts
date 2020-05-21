import { Product } from '../../../redux/products/types';

export const calculateTotal = (products: Product[]): number =>
  products.reduce((acc, { price, qty }) => {
    return acc + price * qty;
  }, 0);

export const calculateTotalTax = (products: Product[]): number =>
  products.reduce((acc, { price, taxRate, qty }) => {
    return acc + ((price * taxRate) / 100) * qty;
  }, 0);

export const calculateTotalDiscount = (products: Product[]): number =>
  products.reduce((acc, { price, discountPrice, qty }) => {
    if (!discountPrice) return acc + 0;
    return acc + (price - discountPrice) * qty;
  }, 0);

export const calculatePercentageFromDiscount = (
  total: number,
  discount: number
) => {
  const percentage = (discount / total) * 100;
  return isNaN(percentage) ? 0 : percentage;
};

export const calculateDiscountFromPercentage = (
  total: number,
  percentageDiscount: number
) => {
  return (total * percentageDiscount) / 100;
};
