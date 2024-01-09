import { Product } from '../../../../redux/products/types'
import { Category } from '../../../../redux/categories/types'
import { Brand } from '../../../../redux/brands/types'

interface EditProductArgs {
  updatedField: { [key: string]: string }
  productId: number
  label: string
  addNotification: (m?: string, t?: string) => void
}

export type EditProductAction = ({
  updatedField,
  productId,
  label,
  addNotification,
}: EditProductArgs) => Promise<void>

export interface DetailsProps {
  product: Product
  brands: Brand[]
  categories: Category[]
  editProduct: EditProductAction
  rowIndex?: number
}

export interface Args {
  product: Product
  editProduct: EditProductAction
  addNotification: (message: string, severity: string) => void
  brands: Brand[]
  categories: Category[]
}

export interface EditedRow {
  [key: string]: boolean | undefined
}

export interface UserProductValues {
  id: number
  barcode: string
  sku: string
  name: string
  price: number
  discountPrice: number | null
  qty: number
  variation: string | null
  taxRate: number | null
  brand: Brand | string | any
  category: Category | string
  synced?: boolean
}
