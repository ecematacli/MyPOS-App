const total = products => {
  return products.reduce((acc, currentProduct) => {
    return acc + currentProduct.price * currentProduct.quantity;
  }, 0);
};

export const calculateTotalDiscount = products => {
  return products.reduce((acc, { discount }) => {
    return acc + discount;
  }, 0);
};

export const calculateTotalTax = products => {
  return products.reduce((acc, { price, taxRate, quantity }) => {
    return acc + ((price * taxRate) / 100) * quantity;
  }, 0);
};

export const calculateSubTotal = products => {
  const result = total(products) - calculateTotalTax(products);
  return result;
};

export const calculateTotal = products => {
  return total(products) - calculateTotalDiscount(products);
};
