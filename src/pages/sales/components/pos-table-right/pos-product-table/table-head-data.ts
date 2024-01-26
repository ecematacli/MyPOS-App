interface Head {
  label: string
  numeric?: boolean
}

type TableHead = Head[]

export const TABLE_HEAD: TableHead = [
  {
    label: 'Ürün',
  },
  {
    label: 'Miktar',
  },
  {
    label: 'Fiyat',
    numeric: true,
  },
  {
    label: 'İndirimli',
    numeric: true,
  },
  {
    label: '',
  },
]
