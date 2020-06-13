interface Head {
  label: string
  numeric?: boolean
}

type TableHead = Head[]

export const TABLE_HEAD: TableHead = [
  {
    label: 'Product',
  },
  {
    label: 'Quantity',
  },
  {
    label: 'Price',
    numeric: true,
  },
  {
    label: 'Discounted',
    numeric: true,
  },
  {
    label: '',
  },
]
