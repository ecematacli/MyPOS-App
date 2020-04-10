import { Product } from '../redux/products/types';

export const createTestProduct = (
  length: number = 1,
  prices: number[] = [],
  discountPrices: number[] = [],
  taxRate: number[] = []
) => {
  return Array.from({ length }).map((_, i) => ({
    id: i,
    barcode: '3490150122856',
    sku: '14FI305842',
    name: 'TFIGHT 305 GRIP 2',
    price: prices[i] || 12399,
    discountPrice: discountPrices[i],
    qty: 1,
    variation: null,
    taxRate: taxRate[i] || 8,
    synced: true,
    brand: { name: 'Tecnifibre ', id: 14 },
    category: { name: 'Raket', id: 10 },
    deleted: false
  }));
};

export const getTotalQty = (arr: Product[]) =>
  arr.reduce((acc: number, curr: Product): number => {
    return acc + curr.qty;
  }, 0);
