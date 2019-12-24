export const calculateTotal = products => {
  return products.reduce((acc, { price, qty }) => {
    return acc + price * qty;
  }, 0);
};

export const calculateTotalTax = products => {
  return products.reduce((acc, { price, taxRate, qty }) => {
    return acc + ((price * taxRate) / 100) * qty;
  }, 0);
};

export const calculateTotalDiscount = (products, additionalDiscount = 0) => {
  return products.reduce((acc, { price, discountPrice, qty }) => {
    return acc + (price - discountPrice) * qty + additionalDiscount;
  }, 0);
};
