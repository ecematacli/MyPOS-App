interface Batch {
  id: number;
  status: string;
  started: string;
  finished: string | null;
  name: string;
  category: string;
  brand: string;
}

export interface BatchData {
  count: number;
  batches: Batch[];
}
