interface TableHead {
  label: string
  numeric?: boolean
}

export const TABLE_HEAD: TableHead[] = [
  {
    label: 'Stok Kodu',
  },
  {
    label: 'Ürün Adı',
  },
  {
    label: 'Senkronize',
  },
  {
    label: 'Varyasyon',
    numeric: true,
  },
  {
    label: 'Miktar',
    numeric: true,
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
