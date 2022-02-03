interface Batch {
  id: string
  status: string
  started: string
  finished: string | null
  name: string
  category: string
  brand: string
}

export interface BatchesData {
  count: number
  batches: Batch[]
}
