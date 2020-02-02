export const currencyFormatter = num => {
  if (!num) {
    return '';
  }
  return num.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
};

export const dropdownItemsFormatter = dropdownItems => {
  return dropdownItems.map(({ name, id }) => ({ value: id, label: name }));
};
