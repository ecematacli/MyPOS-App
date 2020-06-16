export interface PlainTableProps {
  tableHeads: { name: string; rightAlign?: boolean }[]
  count: number
  rows: BatchesRow | BatchProductsRow
  hasDataToShow: boolean
  noDataMessage?: string
  page: number
  rowsPerPage: number
  handleChangeRowsPerPage: ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => void
  handleChangePage: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => void
  selectedRow?: BatchProduct
  handleSelectedRow?: (product: BatchProduct) => void
  countInputRef?: React.MutableRefObject<HTMLInputElement>
  itemCount?: number
  completedBatch?: boolean
  isQuickScanMode?: boolean
}
export interface Batch {
  id: number
  status: string
  started: string
  finished: string | null
  name: string
  category: string
  brand: string
}

export interface BatchProduct {
  id: number
  sku: string
  barcode: string
  name: string
  variation: string
  expected: number
  counted: number | null
  synced: boolean
}

interface BatchesRow {
  type: string
  batches: Batch[]
}

interface BatchProductsRow {
  type: string
  batchProducts: BatchProduct[]
}

export interface PaginationLabel {
  from: number
  to: number
  count: number
}
