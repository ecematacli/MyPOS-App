interface TableHead {
  label: string
  numeric?: boolean
}

export const TABLE_HEADS: TableHead[] = [
  { label: '' },
  {
    label: 'Stock Kodu',
  },
  {
    label: 'Ürün adı',
  },
  {
    label: 'Varyasyon',
  },
  {
    label: 'Kategori',
  },
  {
    label: 'Marka',
  },
  {
    label: 'Fiyat',
    numeric: true,
  },
  {
    label: 'İndirimli Fiyat',
    numeric: true,
  },
]
