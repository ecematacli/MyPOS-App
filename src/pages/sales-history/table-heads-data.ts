interface TableHead {
  label: string
  numeric?: boolean
}

export const TABLE_HEADS: TableHead[] = [
  { label: '' },
  {
    label: 'Tarih',
  },
  { label: 'Mağaza' },
  {
    label: 'Payment Method',
  },
  {
    label: 'Toplam Miktar',
    numeric: true,
  },
  {
    label: 'Toplam İndirim',
    numeric: true,
  },
  {
    label: 'Toplam Ödeme',
    numeric: true,
  },
]
