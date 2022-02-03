import { ReactNode } from 'react'
import { Product } from '../../../../redux/products/types'
export interface PlainTableProps {
  tableHeads: { name: string; rightAlign?: boolean }[]
  rows: any[]
  hasDataToShow: boolean
  noPagination?: boolean
  noDataMessage?: string
  count?: number
  page?: number
  rowsPerPage?: number
  handleChangeRowsPerPage?: ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => void
  handleChangePage?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => void
  selectedRow?: BatchProduct
  itemCount?: number
  tableFor:
    | 'InventoryCountBatches'
    | 'InventoryCountProducts'
    | 'CompletedInventoryCountProducts'
    | 'StockOrders'
    | 'StockTransfers'
    | 'NewStockTransferProducts'
    | 'StockTransferProducts'
}
export interface Batch {
  id: string
  status: string
  started: string
  finished: string | null
  name: string
  category: string
  brand: string
}

export interface BatchProduct {
  id: string
  sku: string
  barcode: string
  name: string
  variation: string
  expected: number
  counted: number | null
  synced: boolean
}

export interface StockOrders {
  id: string
  createdAt: string
  products: Product[]
  totalQty: number
  totalPrice: number
}

export interface PaginationLabel {
  from: number
  to: number
  count: number
}
