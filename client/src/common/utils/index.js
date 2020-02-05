export const currencyFormatter = num => {
  if (typeof num === 'undefined' || num === null) {
    return '';
  }
  return num.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
};

export const dropdownItemsFormatter = dropdownItems =>
  dropdownItems.map(({ name, id }) => ({ value: id, label: name }));

export const totalQty = products =>
  products.reduce((acc, item) => {
    return acc + item.qty;
  }, 0);

export const totalDiscount = products =>
  products.reduce((acc, item) => {
    return acc + item.discountPrice;
  }, 0);
