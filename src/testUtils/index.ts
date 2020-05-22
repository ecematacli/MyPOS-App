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
    discountPrice: discountPrices[i] || null,
    qty: 1,
    variation: null,
    taxRate: taxRate[i] || 8,
    synced: true,
    brand: { name: 'Tecnifibre', id: 14 },
    category: { name: 'Raket', id: 10 },
    deleted: false,
  }));
};

export const testBrands = [
  { name: 'Asics', id: 2 },
  { name: 'Babolat', id: 3 },
  { name: 'Nike', id: 4 },
  { name: 'Sportive', id: 5 },
  { name: 'Head', id: 6 },
  { name: 'Wilson', id: 8 },
  { name: 'Luxilon', id: 9 },
  { name: 'Yonex', id: 10 },
  { name: 'Technifibre', id: 11 },
  { name: 'Yonex ', id: 12 },
  { name: 'Dunlop', id: 13 },
  { name: 'Tecnifibre ', id: 14 },
  { name: 'head', id: 15 },
];

export const testCategories = [
  { name: 'Asics Çocuk Ayakkabı', id: 2 },
  { name: 'Asics Erkek Ayakkabı', id: 3 },
  { name: 'Asics Kadın Ayakkabı', id: 4 },
  { name: 'Atlama İpi', id: 5 },
  { name: 'Babolat Ayakkabı', id: 6 },
  { name: 'Babolat Çocuk Ayakkabı', id: 7 },
  { name: 'Çanta', id: 8 },
  { name: 'Grip', id: 9 },
  { name: 'Raket', id: 10 },
  { name: 'Çorap', id: 11 },
  { name: 'Kordaj', id: 12 },
  { name: 'Matara', id: 13 },
  { name: 'Nike Aksesuar', id: 14 },
  { name: 'Nike Çocuk Ayakkabı', id: 15 },
];

export const getTotalQty = (arr: Product[]) =>
  arr.reduce((acc: number, curr: Product): number => {
    return acc + curr.qty;
  }, 0);
