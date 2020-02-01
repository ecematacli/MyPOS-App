export const currencyFormatter = n => {
  if (!n) {
    return '';
  }
  return n.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
};
