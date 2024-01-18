import { Brand } from '../../../../redux/brands/types'
import { Category } from '../../../../redux/categories/types'
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
    | 'OrderedProducts'
    | 'StockTransfers'
    | 'NewStockTransferProducts'
    | 'StockTransferProducts'
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

export interface StockOrders {
  id: number
  createdAt: string
  products: Product[]
  totalQty: number
  totalPrice: number
}

export interface OrderedProduct {
  id: number
  barcode: string
  sku: string
  name: string
  price: number
  discountPrice: number | null
  qty: number
  variation: string | null
  taxRate: number | null
  brand: Brand | null
  category: Category | null
  synced?: boolean
}

export interface PaginationLabel {
  from: number
  to: number
  count: number
}
