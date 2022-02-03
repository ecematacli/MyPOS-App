export interface Outlet {
  id: string
  name: string
}

export interface StockTransfer {
  id: string
  origin: Outlet
  destination: Outlet
  createdAt: string
  products: StockTransferProduct[]
}

export interface StockTransferProduct {
  id: string
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
  id: string
  sku: string
  barcode: string
  name: string
  variation: string
  price: number
  qty: number
  qtyToTransfer: number
}
