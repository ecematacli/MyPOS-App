import { ENKA_OUTLET_ID, KOZA_OUTLET_ID } from 'constants/outlets'

interface TableHead {
  label: string
  key: string
  numeric?: boolean
  id?: number
}

export const TABLE_HEADS: TableHead[] = [
  { label: '', key: 'icon' },
  {
    label: 'Stok Kodu',
    key: 'sku',
  },
  {
    label: 'Ürün adı',
    key: 'name',
  },
  {
    label: 'Varyasyon',
    key: 'variation',
  },
  {
    label: 'Enka Miktar',
    key: 'inventoryLevels',
    id: ENKA_OUTLET_ID,
    numeric: true,
  },
  {
    label: 'Koza Miktar',
    key: 'inventoryLevels',
    id: KOZA_OUTLET_ID,
    numeric: true,
  },
  {
    label: 'Kategori',
    key: 'category',
  },
  {
    label: 'Marka',
    key: 'brand',
  },
  {
    label: 'Fiyat',
    key: 'price',
    numeric: true,
  },
  {
    label: 'İndirimli Fiyat',
    key: 'discountPrice',
    numeric: true,
  },
]
