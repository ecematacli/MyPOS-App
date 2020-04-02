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

export interface Batch {
  id: number;
  status: string;
  started: string;
  finished: string | null;
  name: string;
  category: string;
  brand: string;
  products: Product[];
}

export interface BatchesRow {
  type: string;
  batches: Batch[];
}
