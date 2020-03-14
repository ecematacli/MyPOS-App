export const createTestProduct = (
  length: number = 1,
  prices: number[] = [],
  discountPrices: number[] = []
) => {
  return Array.from({ length }).map((_, i) => {
    return {
      id: i,
      barcode: '3490150122856',
      sku: '14FI305842',
      name: 'TFIGHT 305 GRIP 2',
      price: prices[i] || 12399,
      discountPrice: discountPrices[i],
      qty: 1,
      variation: null,
      taxRate: null,
      synced: true,
      brand: { name: 'Tecnifibre ', id: 14 },
      category: { name: 'Raket', id: 10 }
    };
  });
};
