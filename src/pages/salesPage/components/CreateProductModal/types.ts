import { Category } from '../../../../redux/categories/types'
import { Brand } from '../../../../redux/brands/types'
import { NewProductData } from '../../hooks/types'

export interface FormValues {
  barcode: string
  name: string
  qty: number
  sku: string
  price: string
  variation: string
  discountPrice: string
}

export interface ProductField {
  label: string
  fieldId: string
  required?: boolean
  currency?: boolean
  type?: string
}

export interface ProductInputStateArgs {
  brands: Brand[]
  categories: Category[]
  onClose: () => void
  createProduct: (
    productData: NewProductData,
    addNotification: (message: string, severity: string) => void
  ) => Promise<void>
}
export interface AdditionalInputs {
  taxRate: string
  category: string
  brand: string
}
export interface Tax {
  id: number
  name: string
}

export interface AdditionalInputField {
  label: string
  fieldId: string
  dropdown: boolean
  dropdownItems: Category[] | Brand[] | Tax[]
  value: number | string
  additionalField: boolean
  type?: string
}
