export const calculateTotal = products => {
  return products.reduce((acc, { price, quantity }) => {
    return acc + price * quantity;
  }, 0);
};

export const calculateTotalTax = products => {
  return products.reduce((acc, { price, taxRate, quantity }) => {
    return acc + ((price * taxRate) / 100) * quantity;
  }, 0);
};
