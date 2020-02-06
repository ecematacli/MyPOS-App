export const currencyFormatter = num => {
  if (typeof num === 'undefined' || num === null) {
    return '';
  }
  return num.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
};

export const capitalize = str => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const dropdownItemsFormatter = dropdownItems =>
  Object.keys(dropdownItems).map(id => ({
    value: Number(id),
    label: dropdownItems[id]
  }));

export const totalQty = products =>
  products.reduce((acc, item) => {
    return acc + item.qty;
  }, 0);

export const totalDiscount = products =>
  products.reduce((acc, item) => {
    return acc + item.discountPrice;
  }, 0);
