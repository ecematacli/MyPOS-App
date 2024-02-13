interface TableHead {
  label: string
  numeric?: boolean
}

export const TABLE_HEADS: TableHead[] = [
  { label: '' },
  {
    label: 'Stok Kodu',
  },
  {
    label: 'Ürün adı',
  },
  {
    label: 'Varyasyon',
  },
  { label: 'Enka Miktar', numeric: true },
  { label: 'Koza Miktar', numeric: true },
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
