import { Brand } from '../../../../redux/brands/types'
import { Category } from '../../../../redux/categories/types'

interface DropdownItem {
  name: string
  id: number
}
interface ProductField {
  label: string
  fieldId: string
  type?: string
  currency?: boolean
  dropdown?: boolean
  dropdownItems?: DropdownItem[]
}

export const getProductFields = (
  brands: Brand[],
  categories: Category[]
): ProductField[] => [
  { label: 'Barkod', fieldId: 'barcode' },
  { label: 'Ürün adı', fieldId: 'name' },
  { label: 'Miktar', fieldId: 'qty', type: 'number' },
  { label: 'Fiyat', fieldId: 'price', currency: true },
  {
    label: 'İndirimli Fiyat',
    fieldId: 'discountPrice',
    currency: true,
  },
  { label: 'Varyasyon', fieldId: 'variation' },
  {
    label: 'Vergi Oranı',
    fieldId: 'taxRate',
    dropdown: true,
    dropdownItems: [
      { id: 1, name: '8' },
      { id: 2, name: '18' },
    ],
  },
  { label: 'Stok Kodu', fieldId: 'sku' },
  {
    label: 'Marka adı',
    fieldId: 'brand',
    dropdown: true,
    dropdownItems: brands,
  },
  {
    label: 'Kategori adı',
    fieldId: 'category',
    dropdown: true,
    dropdownItems: categories,
  },
]
