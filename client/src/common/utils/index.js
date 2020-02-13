import { format } from 'date-fns';

export const currencyFormatter = num => {
  if (typeof num === 'undefined' || num === null) {
    return '';
  }
  return num.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
};

export const findMatchedFields = (fields, fieldToBeMatched) =>
  fields.find(f => f.name === fieldToBeMatched);

export const formatDate = (dateToFormat, formatType) => {
  return format(new Date(dateToFormat), formatType);
};

export const capitalize = str => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const totalQty = products =>
  products.reduce((acc, item) => {
    return acc + item.qty;
  }, 0);

export const totalDiscount = products =>
  products.reduce((acc, item) => {
    return acc + item.discountPrice;
  }, 0);
