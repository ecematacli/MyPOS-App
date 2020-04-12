interface Product {
  id: number;
  sku: string;
  barcode: string;
  name: string;
  variation: string;
  expected: number;
  counted: boolean | null;
  synced: boolean;
}

export interface BatchesProductsData {
  counted: number;
  uncounted: number;
  products: Product[];
}
