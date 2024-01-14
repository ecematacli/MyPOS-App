export interface Outlet {
  id: number
  name: string
}

export interface StockTransfer {
  id: number
  origin: Outlet
  destination: Outlet
  createdAt: string
  products: StockTransferProduct[]
}

export interface StockTransferProduct {
  id: number
  barcode: string
  sku: string
  name: string
  price: number
  discountPrice: number | null
  transferredQty: number
  variation: string | null
  taxRate: number | null
  brand: string | null
  category: string | null
  synced: boolean
}

export interface ProductToTransfer {
  id: number
  sku: string
  barcode: string
  name: string
  variation: string
  price: number
  qty: number
  qtyToTransfer: number
}
