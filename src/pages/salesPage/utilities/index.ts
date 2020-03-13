import { Product } from '../../../redux/products/types';

type Products = Product[];

export const calculateTotal = (products: Products): number => {
  return products.reduce((acc, { price, qty }) => {
    return acc + price * qty;
  }, 0);
};

export const calculateTotalTax = (products: Products): number => {
  return products.reduce((acc, { price, taxRate, qty }) => {
    return acc + ((price * taxRate) / 100) * qty;
  }, 0);
};

export const calculateTotalDiscount = (products: Products): number => {
  return products.reduce((acc, { price, discountPrice, qty }) => {
    if (!discountPrice) return 0;
    return acc + (price - discountPrice) * qty;
  }, 0);
};
