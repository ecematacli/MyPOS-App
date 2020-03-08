import { format } from 'date-fns';
import { Product } from '../../redux/products/types';
import { Category } from '../../redux/categories/types';
import { Brand } from '../../redux/brands/types';

export const currencyFormatter = (num: number): string => {
  if (typeof num === 'undefined' || num === null) {
    return '';
  }
  // @ts-ignore
  return num.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
};

export const findMatchedFields = (
  fields: Category[] | Brand[],
  fieldToBeMatched: string
): Category | Brand => fields.find(f => f.name === fieldToBeMatched);

export const formatDate = (dateToFormat: string, formatType: string) => {
  return format(new Date(dateToFormat), formatType);
};

export const capitalize = (str: string) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const totalQty = (products: Product[]) =>
  products.reduce((acc: number, item: Product) => {
    return acc + item.qty;
  }, 0);

export const totalDiscount = (products: Product[]) =>
  products.reduce((acc: number, item: Product) => {
    return acc + item.discountPrice;
  }, 0);
